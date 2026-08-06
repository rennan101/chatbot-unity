import os
from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from pinecone import Pinecone

app = FastAPI()

# Pega as chaves de segurança ocultas do Vercel
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")

genai.configure(api_key=GOOGLE_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index("unity-docs")

# INSTRUÇÕES DE SISTEMA (O que você pediu)
SYSTEM_INSTRUCTION = """Você é um professor especialista em Unity.
Regras OBRIGATÓRIAS:
1. Ensine de forma DIRETA e sem enrolação como usar a ferramenta ou código.
2. SEMPRE dê um exemplo prático (código C# ou passo a passo na interface do Unity).
3. Se o usuário for desrespeitoso, ofender ou disser palavrões, IGNORE COMPLETAMENTE a ofensa e responda de forma neutra, técnica e focada na ferramenta, ou mude o assunto de volta para o Unity de forma educada.
4. Baseie-se primeiramente no contexto fornecido da documentação."""

class Mensagem(BaseModel):
    texto: str

@app.post("/api/chat")
def chat(msg: Mensagem):
    # 1. Converte a pergunta do aluno em vetor
    emb = genai.embed_content(model="models/text-embedding-004", content=msg.texto)
    vetor_pergunta = emb['embedding']

    # 2. Busca na documentação (Pinecone) os 3 trechos mais relevantes
    resultados = index.query(vector=vetor_pergunta, top_k=3, include_metadata=True)
    
    contexto = []
    for match in resultados['matches']:
        contexto.append(match['metadata']['texto'])
    
    texto_contexto = "\n---\n".join(contexto)

    # 3. Monta a pergunta final e envia para o Gemini
    prompt_final = f"Documentação encontrada:\n{texto_contexto}\n\nPergunta do Aluno: {msg.texto}"
    
    # Obs: Utilizando a nomenclatura solicitada (3.5). Caso a API pública oficial 
    # recuse o nome no momento do deploy, altere para "gemini-1.5-flash" ou "gemini-2.5-flash".
    model = genai.GenerativeModel(
        model_name="gemini-3.5-flash", 
        system_instruction=SYSTEM_INSTRUCTION
    )
    
    resposta = model.generate_content(prompt_final)
    
    return {"resposta": resposta.text}