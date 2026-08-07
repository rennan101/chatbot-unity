import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==========================================================
// 1. CONFIGURAÇÕES & ESTADO GLOBAL
// ==========================================================
const firebaseConfig = {
  apiKey: "AIzaSyB9PBFyHyFygm8_GLrjIfuRJDcMG9eKMw8",
  authDomain: "comboboy-researcher.firebaseapp.com",
  projectId: "comboboy-researcher",
  storageBucket: "comboboy-researcher.firebasestorage.app",
  messagingSenderId: "284268551462",
  appId: "1:284268551462:web:86a1681ddb8255b9a975e7",
  measurementId: "G-2GNENJ2STE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let usuarioAtual = null;
window.projetos = [];  
let idConversaAtiva = null; 
let idProjetoAtivo = null;
let alvoMenu = { tipo: null, indexProj: null, indexConv: null };
let statusConversas = {};
let unsubscribeProjetos = null;
let unsubscribeConvites = null;
let unsubscribeNotificacoes = null;

// Preferências Visuais
let prefDetalhado = localStorage.getItem('unity_pref_detalhado') !== 'false';
let prefComentado = localStorage.getItem('unity_pref_comentado') === 'true';
let prefChatFs = parseFloat(localStorage.getItem('unity_pref_chat_fs')) || 0.95;
let prefCodeFs = parseFloat(localStorage.getItem('unity_pref_code_fs')) || 1.05;

// Perfil Dinâmico para a IA
let perfilGlobalData = { profissao: "", tags: [] };

// Anexos e API Key
let anexoImagemBase64 = null;
let anexoImagemMimeType = null;
let anexoTextoConteudo = null;
let anexoTextoNome = null;
let userApiKey = '';

// Ícones SVGs Injetados
const SVG_CHECK = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const SVG_SETTINGS = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
const SVG_DOWNLOAD = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
const SVG_FOLDER = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
const SVG_SAVE = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
const SVG_EDIT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
const SVG_ARCHIVE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>`;
const SVG_FILE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`;
const SVG_TRASH = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
const SVG_WARN = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
const SVG_CLOCK = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
const SVG_SPINNER = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
const SVG_COPY = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const SVG_SHARE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;

// ==========================================================
// 2. UTILITÁRIOS BASE E MEMES
// ==========================================================
const memesLoading = ["Farmando aura...", "Consultando o ancião...", "Esfregando a lâmpada...", "Calculando a física do Unity...", "Procurando o ponto e vírgula perdido...", "Compilando os shaders...", "Perguntando pro StackOverflow...", "Mineirando redstone para ligar o servidor...", "Carregando a barra de mana...", "Treinando a rede neural com café...", "Girando a manivela do backend...", "Invocando os deuses do C#...", "Dando um git pull na sabedoria...", "Baixando mais RAM...", "Refatorando o universo..."];
const memesSucesso = ["GG WP! Tudo salvo.", "É TETRA! Operação concluída.", "Dropou o loot lendário!", "Missão Cumprida (+100 XP).", "Vitória Royale!", "Código buildado com zero warnings.", "Receba! Tudo certo por aqui.", "Mais liso que rodar a 144fps.", "Pode ir pro abraço, tá salvo!", "Famoso 'toca pro pai'.", "Novo membro na party!", "CTRL+C perfeito, patrão.", "Tá no pente!", "Deu bom! Pode favoritar.", "Sincronizado perfeitamente."];
const memesErro = ["O servidor foi de base... F no chat.", "Tankou não. Tente novamente.", "Deu tela azul aqui, chefe.", "Erro 404: Vontade de trabalhar sumiu.", "Eita, o Unity crashou (de novo).", "Fomos nerfados! Limite atingido.", "Faltou poção de mana pra essa ação.", "Alguém tropeçou no cabo do servidor.", "NullReferenceException na vida real.", "O estagiário apagou o banco de dados."];
const memesAviso = ["Calma lá emocionade, digita algo!", "Vai mandar o vazio pro além?", "Você não tem level suficiente pra isso.", "Opa, tá tentando bugar a Matrix?", "Segura a emoção, o parceiro tá digitando...", "Miss click? Ação cancelada.", "Inventário cheio! Limite atingido.", "Permissão negada. Você não é o dono!", "Esqueceu a chave da API em casa?", "Hackerman detectado!"];

function getMeme(tipo) {
    let lista = [];
    if(tipo === 'loading') lista = memesLoading;
    else if(tipo === 'sucesso') lista = memesSucesso;
    else if(tipo === 'erro') lista = memesErro;
    else if(tipo === 'aviso') lista = memesAviso;
    return lista[Math.floor(Math.random() * lista.length)];
}

function formatarNomeUsuario(emailOrName) {
    if (!emailOrName) return 'Visitante';
    const base = emailOrName.includes('@') ? emailOrName.split('@')[0] : emailOrName;
    return base.charAt(0).toUpperCase() + base.slice(1);
}
window.formatarNomeUsuario = formatarNomeUsuario;

function formatarDataHora(timestamp) {
    if (!timestamp) return "";
    const data = new Date(timestamp);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const min = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes} às ${hora}:${min}`;
}
window.formatarDataHora = formatarDataHora;

function mostrarToast(msg, cor, icone) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toast-msg').innerText = msg;
    document.getElementById('toast-icon').innerHTML = icone || '';
    toast.style.background = cor || 'rgba(245, 130, 32, 0.9)';
    toast.classList.add('mostrar');
    setTimeout(() => toast.classList.remove('mostrar'), 3000);
}
window.mostrarToast = mostrarToast;

function aplicarTamanhosFonte() {
    document.documentElement.style.setProperty('--chat-fs', prefChatFs + 'rem');
    document.documentElement.style.setProperty('--code-fs', prefCodeFs + 'rem');
}
window.aplicarTamanhosFonte = aplicarTamanhosFonte;
aplicarTamanhosFonte();

function atualizarIndicadorApiKey() {
    const btn = document.getElementById('config-btn-apikey');
    if (btn) {
        if (userApiKey) {
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg> Chave Própria (Ativa) <span style="background:#2ea043; width:8px; height:8px; border-radius:50%; display:inline-block; margin-left:5px;"></span>`;
            btn.style.color = "#2ea043";
        } else {
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg> Inserir Própria API Key`;
            btn.style.color = "#F58220";
        }
    }
}
window.atualizarIndicadorApiKey = atualizarIndicadorApiKey;

// ==========================================================
// 3. AUTH E GESTÃO DE PERFIL
// ==========================================================
onAuthStateChanged(auth, async (user) => {
    fecharModalAuth();
    const btnProfile = document.getElementById('btn-profile');
    const btnNotif = document.getElementById('btn-notificacoes');

    if (user) {
        usuarioAtual = user;
        const userEmail = user.email || 'Usuario';
        const photoUrl = user.photoURL || `https://ui-avatars.com/api/?name=${userEmail}&background=21262d&color=c9d1d9&rounded=true`;
        const displayName = user.displayName || formatarNomeUsuario(userEmail);

        btnProfile.innerHTML = `<img src="${photoUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;"> <span class="texto-btn" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${displayName}</span>`;
        btnProfile.onclick = abrirProfileMenu;
        
        document.getElementById('config-btn-apikey').style.display = 'flex';
        btnNotif.style.display = 'flex';

        try {
            const docSnap = await getDoc(doc(db, "usuarios", user.uid));
            if (docSnap.exists()) {
                const data = docSnap.data();
                perfilGlobalData.profissao = data.profissao || "";
                perfilGlobalData.tags = data.tags || [];
                tagsSelecionadas = data.tags || [];

                if (data.googleApiKey) {
                    userApiKey = data.googleApiKey;
                    localStorage.setItem('unity_google_api_key', userApiKey);
                    document.getElementById('input-api-key').value = userApiKey;
                } else {
                    userApiKey = localStorage.getItem('unity_google_api_key') || '';
                    document.getElementById('input-api-key').value = userApiKey;
                }
            } else {
                userApiKey = localStorage.getItem('unity_google_api_key') || '';
                document.getElementById('input-api-key').value = userApiKey;
            }
        } catch(e) { console.error("Erro ao puxar dados do usuário", e); }
        
        atualizarIndicadorApiKey();
        iniciarEscutaProjetosNuvem(userEmail);
        iniciarEscutaConvites(userEmail);
        iniciarEscutaNotificacoes(userEmail);
    } else {
        if (unsubscribeProjetos) unsubscribeProjetos();
        if (unsubscribeConvites) unsubscribeConvites();
        if (unsubscribeNotificacoes) unsubscribeNotificacoes();
        usuarioAtual = null;
        perfilGlobalData = { profissao: "", tags: [] };
        
        btnProfile.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="texto-btn">Minha Conta</span>`;
        btnProfile.onclick = abrirModalAuth;
        
        document.getElementById('config-btn-apikey').style.display = 'none';
        btnNotif.style.display = 'none';

        userApiKey = localStorage.getItem('unity_google_api_key') || '';
        document.getElementById('input-api-key').value = userApiKey;
        atualizarIndicadorApiKey();
        
        carregarProjetosLocais();
        resetarVisualizacaoChat();
    }
});

function abrirModalAuth() { document.getElementById('auth-error-msg').innerText = ''; document.getElementById('modal-auth').style.display = 'flex'; }
window.abrirModalAuth = abrirModalAuth;
function fecharModalAuth() { const m = document.getElementById('modal-auth'); if(m) m.style.display = 'none'; }
window.fecharModalAuth = fecharModalAuth;

function tratarErroAuth(erroCode) {
    switch(erroCode) {
        case 'auth/email-already-in-use': return 'E-mail já cadastrado.';
        case 'auth/invalid-email': return 'Digite um e-mail válido.';
        case 'auth/weak-password': return 'Pelo menos 6 caracteres.';
        case 'auth/invalid-credential': return 'Credenciais incorretas.';
        default: return `Erro: ${erroCode || 'Desconhecido'}. Tente novamente.`;
    }
}

document.getElementById('btn-login-email').onclick = async () => {
    const email = document.getElementById('email-input').value; const senha = document.getElementById('senha-input').value;
    const errorMsg = document.getElementById('auth-error-msg');
    if(!email || !senha) { errorMsg.innerText = "Preencha tudo."; return; }
    errorMsg.innerText = "Conectando..."; errorMsg.style.color = "#c9d1d9";
    try { await signInWithEmailAndPassword(auth, email, senha); } catch(e) { errorMsg.style.color = "#ff7b72"; errorMsg.innerText = tratarErroAuth(e.code); }
};

document.getElementById('btn-cadastro-email').onclick = async () => {
    const email = document.getElementById('email-input').value; const senha = document.getElementById('senha-input').value;
    const errorMsg = document.getElementById('auth-error-msg');
    if(!email || senha.length < 6) { errorMsg.style.color = "#ff7b72"; errorMsg.innerText = "E-mail e Senha (>6)."; return; }
    errorMsg.innerText = "Criando..."; errorMsg.style.color = "#c9d1d9";
    try { await createUserWithEmailAndPassword(auth, email, senha); } catch(e) { errorMsg.style.color = "#ff7b72"; errorMsg.innerText = tratarErroAuth(e.code); }
};

document.getElementById('btn-login-google').onclick = async () => {
    try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch(e) { document.getElementById('auth-error-msg').innerText = tratarErroAuth(e.code); }
};

function confirmarLogout() {
    if (confirm("Tem certeza que deseja sair da sua conta?")) {
        signOut(auth);
        document.getElementById('profile-menu').style.display = 'none';
    }
}
window.confirmarLogout = confirmarLogout;

// Perfil Modal e Tags
const TAGS_DISPONIVEIS = [
    "Programador C#", "Mecânicas", "Bot AI", "Level Design", "Animation 2D", "Animation 3D", 
    "Banco de dados", "Tech Artist", "UI/UX", "VFX", "Multiplayer/Netcode", "Mobile", 
    "VR/AR", "Game Design", "Sound Design", "Monetização", "Shader Graph", "Cinematics"
];
let tagsSelecionadas = [];

function renderizarTags() {
    const container = document.getElementById('container-tags');
    if(!container) return;
    container.innerHTML = '';
    TAGS_DISPONIVEIS.forEach(tag => {
        const isSelected = tagsSelecionadas.includes(tag);
        const span = document.createElement('span');
        span.className = `tag-badge ${isSelected ? 'selected' : ''}`;
        span.innerText = tag;
        span.onclick = () => {
            if(tagsSelecionadas.includes(tag)) { tagsSelecionadas = tagsSelecionadas.filter(t => t !== tag); } 
            else { tagsSelecionadas.push(tag); }
            renderizarTags();
        };
        container.appendChild(span);
    });
}
window.renderizarTags = renderizarTags;

async function abrirModalPerfil() {
    document.getElementById('profile-menu').style.display = 'none';
    if(!usuarioAtual) return;
    document.getElementById('input-perfil-nome').value = usuarioAtual.displayName || formatarNomeUsuario(usuarioAtual.email);
    document.getElementById('input-perfil-profissao').value = perfilGlobalData.profissao;
    tagsSelecionadas = [...perfilGlobalData.tags];
    renderizarTags();
    document.getElementById('modal-perfil').style.display = 'flex';
}
window.abrirModalPerfil = abrirModalPerfil;

function fecharModalPerfil() { document.getElementById('modal-perfil').style.display = 'none'; }
window.fecharModalPerfil = fecharModalPerfil;

async function salvarPerfil() {
    if(!usuarioAtual) return;
    const nome = document.getElementById('input-perfil-nome').value.trim();
    const profissao = document.getElementById('input-perfil-profissao').value.trim();
    
    try {
        if(nome && nome !== usuarioAtual.displayName) {
            await updateProfile(usuarioAtual, { displayName: nome });
            const photoUrl = usuarioAtual.photoURL || `https://ui-avatars.com/api/?name=${usuarioAtual.email}&background=21262d&color=c9d1d9&rounded=true`;
            document.getElementById('btn-profile').innerHTML = `<img src="${photoUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;"> <span class="texto-btn" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${nome}</span>`;
        }

        await setDoc(doc(db, "usuarios", usuarioAtual.uid), {
            nome: nome,
            profissao: profissao,
            tags: tagsSelecionadas,
            email: usuarioAtual.email
        }, { merge: true });

        perfilGlobalData.profissao = profissao;
        perfilGlobalData.tags = [...tagsSelecionadas];

        fecharModalPerfil();
        mostrarToast(getMeme('sucesso'), 'rgba(46, 204, 113, 0.9)', SVG_CHECK);
    } catch(e) {
        mostrarToast(getMeme('erro'), 'rgba(218, 54, 51, 0.9)', SVG_WARN);
    }
}
window.salvarPerfil = salvarPerfil;


