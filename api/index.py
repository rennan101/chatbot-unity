import os
import json
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
from google.genai.errors import APIError
import firebase_admin
from firebase_admin import credentials, auth

if not firebase_admin._apps:
    firebase_creds_json = os.environ.get("FIREBASE_CREDENTIALS")
    if firebase_creds_json:
        cred_dict = json.loads(firebase_creds_json)
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred)
    else:
        firebase_admin.initialize_app(options={'projectId': 'comboboy-researcher'})

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False, 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chave Global (Para Visitantes) e Modelo Padrão
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash") 

SYSTEM_INSTRUCTION = """Você é o ComboBoy Researcher, um pesquisador sênior especialista em Unity Engine 6.5, C# e arquitetura de jogos.
Regras OBRIGATÓRIAS:
1. Ensine de forma DIRETA, didática, de forma clara para iniciantes e sem enrolação.
2. SEMPRE forneça exemplos práticos de código C# limpo e funcional ou o passo a passo exato na interface do Unity.
3. Foque em boas práticas de desenvolvimento.
4. Priorize sistemas e codigos novos do unity como o uso do New Input System.
5. Questione o aluno sobre o que ele quer criar.
6. Nunca responda mensagens desrepeitosas.
7. Apenas utilize informações do Unity 6.5.
8. Não envie ou forneca imagens da internet para o usuário.
9. Se apresente uma única vez, ou caso seja perguntado."""

class Mensagem(BaseModel):
    texto: str

def verificar_token(authorization: str = Header(None)):
    # Se não houver token, retorna None (Usuário Visitante)
    if not authorization or not authorization.startswith("Bearer "):
        return None
    
    token = authorization.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print(f"🔥 ERRO DO FIREBASE AO VALIDAR TOKEN: {str(e)}") 
        raise HTTPException(status_code=401, detail=f"Token Inválido ou Expirado")

@app.post("/api/chat")
def chat(
    msg: Mensagem, 
    usuario_logado: dict = Depends(verificar_token),
    x_google_api_key: str = Header(None)
):
    # Lógica de prioridade: Chave do Usuário > Chave Global do Servidor
    chave_final = x_google_api_key if x_google_api_key else GOOGLE_API_KEY
    
    if not chave_final:
        raise HTTPException(status_code=400, detail="Serviço indisponível. Nenhuma API Key configurada.")

    try:
        client = genai.Client(api_key=chave_final)
        resposta = client.models.generate_content(
            model=GEMINI_MODEL, 
            contents=msg.texto,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION
            )
        )
        return {"resposta": resposta.text}
        
    except APIError as e:
        if e.code == 503:
            return {"resposta": "⚠️ **Aviso:** Os servidores da IA estão sobrecarregados no momento. Por favor, aguarde uns instantes e tente novamente."}
        elif e.code == 429:
            dono = "da **sua chave** " if x_google_api_key else ""
            return {"resposta": f"⚠️ **Aviso:** O limite de cota {dono}da API foi atingido. Tente novamente mais tarde."}
        elif e.code == 400 and "API key not valid" in str(e).lower():
            return {"resposta": "⚠️ **Aviso:** A sua Google API Key é inválida. Verifique nas Configurações."}
        else:
            return {"resposta": f"⚠️ **Erro na IA:** Ocorreu um problema inesperado de comunicação ({e.code})."}
            
    except Exception as e:
        print(f"🔥 ERRO INTERNO: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno no servidor.")