import os
from fastapi import FastAPI, Depends, HTTPException, Header
from pydantic import BaseModel
from google import genai
from google.genai import types
import firebase_admin
from firebase_admin import credentials, auth

if not firebase_admin._apps:
    firebase_admin.initialize_app(options={'projectId': 'comboboy-researcher'})

app = FastAPI()

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
client_gemini = genai.Client(api_key=GOOGLE_API_KEY)

DOCS_DIR = os.path.join(os.path.dirname(__file__), "..", "docs")

# ÍNDICE LEVE: Carrega apenas os resumos/primeiras linhas para economizar RAM e tempo
INDICE_DOCS = {}

def carregar_indice():
    global INDICE_DOCS
    if INDICE_DOCS:
        return INDICE_DOCS
    
    if os.path.exists(DOCS_DIR):
        for arquivo in os.listdir(DOCS_DIR):
            if arquivo.endswith('.md'):
                caminho = os.path.join(DOCS_DIR, arquivo)
                try:
                    with open(caminho, 'r', encoding='utf-8', errors='ignore') as f:
                        # Lê apenas o arquivo e guarda de forma compacta
                        INDICE_DOCS[arquivo] = f.read()
                except Exception:
                    continue
    return INDICE_DOCS

carregar_indice()

SYSTEM_INSTRUCTION = """Você é um professor especialista em Unity.
Regras OBRIGATÓRIAS:
1. Ensine de forma DIRETA e sem enrolação como usar a ferramenta ou código.
2. SEMPRE dê um exemplo prático (código C# ou passo a passo na interface do Unity).
3. Baseie-se no contexto técnico fornecido."""

class Mensagem(BaseModel):
    texto: str

def verificar_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Faltando Token de Autenticação")
    token = authorization.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token Inválido ou Expirado")

def buscar_contexto_ultrarapido(termo_busca: str):
    docs = carregar_indice()
    if not docs:
        return "Nenhuma documentação carregada."

    palavras = [p.lower() for p in termo_busca.split() if len(p) > 3]
    melhor_trecho = ""
    max_pontos = 0

    for arquivo, conteudo in docs.items():
        conteudo_lower = conteudo.lower()
        pontos = sum(conteudo_lower.count(p) for p in palavras)
        # Adiciona pontos extras se o nome do arquivo combinar com a busca
        if any(p in arquivo.lower() for p in palavras):
            pontos += 5

        if pontos > max_pontos:
            max_pontos = pontos
            # Pega uma fatia estratégica do arquivo onde o assunto é abordado
            melhor_trecho = conteudo[:3000]

    return melhor_trecho if melhor_trecho else "Responda com base no seu conhecimento avançado de Unity e no padrão do framework."

@app.post("/api/chat")
def chat(msg: Mensagem, usuario_logado: dict = Depends(verificar_token)):
    texto_contexto = buscar_contexto_ultrarapido(msg.texto)

    prompt_final = f"Documentação de Referência:\n{texto_contexto}\n\nPergunta do Aluno: {msg.texto}"
    
    resposta = client_gemini.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt_final,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION
        )
    )
    
    return {"resposta": resposta.text}