// ==========================================================
// 4. GESTÃO DE ANEXOS (IMAGEM E CÓDIGO)
// ==========================================================
function redimensionarEComprimirImagem(file, maxSize, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            let width = img.width; let height = img.height;
            if (width > maxSize || height > maxSize) {
                if (width > height) { height = Math.round((height * maxSize) / width); width = maxSize; } 
                else { width = Math.round((width * maxSize) / height); height = maxSize; }
            }
            const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
            const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, width, height);
            callback(canvas.toDataURL('image/jpeg', 0.8), 'image/jpeg');
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function lidarComAnexo(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    document.getElementById('btn-anexo').style.opacity = '0.5';
    
    if (file.type.startsWith('image/')) {
        anexoTextoConteudo = null; 
        redimensionarEComprimirImagem(file, 1024, function(base64Data, mimeType) {
            anexoImagemBase64 = base64Data;
            anexoImagemMimeType = mimeType;
            document.getElementById('file-preview').style.display = 'none';
            document.getElementById('image-preview').src = anexoImagemBase64;
            document.getElementById('image-preview').style.display = 'block';
            mostrarPreviewContainer();
        });
    } else {
        anexoImagemBase64 = null; 
        const reader = new FileReader();
        reader.onload = function(e) {
            anexoTextoConteudo = e.target.result;
            anexoTextoNome = file.name;
            document.getElementById('image-preview').style.display = 'none';
            document.getElementById('file-name').innerText = anexoTextoNome;
            document.getElementById('file-preview').style.display = 'flex';
            mostrarPreviewContainer();
        };
        reader.readAsText(file);
    }
}
window.lidarComAnexo = lidarComAnexo;

