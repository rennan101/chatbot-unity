import os
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware # ADICIONE ESTA LINHA
from pydantic import BaseModel
from google import genai
from google.genai import types
import firebase_admin
from firebase_admin import credentials, auth

if not firebase_admin._apps:
    firebase_admin.initialize_app(options={'projectId': 'comboboy-researcher'})

app = FastAPI()

# ADICIONE ESTE BLOCO PARA LIBERAR O CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permite que qualquer frontend se conecte (você pode colocar a URL do Vercel aqui depois)
    allow_credentials=True,
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
        raise HTTPException(status_code=401, detail="Token Inválido ou Expirado")

@app.post("/api/chat")
def chat(msg: Mensagem, usuario_logado: dict = Depends(verificar_token)):
    resposta = client_gemini.models.generate_content(
        model="gemini-2.5-flash", 
        contents=msg.texto,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION
        )
    )
    
    return {"resposta": resposta.text}