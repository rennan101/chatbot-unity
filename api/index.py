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

# INICIALIZAÇÃO BLINDADA DO FIREBASE
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

# ======== CONFIGURAÇÕES DA API E MODELO ========
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
# Puxa o modelo da variável de ambiente no Render. Se não existir, usa o 3.5-flash como padrão.
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash") 

client_gemini = genai.Client(api_key=GOOGLE_API_KEY)

SYSTEM_INSTRUCTION = """Você é o ComboBoy Researcher, um professor sênior especialista em Unity Engine, C# e arquitetura de jogos.
Regras OBRIGATÓRIAS:
1. Ensine de forma DIRETA, didática e sem enrolação.
2. SEMPRE forneça exemplos práticos de código C# limpo e funcional ou o passo a passo exato na interface do Unity.
3. Foque em boas práticas de desenvolvimento, como o uso do New Input System quando solicitado."""

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
        print(f"🔥 ERRO DO FIREBASE AO VALIDAR TOKEN: {str(e)}") 
        raise HTTPException(status_code=401, detail=f"Token Inválido ou Expirado: {str(e)}")

@app.post("/api/chat")
def chat(msg: Mensagem, usuario_logado: dict = Depends(verificar_token)):
    try:
        resposta = client_gemini.models.generate_content(
            model=GEMINI_MODEL, # Agora o modelo é injetado dinamicamente aqui
            contents=msg.texto,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION
            )
        )
        return {"resposta": resposta.text}
        
    except APIError as e:
        if e.code == 503:
            mensagem_erro = "⚠️ **Aviso:** Os servidores da IA estão sobrecarregados no momento. Por favor, aguarde uns instantes e tente novamente."
            return {"resposta": mensagem_erro}
        elif e.code == 429:
            mensagem_erro = "⚠️ **Aviso:** O limite de cota da chave da API foi atingido. Tente novamente mais tarde."
            return {"resposta": mensagem_erro}
        else:
            return {"resposta": f"⚠️ **Erro na IA:** Ocorreu um problema inesperado de comunicação ({e.code})."}
            
    except Exception as e:
        print(f"🔥 ERRO INTERNO: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno no servidor.")