function mostrarPreviewContainer() {
    document.getElementById('anexo-preview-container').style.display = 'flex';
    document.getElementById('main-input-wrapper').style.borderRadius = '0 0 16px 16px';
    document.getElementById('btn-anexo').style.opacity = '1';
    validarInput();
}

function removerAnexo() {
    anexoImagemBase64 = null;
    anexoImagemMimeType = null;
    anexoTextoConteudo = null;
    anexoTextoNome = null;
    document.getElementById('input-anexo').value = '';
    document.getElementById('anexo-preview-container').style.display = 'none';
    document.getElementById('main-input-wrapper').style.borderRadius = '16px';
    validarInput();
}
window.removerAnexo = removerAnexo;


// ==========================================================
// 5. FIREBASE REALTIME E SISTEMA DE NOTIFICAÇÕES
// ==========================================================
function iniciarEscutaProjetosNuvem(email) {
    const q = query(collection(db, "projetos"), where("membros", "array-contains", email));
    unsubscribeProjetos = onSnapshot(q, (snapshot) => {
        window.projetos = [];
        snapshot.forEach((doc) => { window.projetos.push({ id: doc.id, ...doc.data() }); });
        renderizarSidebar();
        if (idProjetoAtivo !== null && window.projetos[idProjetoAtivo]) {
            if(window.projetos[idProjetoAtivo].conversas[idConversaAtiva]){
                renderizarChat();
            } else {
                resetarVisualizacaoChat();
            }
        }
    });
}
window.iniciarEscutaProjetosNuvem = iniciarEscutaProjetosNuvem;

async function sincronizarProjetoNaNuvem(indexProj) {
    if (!usuarioAtual || !window.projetos[indexProj].id) return;
    const proj = window.projetos[indexProj];
    const ref = doc(db, "projetos", proj.id);
    await updateDoc(ref, { 
        nome: proj.nome, aberto: proj.aberto, conversas: proj.conversas, membros: proj.membros || [], presenca: proj.presenca || {} 
    });
}
window.sincronizarProjetoNaNuvem = sincronizarProjetoNaNuvem;

function salvarDadosAtuais(indexProj = null) {
    if (usuarioAtual && indexProj !== null) { sincronizarProjetoNaNuvem(indexProj); } 
    else if (!usuarioAtual) { localStorage.setItem('unity_projetos_locais', JSON.stringify(window.projetos)); }
}
window.salvarDadosAtuais = salvarDadosAtuais;

function carregarProjetosLocais() {
    const salvo = localStorage.getItem('unity_projetos_locais');
    if (salvo) { window.projetos = JSON.parse(salvo); } else { window.projetos = []; }
    renderizarSidebar();
}

function atualizarPainelNotificacoesUnificado() {
    const listaNotif = document.getElementById('lista-notificacoes-popup');
    listaNotif.innerHTML = '';
    const totalItens = cacheConvites.length + cacheNotifs.length;
    atualizarBadgeGeral(totalItens > 0);

    if (totalItens === 0) {
        listaNotif.innerHTML = `<div style="color: #8b949e; font-size: 0.85rem; text-align: center; padding: 10px;">Nenhuma notificação.</div>`;
        return;
    }

    cacheConvites.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).forEach((convite) => {
        listaNotif.innerHTML += `
            <div id="convite-${convite.id}" style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; margin-bottom: 6px; font-size: 0.85rem; border: 1px solid rgba(245, 130, 32, 0.2);">
                <div style="color: #e6edf3; margin-bottom: 6px;"><b>${formatarNomeUsuario(convite.remetente)}</b> convidou você para <b>${convite.projetoNome}</b></div>
                <div style="display: flex; gap: 6px;">
                    <button onclick="responderConvite('${convite.id}', '${convite.projetoId}', '${convite.remetente}', '${convite.projetoNome}', true)" style="flex:1; background:#2ea043; color:white; border:none; padding:4px; border-radius:4px; cursor:pointer; font-weight:600;">Aceitar</button>
                    <button onclick="responderConvite('${convite.id}', '${convite.projetoId}', '${convite.remetente}', '${convite.projetoNome}', false)" style="flex:1; background:#da3633; color:white; border:none; padding:4px; border-radius:4px; cursor:pointer; font-weight:600;">Recusar</button>
                </div>
                <div style="font-size: 0.65rem; color: #8b949e; text-align: right; margin-top: 6px;">${formatarDataHora(convite.timestamp)}</div>
            </div>`;
    });

    cacheNotifs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).forEach((notif) => {
        listaNotif.innerHTML += `
            <div id="notif-${notif.id}" style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; margin-bottom: 6px; font-size: 0.85rem;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
                    <span style="color: #e6edf3; flex: 1;">${notif.mensagem}</span>
                    <button onclick="apagarNotificacao(event, '${notif.id}')" style="background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 2px; font-weight: bold; line-height: 1;">✕</button>
                </div>
                <div style="font-size: 0.65rem; color: #8b949e; text-align: right; margin-top: 4px;">${formatarDataHora(notif.timestamp)}</div>
            </div>`;
    });
}
window.atualizarPainelNotificacoesUnificado = atualizarPainelNotificacoesUnificado;

