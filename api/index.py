import os
from fastapi import FastAPI, Depends, HTTPException, Header
from pydantic import BaseModel
from google import genai
from google.genai import types
import firebase_admin
from firebase_admin import credentials, auth

# Inicializa o Auth do Firebase no Backend
if not firebase_admin._apps:
    firebase_admin.initialize_app(options={'projectId': 'comboboy-researcher'})

app = FastAPI()

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
client_gemini = genai.Client(api_key=GOOGLE_API_KEY)

DOCS_DIR = os.path.join(os.path.dirname(__file__), "..", "docs")

# CACHE GLOBAL: Carrega os arquivos para a RAM apenas uma vez na inicialização
CACHE_DOCS = []

def carregar_docs_cache():
    global CACHE_DOCS
    if CACHE_DOCS:
        return CACHE_DOCS
    
    if os.path.exists(DOCS_DIR):
        for arquivo in os.listdir(DOCS_DIR):
            if arquivo.endswith('.md'):
                caminho = os.path.join(DOCS_DIR, arquivo)
                try:
                    with open(caminho, 'r', encoding='utf-8', errors='ignore') as f:
                        conteudo = f.read()
                        CACHE_DOCS.append((arquivo, conteudo))
                except Exception:
                    continue
    return CACHE_DOCS

# Pré-carrega o cache assim que o servidor subir
carregar_docs_cache()

# INSTRUÇÕES DE SISTEMA DO PROFESSOR
SYSTEM_INSTRUCTION = """Você é um professor especialista em Unity.
Regras OBRIGATÓRIAS:
1. Ensine de forma DIRETA e sem enrolação como usar a ferramenta ou código.
2. SEMPRE dê um exemplo prático (código C# ou passo a passo na interface do Unity).
3. Baseie-se primeiramente no contexto fornecido dos arquivos de documentação."""

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

def buscar_contexto_local(termo_busca: str):
    docs = carregar_docs_cache()
    contexto_acumulado = []
    palavras = [p.lower() for p in termo_busca.split() if len(p) > 2]
    
    if not docs:
        return "Nenhuma documentação encontrada no servidor."

    for arquivo, conteudo in docs:
        # Pontuação baseada nas palavras da pergunta do aluno
        pontos = sum(conteudo.lower().count(p) for p in palavras)
        if pontos > 0:
            # Pega uma fatia relevante do arquivo para não estourar o limite de tokens da IA
            contexto_acumulado.append((pontos, conteudo[:2000]))

    # Ordena pelos trechos mais relevantes e pega os top 2
    contexto_acumulado.sort(key=lambda x: x[0], reverse=True)
    melhores_trechos = [t[1] for t in contexto_acumulado[:2]]
    
    return "\n---\n".join(melhores_trechos) if melhores_trechos else "Nenhum trecho específico encontrado na documentação, responda com base no seu conhecimento geral de Unity."

@app.post("/api/chat")
def chat(msg: Mensagem, usuario_logado: dict = Depends(verificar_token)):
    # Busca o contexto otimizado na memória RAM
    texto_contexto = buscar_contexto_local(msg.texto)

    prompt_final = f"Documentação encontrada:\n{texto_contexto}\n\nPergunta do Aluno: {msg.texto}"
    
    resposta = client_gemini.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt_final,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION
        )
    )
    
    return {"resposta": resposta.text}