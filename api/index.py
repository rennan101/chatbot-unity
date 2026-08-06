import os
from fastapi import FastAPI, Depends, HTTPException, Header
from pydantic import BaseModel
from google import genai
from google.genai import types
import firebase_admin
from firebase_admin import credentials, auth

# Inicializa apenas o Auth do Firebase no Backend (que continua 100% gratuito no plano Spark)
if not firebase_admin._apps:
    firebase_admin.initialize_app(options={'projectId': 'comboboy-researcher'})

app = FastAPI()

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
client_gemini = genai.Client(api_key=GOOGLE_API_KEY)

# Aponta para a pasta docs dentro do projeto enviada ao Vercel
DOCS_DIR = os.path.join(os.path.dirname(__file__), "..", "docs")

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
    """Busca rápida por relevância de palavras-chave nos arquivos .md locais da pasta docs"""
    contexto_acumulado = []
    palavras = [p.lower() for p in termo_busca.split() if len(p) > 2]
    
    if not os.path.exists(DOCS_DIR):
        return "Nenhuma documentação encontrada no servidor."

    for arquivo in os.listdir(DOCS_DIR):
        if arquivo.endswith('.md'):
            caminho = os.path.join(DOCS_DIR, arquivo)
            try:
                with open(caminho, 'r', encoding='utf-8', errors='ignore') as f:
                    conteudo = f.read()
                    pontos = sum(conteudo.lower().count(p) for p in palavras)
                    if pontos > 0:
                        contexto_acumulado.append((pontos, conteudo[:3500]))
            except Exception:
                continue

    contexto_acumulado.sort(key=lambda x: x[0], reverse=True)
    melhores_trechos = [t[1] for t in contexto_acumulado[:3]]
    
    return "\n---\n".join(melhores_trechos) if melhores_trechos else "Nenhum trecho específico encontrado na documentação."

@app.post("/api/chat")
def chat(msg: Mensagem, usuario_logado: dict = Depends(verificar_token)):
    # Extrai o contexto diretamente dos arquivos .md locais do repositório
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