function iniciarEscutaConvites(email) {
    const q = query(collection(db, "convites"), where("destinatario", "==", email), where("status", "==", "pendente"));
    unsubscribeConvites = onSnapshot(q, (snapshot) => {
        cacheConvites = []; snapshot.forEach((docSnap) => { cacheConvites.push({ id: docSnap.id, ...docSnap.data() }); });
        atualizarPainelNotificacoesUnificado();
    });
}

function iniciarEscutaNotificacoes(email) {
    const q = query(collection(db, "notificacoes"), where("destinatario", "==", email));
    unsubscribeNotificacoes = onSnapshot(q, (snapshot) => {
        cacheNotifs = []; snapshot.forEach((docSnap) => { cacheNotifs.push({ id: docSnap.id, ...docSnap.data() }); });
        atualizarPainelNotificacoesUnificado();
    });
}

function abrirMenuNotificacoes(event) {
    event.stopPropagation();
    const menu = document.getElementById('notifications-menu');
    const btn = document.getElementById('btn-notificacoes').getBoundingClientRect();
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else {
        document.getElementById('config-menu').style.display = 'none';
        document.getElementById('profile-menu').style.display = 'none';
        menu.style.display = 'block';
        menu.style.right = '20px';
        menu.style.top = (btn.bottom + 10) + 'px';
    }
}
window.abrirMenuNotificacoes = abrirMenuNotificacoes;

async function responderConvite(conviteId, projetoId, remetente, projetoNome, aceitar) {
    const box = document.getElementById(`convite-${conviteId}`);
    if(box) box.style.display = 'none';
    try {
        if (aceitar && projetoId) {
            const projRef = doc(db, "projetos", projetoId);
            await updateDoc(projRef, { membros: arrayUnion(usuarioAtual.email) });
            mostrarToast(getMeme('sucesso'), "rgba(46, 204, 113, 0.9)", SVG_CHECK);
        } else {
            mostrarToast("Convite recusado.", "rgba(218, 54, 51, 0.9)", SVG_WARN);
        }
        await deleteDoc(doc(db, "convites", conviteId));
        await addDoc(collection(db, "notificacoes"), {
            destinatario: remetente,
            mensagem: `<b>${formatarNomeUsuario(usuarioAtual.email)}</b> ${aceitar ? "aceitou" : "recusou"} seu convite para <b>${projetoNome}</b>.`,
            timestamp: Date.now()
        });
        document.getElementById('notifications-menu').style.display = 'none';
    } catch(e) {
        if(box) box.style.display = 'block'; 
        mostrarToast(getMeme('erro'), "rgba(218, 54, 51, 0.9)", SVG_WARN);
    }
}
window.responderConvite = responderConvite;

async function apagarNotificacao(event, notifId) {
    event.stopPropagation();
    const box = document.getElementById(`notif-${notifId}`);
    if(box) box.style.display = 'none'; 
    try { await deleteDoc(doc(db, "notificacoes", notifId)); } 
    catch(e) { if(box) box.style.display = 'flex'; }
}
window.apagarNotificacao = apagarNotificacao;


// ==========================================================
// 6. UI DA BARRA LATERAL E MODAIS DE CONFIGURAÇÃO
// ==========================================================
function abrirMenuContexto(event, tipo, indexProj, indexConv = null) {
    event.preventDefault(); alvoMenu = { tipo, indexProj, indexConv };
    const menu = document.getElementById('context-menu');
    let menuHTML = '';
    
    if (tipo === 'projeto') {
        const isDonoProjeto = usuarioAtual && window.projetos[indexProj].membros && window.projetos[indexProj].membros[0] === usuarioAtual.email;
        
        if (usuarioAtual && window.projetos[indexProj].id) {
            menuHTML += `<div class="context-item" style="color:#F58220" onclick="abrirModalCompartilhar()">${SVG_SHARE} Add Colaborador</div><hr style="margin:5px 0; border-color:rgba(255,255,255,0.05);">`;
        }
        menuHTML += `<div class="context-item" onclick="abrirModalRenomear()">${SVG_EDIT} Renomear Projeto</div><div class="context-item" onclick="exportarProjetoZip()">${SVG_ARCHIVE} Baixar (.zip)</div>`;
        
        if (isDonoProjeto || !window.projetos[indexProj].id) {
            menuHTML += `<div class="context-item danger" onclick="deletarProjeto()">${SVG_TRASH} Apagar Projeto</div>`;
        }
    } else {
        const conv = window.projetos[indexProj].conversas[indexConv];
        const isDonoConversa = !usuarioAtual || !conv.criador || conv.criador === usuarioAtual.email;
        
        menuHTML = `<div class="context-item" onclick="abrirModalRenomear()">${SVG_EDIT} Renomear Conversa</div><div class="context-item" onclick="exportarConversaMD()">${SVG_FILE} Baixar (.md)</div>`;
        if (isDonoConversa) {
            menuHTML += `<div class="context-item danger" onclick="deletarConversa()">${SVG_TRASH} Apagar Conversa</div>`;
        }
    }
    menu.innerHTML = menuHTML;
    menu.style.display = 'block'; menu.style.left = event.pageX + 'px'; menu.style.top = event.pageY + 'px';
}
window.abrirMenuContexto = abrirMenuContexto;

