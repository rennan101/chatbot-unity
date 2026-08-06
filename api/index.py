import os
from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
from google.genai import types
from pinecone import Pinecone

app = FastAPI()

# Pega as chaves ocultas no Vercel
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")

client_gemini = genai.Client(api_key=GOOGLE_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index("unity-docs")

# INSTRUÇÕES DE SISTEMA DO PROFESSOR
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
    # 1. Converte a pergunta do aluno em vetor (Usando o modelo novo ajustado para 768)
    resultado_emb = client_gemini.models.embed_content(
        model="gemini-embedding-001", 
        contents=msg.texto,
        config=types.EmbedContentConfig(output_dimensionality=768)
    )
    vetor_pergunta = resultado_emb.embeddings[0].values

    # 2. Busca na documentação (Pinecone) os 3 trechos mais relevantes
    resultados = index.query(vector=vetor_pergunta, top_k=3, include_metadata=True)
    
    contexto = [match['metadata']['texto'] for match in resultados['matches']]
    texto_contexto = "\n---\n".join(contexto)

    # 3. Monta a pergunta final e envia para o Gemini
    prompt_final = f"Documentação encontrada:\n{texto_contexto}\n\nPergunta do Aluno: {msg.texto}"
    
    # Resposta via API Generativa (Gemini 2.5 Flash)
    resposta = client_gemini.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt_final,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION
        )
    )
    
    return {"resposta": resposta.text}