import os
import json
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
import firebase_admin
from firebase_admin import credentials, auth

# INICIALIZAÇÃO BLINDADA DO FIREBASE
if not firebase_admin._apps:
    # Tenta puxar a chave mestra (JSON) das variáveis de ambiente do Render
    firebase_creds_json = os.environ.get("FIREBASE_CREDENTIALS")
    
    if firebase_creds_json:
        # Converte o texto JSON de volta para um dicionário e autentica
        cred_dict = json.loads(firebase_creds_json)
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred)
    else:
        # Plano B caso a variável não seja encontrada
        firebase_admin.initialize_app(options={'projectId': 'comboboy-researcher'})

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False, 
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
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
    resposta = client_gemini.models.generate_content(
        model="gemini-3.5-flash", 
        contents=msg.texto,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION
        )
    )
    
    return {"resposta": resposta.text}