function renderizarSidebar() {
    const container = document.getElementById('lista-projetos');
    if(!container) return;
    container.innerHTML = ''; 

    window.projetos.forEach((proj, indexProj) => {
        const iconeSeta = proj.aberto ? '▼' : '▶';
        const inicialProjeto = proj.nome.charAt(0).toUpperCase();

        const projetoDiv = document.createElement('div');
        projetoDiv.className = 'projeto-item';
        projetoDiv.innerHTML = `
            <div class="projeto-header" oncontextmenu="abrirMenuContexto(event, 'projeto', ${indexProj})">
                <div class="projeto-avatar" title="${proj.nome}" onclick="alternarPasta(${indexProj})">${inicialProjeto}</div>
                <div class="projeto-titulo" onclick="alternarPasta(${indexProj})">
                    <span style="font-size: 0.6rem; color: #8b949e; width: 15px;">${iconeSeta}</span>
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${proj.nome}</span>
                </div>
                <button class="icon-btn" title="Nova Conversa" onclick="novaConversa(${indexProj}, event)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
            <div class="lista-conversas ${proj.aberto ? 'aberta' : ''}" id="conversas-${indexProj}"></div>
        `;
        container.appendChild(projetoDiv);

        const containerConversas = document.getElementById(`conversas-${indexProj}`);
        proj.conversas.forEach((conv, indexConv) => {
            const estaProcessando = conv.processando === true;
            const estaAtiva = (idProjetoAtivo === indexProj && idConversaAtiva === indexConv);
            
            let emailsNaConversa = [];
            if (proj.presenca) {
                Object.entries(proj.presenca).forEach(([emailUser, cIdx]) => {
                    if (cIdx === indexConv && (!usuarioAtual || emailUser !== usuarioAtual.email)) emailsNaConversa.push(emailUser);
                });
            }

            let avataresPresencaHTML = '';
            if (emailsNaConversa.length > 0) {
                const primeiroEmail = emailsNaConversa[0];
                const primeiroAvatar = `https://ui-avatars.com/api/?name=${primeiroEmail}&background=21262d&color=c9d1d9&rounded=true`;
                avataresPresencaHTML += `<img src="${primeiroAvatar}" title="${formatarNomeUsuario(primeiroEmail)}" style="width: 18px; height: 18px; border-radius: 50%; border: 1px solid #F58220; object-fit: cover; vertical-align: middle; margin-left: 4px;">`;
                if (emailsNaConversa.length > 1) {
                    const todosNomes = emailsNaConversa.map(e => formatarNomeUsuario(e)).join(', ');
                    avataresPresencaHTML += `<span title="${todosNomes}" style="font-size: 0.7rem; background: rgba(245,130,32,0.2); color: #F58220; padding: 1px 4px; border-radius: 4px; margin-left: 3px; vertical-align: middle; cursor: help;">+${emailsNaConversa.length - 1}</span>`;
                }
            }

            const convDiv = document.createElement('div');
            convDiv.id = `conv-${indexProj}-${indexConv}`;
            convDiv.className = `conversa-item ${estaAtiva ? 'ativa' : ''} ${estaProcessando ? 'processando' : ''}`;
            convDiv.innerHTML = `
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width: calc(100% - 40px);">${conv.nome}</span>
                <span style="display:flex; align-items:center; flex-shrink:0;">${avataresPresencaHTML} <span class="status-icon">${estaProcessando ? SVG_SPINNER : ''}</span></span>
            `;
            convDiv.onclick = () => selecionarConversa(indexProj, indexConv);
            convDiv.oncontextmenu = (e) => abrirMenuContexto(e, 'conversa', indexProj, indexConv);
            containerConversas.appendChild(convDiv);
        });
    });
    atualizarEstadoBotaoEnvio();
}

function alternarSidebar() { document.getElementById('sidebar').classList.toggle('recolhido'); } window.alternarSidebar = alternarSidebar;
function alternarPasta(indexProj) { window.projetos[indexProj].aberto = !window.projetos[indexProj].aberto; salvarDadosAtuais(indexProj); renderizarSidebar(); } window.alternarPasta = alternarPasta;

function abrirProfileMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('profile-menu');
    const btn = document.getElementById('btn-profile').getBoundingClientRect();
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else {
        document.getElementById('config-menu').style.display = 'none';
        document.getElementById('notifications-menu').style.display = 'none';
        menu.style.display = 'block';
        menu.style.left = (btn.left + 10) + 'px';
        menu.style.top = (btn.top - menu.offsetHeight - 10) + 'px';
    }
}
window.abrirProfileMenu = abrirProfileMenu;

function abrirModal() { document.getElementById('modal-projeto').style.display = 'flex'; document.getElementById('input-nome-projeto').value = ''; document.getElementById('input-nome-projeto').focus(); }
window.abrirModal = abrirModal;

function fecharModal() { document.getElementById('modal-projeto').style.display = 'none'; }
window.fecharModal = fecharModal;

function abrirModalCompartilhar() {
    document.getElementById('context-menu').style.display = 'none'; document.getElementById('input-email-convite').value = '';
    const container = document.getElementById('lista-colaboradores-atual'); container.innerHTML = '';
    if (alvoMenu.indexProj !== null) {
        const proj = window.projetos[alvoMenu.indexProj]; const membros = proj.membros || [];
        membros.forEach(email => {
            const row = document.createElement('div'); row.className = 'colaborador-row';
            const badgeDono = (email === membros[0]) ? ' <span style="font-size:0.75rem; background:rgba(245,130,32,0.2); color:#F58220; padding:1px 6px; border-radius:4px; margin-left:6px;">Dono</span>' : '';
            row.innerHTML = `<span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width: 260px;" title="${email}">${formatarNomeUsuario(email)}${badgeDono}</span>`;
            if (email !== membros[0]) {
                const btnRemover = document.createElement('button'); btnRemover.className = 'btn-remover-collab'; btnRemover.innerText = 'Remover';
                btnRemover.onclick = () => removerColaborador(email); row.appendChild(btnRemover);
            }
            container.appendChild(row);
        });
    }
    document.getElementById('modal-compartilhar').style.display = 'flex';
}
window.abrirModalCompartilhar = abrirModalCompartilhar;

function abrirModalRenomear() { document.getElementById('context-menu').style.display='none'; const modal = document.getElementById('modal-renomear'); const input = document.getElementById('input-nome-renomear'); const titulo = document.getElementById('titulo-modal-renomear'); if (alvoMenu.tipo === 'projeto') { titulo.innerText = 'Renomear Projeto'; input.value = window.projetos[alvoMenu.indexProj].nome; } else { titulo.innerText = 'Renomear Conversa'; input.value = window.projetos[alvoMenu.indexProj].conversas[alvoMenu.indexConv].nome; } modal.style.display = 'flex'; input.focus(); }
window.abrirModalRenomear = abrirModalRenomear;

function fecharModalRenomear() { document.getElementById('modal-renomear').style.display = 'none'; }
window.fecharModalRenomear = fecharModalRenomear;

async function confirmarProjeto() {
    const nome = document.getElementById('input-nome-projeto').value.trim();
    const genero = document.getElementById('input-genero-projeto').value.trim();
    const descricao = document.getElementById('input-desc-projeto').value.trim();
    if (!nome) return;
    fecharModal(); 
    if (usuarioAtual) {
        await addDoc(collection(db, "projetos"), { nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [], membros: [usuarioAtual.email], presenca: {} });
        mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_FOLDER); 
    } else {
        window.projetos.push({ nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [] }); salvarDadosAtuais(); renderizarSidebar(); 
    }
}
window.confirmarProjeto = confirmarProjeto;

function novaConversa(indexProj, event) {
    event.stopPropagation();
    window.projetos[indexProj].conversas.push({ 
        nome: `Nova Conversa ${window.projetos[indexProj].conversas.length + 1}`, 
        criador: usuarioAtual ? usuarioAtual.email : 'visitante',
        processando: false, mensagens: [] 
    });
    window.projetos[indexProj].aberto = true; salvarDadosAtuais(indexProj); renderizarSidebar(); selecionarConversa(indexProj, window.projetos[indexProj].conversas.length - 1);
}
window.novaConversa = novaConversa;

async function confirmarCompartilhamento() {
    const email = document.getElementById('input-email-convite').value.trim();
    if (email && usuarioAtual && alvoMenu.indexProj !== null) {
        const proj = window.projetos[alvoMenu.indexProj];
        await addDoc(collection(db, "convites"), { projetoId: proj.id, projetoNome: proj.nome, remetente: usuarioAtual.email, destinatario: email, status: "pendente", timestamp: Date.now() });
        document.getElementById('input-email-convite').value = ''; abrirModalCompartilhar(); mostrarToast('Convite enviado!', 'rgba(46, 204, 113, 0.9)', SVG_SHARE);
    }
}
window.confirmarCompartilhamento = confirmarCompartilhamento;

async function removerColaborador(email) {
    if (confirm(`Deseja remover ${formatarNomeUsuario(email)}?`)) {
        if (alvoMenu.indexProj !== null) {
            const proj = window.projetos[alvoMenu.indexProj];
            if (proj && proj.id) {
                await updateDoc(doc(db, "projetos", proj.id), { membros: arrayRemove(email) });
                proj.membros = proj.membros.filter(m => m !== email); abrirModalCompartilhar();
            }
        }
    }
}
window.removerColaborador = removerColaborador;

function confirmarRenomear() {
    const novo = document.getElementById('input-nome-renomear').value.trim(); if (!novo) return;
    if (alvoMenu.tipo === 'projeto') window.projetos[alvoMenu.indexProj].nome = novo; else window.projetos[alvoMenu.indexProj].conversas[alvoMenu.indexConv].nome = novo;
    salvarDadosAtuais(alvoMenu.indexProj); renderizarSidebar(); 
    if (idProjetoAtivo !== null) document.getElementById('header-title').innerText = `${window.projetos[idProjetoAtivo].nome} / ${window.projetos[idProjetoAtivo].conversas[idConversaAtiva].nome}`;
    fecharModalRenomear();
}
window.confirmarRenomear = confirmarRenomear;

function deletarConversa() {
    if (confirm('Apagar esta conversa?')) {
        const pIdx = alvoMenu.indexProj; const cIdx = alvoMenu.indexConv;
        window.projetos[pIdx].conversas.splice(cIdx, 1);
        if (idProjetoAtivo === pIdx) { if (idConversaAtiva === cIdx) { idProjetoAtivo=null; idConversaAtiva=null; } else if (idConversaAtiva > cIdx) idConversaAtiva--; }
        salvarDadosAtuais(pIdx); renderizarSidebar(); idProjetoAtivo===null ? resetarVisualizacaoChat() : renderizarChat();
    }
}
window.deletarConversa = deletarConversa;

async function deletarProjeto() {
    if (confirm('Apagar permanentemente o projeto?')) {
        const pIdx = alvoMenu.indexProj;
        if (usuarioAtual && window.projetos[pIdx].id) await deleteDoc(doc(db, "projetos", window.projetos[pIdx].id));
        else { window.projetos.splice(pIdx, 1); salvarDadosAtuais(); }
        if (idProjetoAtivo === pIdx) { idProjetoAtivo=null; idConversaAtiva=null; } else if (idProjetoAtivo > pIdx) idProjetoAtivo--;
        renderizarSidebar(); idProjetoAtivo===null ? resetarVisualizacaoChat() : renderizarChat();
    }
}
window.deletarProjeto = deletarProjeto;

function abrirConfigMenu(e) { 
    e.stopPropagation(); 
    const menu = document.getElementById('config-menu'); 
    const btn = document.getElementById('btn-config').getBoundingClientRect(); 
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else { document.getElementById('profile-menu').style.display = 'none'; document.getElementById('notifications-menu').style.display = 'none'; menu.style.display = 'block'; menu.style.left = (btn.left + 10) + 'px'; menu.style.top = (btn.top - menu.offsetHeight - 10) + 'px'; } 
}
window.abrirConfigMenu = abrirConfigMenu;

function abrirModalPersonalizar() {
    document.getElementById('config-menu').style.display = 'none';
    document.getElementById('label-chat-fs').innerText = prefChatFs.toFixed(2);
    document.getElementById('label-code-fs').innerText = prefCodeFs.toFixed(2);
    document.getElementById('check-pref-comentado').checked = prefComentado;
    document.getElementById('select-pref-detalhe').value = prefDetalhado.toString();
    document.getElementById('modal-personalizar').style.display = 'flex';
}
window.abrirModalPersonalizar = abrirModalPersonalizar;

function fecharModalPersonalizar() { document.getElementById('modal-personalizar').style.display = 'none'; }
window.fecharModalPersonalizar = fecharModalPersonalizar;

function ajustarFonte(tipo, valor) {
    if (tipo === 'chat') { prefChatFs = Math.max(0.7, Math.min(1.5, prefChatFs + valor)); document.getElementById('label-chat-fs').innerText = prefChatFs.toFixed(2); } 
    else { prefCodeFs = Math.max(0.7, Math.min(1.5, prefCodeFs + valor)); document.getElementById('label-code-fs').innerText = prefCodeFs.toFixed(2); }
    aplicarTamanhosFonte();
}
window.ajustarFonte = ajustarFonte;

function salvarPersonalizacao() {
    prefComentado = document.getElementById('check-pref-comentado').checked; prefDetalhado = document.getElementById('select-pref-detalhe').value === "true";
    localStorage.setItem('unity_pref_chat_fs', prefChatFs); localStorage.setItem('unity_pref_code_fs', prefCodeFs); localStorage.setItem('unity_pref_comentado', prefComentado); localStorage.setItem('unity_pref_detalhado', prefDetalhado);
    window.fecharModalPersonalizar(); mostrarToast('Preferências atualizadas!', 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS);
}
window.salvarPersonalizacao = salvarPersonalizacao;

function abrirModalApiKey() { document.getElementById('config-menu').style.display = 'none'; document.getElementById('modal-apikey').style.display = 'flex'; }
window.abrirModalApiKey = abrirModalApiKey;

async function salvarApiKey() { 
    userApiKey = document.getElementById('input-api-key').value.trim(); 
    localStorage.setItem('unity_google_api_key', userApiKey); 
    
    if (usuarioAtual) {
        try {
            await setDoc(doc(db, "usuarios", usuarioAtual.uid), {
                googleApiKey: userApiKey
            }, { merge: true });
        } catch(e) { console.error("Erro ao salvar API Key", e); }
    }
    
    document.getElementById('modal-apikey').style.display = 'none'; 
    atualizarIndicadorApiKey();
    mostrarToast('Chave salva!', 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); 
}
window.salvarApiKey = salvarApiKey;

let configAskToSave = localStorage.getItem('unity_config_ask_save') !== 'false'; document.getElementById('toggle-ask-save').checked = configAskToSave;
function salvarPreferenciasConfig() { configAskToSave = document.getElementById('toggle-ask-save').checked; localStorage.setItem('unity_config_ask_save', configAskToSave); mostrarToast('Salvo', 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); }
window.salvarPreferenciasConfig = salvarPreferenciasConfig;


// ==========================================================
// 7. SISTEMA DE CHAT, RESPOSTAS DA IA E MENSAGENS
// ==========================================================
function getChaveConversa(pIdx, cIdx) { return `${pIdx}_${cIdx}`; }

function resetarVisualizacaoChat() { 
    idProjetoAtivo = null; idConversaAtiva = null; 
    document.getElementById('input-container').classList.remove('ativo'); 
    document.getElementById('header-title').innerText = 'ComboBoy Researcher'; document.getElementById('header-subtitle').innerText = ''; 
    document.getElementById('chat').innerHTML = '<div id="sem-conversa-msg">Selecione uma conversa ao lado ou crie um novo projeto para começar.</div>'; 
}
window.resetarVisualizacaoChat = resetarVisualizacaoChat;

async function selecionarConversa(indexProj, indexConv) {
    idProjetoAtivo = indexProj; idConversaAtiva = indexConv;
    if (usuarioAtual && window.projetos[indexProj].id) {
        const proj = window.projetos[indexProj]; proj.presenca = proj.presenca || {}; proj.presenca[usuarioAtual.email] = indexConv;
        renderizarSidebar(); updateDoc(doc(db, "projetos", proj.id), { presenca: proj.presenca });
    }
    document.querySelectorAll('.conversa-item').forEach(el => el.classList.remove('ativa'));
    const itemAtivo = document.getElementById(`conv-${indexProj}-${indexConv}`); if (itemAtivo) itemAtivo.classList.add('ativa');
    document.getElementById('input-container').classList.add('ativo');
    const proj = window.projetos[indexProj]; const conv = proj.conversas[indexConv];
    document.getElementById('header-title').innerText = `${proj.nome} / ${conv.nome}`;
    const autorEmail = conv.criador ? conv.criador : (usuarioAtual ? usuarioAtual.email : 'Visitante');
    document.getElementById('header-subtitle').innerText = `Criado por: ${formatarNomeUsuario(autorEmail)}`;
    renderizarChat(); atualizarEstadoBotaoEnvio(); validarInput();
}
window.selecionarConversa = selecionarConversa;

function renderizarChat() {
    if (idProjetoAtivo === null || !window.projetos[idProjetoAtivo] || !window.projetos[idProjetoAtivo].conversas[idConversaAtiva]) return;
    const chatBox = document.getElementById('chat'); chatBox.innerHTML = ''; 
    const conversa = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    
    conversa.mensagens.forEach(msg => {
        if (msg.papel === 'system') {
            chatBox.innerHTML += `<div class="system-msg">${msg.texto}</div>`;
        } else {
            let imgHtml = msg.imagem_url ? `<img src="${msg.imagem_url}" class="balao-imagem">` : '';
            chatBox.innerHTML += `<div class="balao ${msg.papel}">${imgHtml}${msg.papel === 'aluno' ? msg.texto.replace(/\n/g, '<br>') : marked.parse(msg.texto)}</div>`;
        }
    });
    
    const estaProcessando = conversa.processando === true;
    if (estaProcessando) {
        chatBox.innerHTML += `
        <div class="balao bot" style="display: flex; flex-direction: column; gap: 8px;">
            <div class="typing-indicator"><span></span><span></span><span></span></div>
            <span style="font-size: 0.75rem; color: #8b949e; font-style: italic;">${getMeme('loading')}</span>
        </div>`;
    }

    formatarBlocosDeCodigo(); chatBox.scrollTop = chatBox.scrollHeight;
}
window.renderizarChat = renderizarChat;

function validarInput() {
    const input = document.getElementById('mensagem'); const btn = document.getElementById('btn-acao');
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const conv = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    const estaProcessando = conv?.processando === true;
    
    if (!estaProcessando) {
        btn.disabled = input.value.trim().length === 0 && !anexoImagemBase64 && !anexoTextoConteudo;
    } else {
        btn.disabled = false;
    }
}
window.validarInput = validarInput;

function atualizarEstadoBotaoEnvio() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const btn = document.getElementById('btn-acao'); const iconSend = document.getElementById('icon-send'); const iconStop = document.getElementById('icon-stop');
    const conv = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    const estaProcessando = conv?.processando === true;

    if (estaProcessando) {
        btn.classList.remove('enviar');
        btn.classList.add('stop');
        btn.disabled = false;
        iconSend.style.display = 'none';
        iconStop.style.display = 'block';
        btn.title = "Cancelar Resposta";
    } else {
        btn.classList.remove('stop');
        btn.classList.add('enviar');
        iconStop.style.display = 'none';
        iconSend.style.display = 'block';
        btn.title = "Enviar";
        validarInput();
    }
}
window.atualizarEstadoBotaoEnvio = atualizarEstadoBotaoEnvio;

function lidarComAcao() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const pIdx = idProjetoAtivo; const cIdx = idConversaAtiva;
    const chave = getChaveConversa(pIdx, cIdx);
    const conv = window.projetos[pIdx].conversas[cIdx];

    if (conv?.processando) {
        if (statusConversas[chave] && statusConversas[chave].controller) {
            statusConversas[chave].controller.abort();
            window.projetos[pIdx].conversas[cIdx].processando = false;
            salvarDadosAtuais(pIdx);
            renderizarChat();
            atualizarEstadoBotaoEnvio();
        } else {
            mostrarToast(getMeme('aviso'), 'rgba(245, 130, 32, 0.9)', SVG_WARN);
        }
    } else {
        enviarMensagem();
    }
}
window.lidarComAcao = lidarComAcao;

async function enviarMensagem() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const pIdx = idProjetoAtivo; const cIdx = idConversaAtiva;
    const proj = window.projetos[pIdx];
    const chave = getChaveConversa(pIdx, cIdx);
    
    if (proj.conversas[cIdx].processando) return;

    const input = document.getElementById('mensagem'); 
    let textoDigitado = input.value.trim(); 
    let textoFinal = textoDigitado;
    
    if (anexoTextoConteudo) {
        const ext = anexoTextoNome.split('.').pop().toLowerCase();
        const linguagemMarkdown = (ext === 'cs') ? 'csharp' : ext; 
        const quebraLinha = textoDigitado ? '\n\n' : '';
        textoFinal += `${quebraLinha}📄 **Arquivo Anexado (${anexoTextoNome}):**\n\`\`\`${linguagemMarkdown}\n${anexoTextoConteudo}\n\`\`\``;
    }
    
    const imgBase64 = anexoImagemBase64; const imgMime = anexoImagemMimeType;
    if(!textoFinal && !imgBase64) return;

    const novaMsg = { papel: 'aluno', texto: textoFinal };
    if (imgBase64) novaMsg.imagem_url = imgBase64; 

    proj.conversas[cIdx].mensagens.push(novaMsg);
    
    if (proj.conversas[cIdx].mensagens.length === 2) {
        if (textoDigitado) proj.conversas[cIdx].nome = textoDigitado.substring(0, 25) + (textoDigitado.length > 25 ? "..." : "");
        else if (anexoTextoNome) proj.conversas[cIdx].nome = `Análise: ${anexoTextoNome}`;
        else proj.conversas[cIdx].nome = "Análise de Imagem";
    }
    
    removerAnexo(); 
    proj.conversas[cIdx].processando = true;
    salvarDadosAtuais(pIdx); 
    
    input.value = ''; input.style.height = 'auto';
    renderizarSidebar(); 
    if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) {
        renderizarChat();
        atualizarEstadoBotaoEnvio();
    }

    const controller = new AbortController(); statusConversas[chave] = { ativa: true, controller: controller };

    try {
        const headers = { 'Content-Type': 'application/json' };
        if (usuarioAtual) {
            headers['Authorization'] = `Bearer ${await usuarioAtual.getIdToken(true)}`;
            if (userApiKey) headers['x-google-api-key'] = userApiKey;
        }

        const payload = { 
            texto: textoFinal, 
            detalhado: prefDetalhado, 
            codigo_comentado: prefComentado,
            profissao: perfilGlobalData.profissao, 
            tags: perfilGlobalData.tags,
            projeto_nome: proj.nome || "",
            projeto_genero: proj.genero || "",
            projeto_descricao: proj.descricao || ""
        };
        if (imgBase64) { payload.imagem_base64 = imgBase64; payload.mime_type = imgMime; }

        const res = await fetch('https://chatbot-unity.onrender.com/api/chat', { method: 'POST', headers: headers, body: JSON.stringify(payload), signal: controller.signal });
        
        if (!window.projetos[pIdx] || !window.projetos[pIdx].conversas[cIdx]) return; 

        if (res.status === 429) { 
            window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'system', texto: `${SVG_CLOCK} Limite da IA atingido. Tente novamente em instantes.` });
        } else if (!res.ok) {
            let detalheErro = "Falha no Servidor"; try { const body = await res.json(); detalheErro = body.detail || detalheErro; } catch(e){} throw new Error(detalheErro);
        } else {
            const dados = await res.json();
            window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'bot', texto: dados.resposta });
        }
    } catch (e) {
        if (window.projetos[pIdx] && window.projetos[pIdx].conversas[cIdx]) {
            window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'system', texto: `${SVG_WARN} ${e.name === 'AbortError' ? 'Cancelado pelo usuário.' : 'Erro de comunicação: ' + e.message}` });
        }
    } finally {
        if (window.projetos[pIdx] && window.projetos[pIdx].conversas[cIdx]) {
            window.projetos[pIdx].conversas[cIdx].processando = false;
            salvarDadosAtuais(pIdx);
        }
        if (statusConversas[chave]) statusConversas[chave].ativa = false;
        
        renderizarSidebar(); 
        if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) {
            renderizarChat(); 
            atualizarEstadoBotaoEnvio();
        }
    }
}
window.enviarMensagem = enviarMensagem;

// ================= OUTROS COMPONENTES DA UI =================
document.addEventListener('click', (e) => { 
    if (!e.target.closest('#config-menu') && !e.target.closest('#btn-config')) document.getElementById('config-menu').style.display = 'none'; 
    if (!e.target.closest('#profile-menu') && !e.target.closest('#btn-profile')) document.getElementById('profile-menu').style.display = 'none'; 
    if (!e.target.closest('#notifications-menu') && !e.target.closest('#btn-notificacoes')) document.getElementById('notifications-menu').style.display = 'none'; 
    if (!e.target.closest('#context-menu') && !e.target.closest('.projeto-header') && !e.target.closest('.conversa-item')) document.getElementById('context-menu').style.display = 'none'; 
});

function ajustarAltura(e) { e.style.height = 'auto'; e.style.height = (e.scrollHeight) + 'px'; } window.ajustarAltura = ajustarAltura;
function lidarComTecla(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); const btn = document.getElementById('btn-acao'); if (btn.classList.contains('enviar') && !btn.disabled) window.lidarComAcao(); } } window.lidarComTecla = lidarComTecla;
marked.setOptions({ highlight: function(code, lang) { return hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value; }, langPrefix: 'hljs language-' });
function formatarBlocosDeCodigo() { document.querySelectorAll('.bot pre').forEach(pre => { if (pre.parentElement.classList.contains('code-wrapper')) return; const codeElement = pre.querySelector('code'); let linguagem = 'Code'; let linguagemRaw = ''; if (codeElement && codeElement.className) { const match = codeElement.className.match(/language-(\w+)/); if (match) { linguagem = match[1]; linguagemRaw = match[1].toLowerCase(); } } if (codeElement && !codeElement.dataset.highlighted) hljs.highlightElement(codeElement); const wrapper = document.createElement('div'); wrapper.className = 'code-wrapper'; const header = document.createElement('div'); header.className = 'code-header'; header.innerHTML = `<span>${linguagem}</span><div class="code-header-actions"><button class="btn-copy" onclick="baixarCodigo(this.parentElement.parentElement.nextElementSibling.innerText, '${linguagemRaw}')">${SVG_DOWNLOAD} Baixar</button><button class="btn-copy" onclick="copiar(this, this.parentElement.parentElement.nextElementSibling.innerText)">${SVG_COPY} Copiar</button></div>`; pre.parentNode.insertBefore(wrapper, pre); wrapper.appendChild(header); wrapper.appendChild(pre); }); } window.formatarBlocosDeCodigo = formatarBlocosDeCodigo;
function copiar(btn, texto) { navigator.clipboard.writeText(texto).then(() => { btn.innerHTML = `${SVG_CHECK} Copiado`; btn.classList.add('copiado'); mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_CHECK); setTimeout(() => { btn.innerHTML = `${SVG_COPY} Copiar`; btn.classList.remove('copiado'); }, 2000); }); } window.copiar = copiar;
async function baixarCodigo(texto, linguagem) { const ext = { 'csharp':'cs', 'cs':'cs', 'javascript':'js', 'js':'js', 'python':'py', 'html':'html', 'css':'css', 'json':'json', 'cpp':'cpp' }[linguagem] || 'txt'; let nome = `script.${ext}`; const match = texto.match(/(?:class|interface|struct|enum)\s+([A-Za-z0-9_]+)/); if(match) nome = `${match[1]}.${ext}`; if (configAskToSave && window.showSaveFilePicker) { try { const handle = await window.showSaveFilePicker({ suggestedName: nome }); const w = await handle.createWritable(); await w.write(texto); await w.close(); mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_SAVE); return; } catch (e) { return; } } const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([texto])); a.download = nome; a.click(); mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_DOWNLOAD); } window.baixarCodigo = baixarCodigo;
function exportarConversaMD() { const proj = window.projetos[alvoMenu.indexProj]; const conv = proj.conversas[alvoMenu.indexConv]; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([gerarMarkdownDaConversa(proj.nome, conv)])); a.download = `Unity_${conv.nome.replace(/[^a-z0-9]/gi, '_')}.md`; a.click(); } window.exportarConversaMD = exportarConversaMD;
async function exportarProjetoZip() { const proj = window.projetos[alvoMenu.indexProj]; const zip = new JSZip(); proj.conversas.forEach((c, i) => zip.file(`${c.nome.replace(/[^a-z0-9]/gi, '_')}_${i}.md`, gerarMarkdownDaConversa(proj.nome, c))); const blob = await zip.generateAsync({type:"blob"}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Proj_${proj.nome.replace(/[^a-z0-9]/gi, '_')}.zip`; a.click(); } window.exportarProjetoZip = exportarProjetoZip;
function gerarMarkdownDaConversa(nomeProj, conv) { return `# Projeto: ${nomeProj}\n## Conversa: ${conv.nome}\n\n---\n\n` + conv.mensagens.map(m => (m.papel === 'aluno' ? `**🧑‍💻 Você:**\n${m.texto}\n\n` : `**🤖 Professor Unity:**\n${m.texto}\n\n`) + `---\n\n`).join(''); } window.gerarMarkdownDaConversa = gerarMarkdownDaConversa;