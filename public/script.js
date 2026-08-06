import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

const SVG_CHECK = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const SVG_SETTINGS = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
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

let isCreatingAccount = false; 

// Formatação limpa do nome do usuário a partir do e-mail ou display name
function formatarNomeUsuario(emailOrName) {
    if (!emailOrName) return 'Visitante';
    const base = emailOrName.includes('@') ? emailOrName.split('@')[0] : emailOrName;
    return base.charAt(0).toUpperCase() + base.slice(1);
}

// ================= GESTÃO DE AUTH E CONVITES =================
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

        iniciarEscutaProjetosNuvem(userEmail);
        iniciarEscutaConvites(userEmail);
    } else {
        if (unsubscribeProjetos) unsubscribeProjetos();
        if (unsubscribeConvites) unsubscribeConvites();
        usuarioAtual = null;
        
        btnProfile.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="texto-btn">Minha Conta</span>`;
        btnProfile.onclick = () => abrirModalAuth();
        
        document.getElementById('config-btn-apikey').style.display = 'none';
        btnNotif.style.display = 'none';

        carregarProjetosLocais();
        resetarVisualizacaoChat();
    }
});

// ================= SINCRONIZAÇÃO EM TEMPO REAL =================
function iniciarEscutaProjetosNuvem(email) {
    const q = query(collection(db, "projetos"), where("membros", "array-contains", email));
    unsubscribeProjetos = onSnapshot(q, (snapshot) => {
        window.projetos = [];
        snapshot.forEach((doc) => {
            window.projetos.push({ id: doc.id, ...doc.data() });
        });
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

function iniciarEscutaConvites(email) {
    const q = query(collection(db, "convites"), where("destinatario", "==", email), where("status", "==", "pendente"));
    unsubscribeConvites = onSnapshot(q, (snapshot) => {
        const listaConvites = document.getElementById('lista-convites-popup');
        const badge = document.getElementById('badge-notificacao');
        listaConvites.innerHTML = '';

        if (snapshot.empty) {
            listaConvites.innerHTML = `<div style="color: #8b949e; font-size: 0.85rem; text-align: center; padding: 10px;">Nenhum convite pendente.</div>`;
            badge.style.display = 'none';
            return;
        }

        badge.style.display = 'block';
        snapshot.forEach((docSnap) => {
            const convite = docSnap.data();
            const id = docSnap.id;
            listaConvites.innerHTML += `
                <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; margin-bottom: 6px; font-size: 0.85rem;">
                    <div style="color: #e6edf3; margin-bottom: 4px;"><b>${formatarNomeUsuario(convite.remetente)}</b> convidou você para o projeto <b>${convite.projetoNome}</b></div>
                    <div style="display: flex; gap: 6px;">
                        <button onclick="responderConvite('${id}', '${convite.projetoId}', true)" style="flex:1; background:#2ea043; color:white; border:none; padding:4px; border-radius:4px; cursor:pointer; font-weight:600;">Aceitar</button>
                        <button onclick="responderConvite('${id}', null, false)" style="flex:1; background:#da3633; color:white; border:none; padding:4px; border-radius:4px; cursor:pointer; font-weight:600;">Recusar</button>
                    </div>
                </div>
            `;
        });
    });
}

window.abrirMenuNotificacoes = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('notifications-menu');
    const btn = document.getElementById('btn-notificacoes').getBoundingClientRect();
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        document.getElementById('config-menu').style.display = 'none';
        document.getElementById('profile-menu').style.display = 'none';
        menu.style.display = 'block';
    }
}

window.responderConvite = async function(conviteId, projetoId, aceitar) {
    try {
        if (aceitar && projetoId) {
            const projRef = doc(db, "projetos", projetoId);
            await updateDoc(projRef, { membros: arrayUnion(usuarioAtual.email) });
            mostrarToast("Convite aceito! Projeto adicionado.", "rgba(46, 204, 113, 0.9)", SVG_CHECK);
        } else {
            mostrarToast("Convite recusado.", "rgba(218, 54, 51, 0.9)", SVG_WARN);
        }
        await updateDoc(doc(db, "convites", conviteId), { status: aceitar ? "aceito" : "recusado" });
        document.getElementById('notifications-menu').style.display = 'none';
    } catch(e) {
        console.error(e);
        mostrarToast("Erro ao responder convite.", "rgba(218, 54, 51, 0.9)", SVG_WARN);
    }
}

async function sincronizarProjetoNaNuvem(indexProj) {
    if (!usuarioAtual || !window.projetos[indexProj].id) return;
    const proj = window.projetos[indexProj];
    const ref = doc(db, "projetos", proj.id);
    await updateDoc(ref, { 
        nome: proj.nome, 
        aberto: proj.aberto, 
        conversas: proj.conversas,
        membros: proj.membros || [],
        presenca: proj.presenca || {} 
    });
}

function salvarDadosAtuais(indexProj = null) {
    if (usuarioAtual && indexProj !== null) {
        sincronizarProjetoNaNuvem(indexProj);
    } else if (!usuarioAtual) {
        localStorage.setItem('unity_projetos_locais', JSON.stringify(window.projetos));
    }
}

function carregarProjetosLocais() {
    const salvo = localStorage.getItem('unity_projetos_locais');
    if (salvo) { window.projetos = JSON.parse(salvo); } else { window.projetos = []; }
    renderizarSidebar();
}

// ================= MODAIS & FLUXOS DE UI =================
window.abrirProfileMenu = function(event) {
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

window.confirmarLogout = function() {
    if (confirm("Tem certeza que deseja sair da sua conta?")) {
        signOut(auth);
        document.getElementById('profile-menu').style.display = 'none';
    }
}

function tratarErroAuth(erroCode) {
    switch(erroCode) {
        case 'auth/email-already-in-use': return 'Este e-mail já está cadastrado.';
        case 'auth/invalid-email': return 'Digite um e-mail válido.';
        case 'auth/weak-password': return 'Use pelo menos 6 caracteres.';
        case 'auth/invalid-credential': return 'Credenciais incorretas.';
        default: return 'Erro ao autenticar. Tente novamente.';
    }
}

window.abrirModalAuth = () => { document.getElementById('auth-error-msg').innerText = ''; document.getElementById('modal-auth').style.display = 'flex'; }
window.fecharModalAuth = () => document.getElementById('modal-auth').style.display = 'none';

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
    try { isCreatingAccount = true; await createUserWithEmailAndPassword(auth, email, senha); } catch(e) { isCreatingAccount = false; errorMsg.style.color = "#ff7b72"; errorMsg.innerText = tratarErroAuth(e.code); }
};

document.getElementById('btn-login-google').onclick = async () => {
    try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch(e) { document.getElementById('auth-error-msg').innerText = tratarErroAuth(e.code); }
};

let userApiKey = localStorage.getItem('unity_google_api_key') || '';
document.getElementById('input-api-key').value = userApiKey;
window.abrirModalApiKey = () => { document.getElementById('config-menu').style.display = 'none'; document.getElementById('modal-apikey').style.display = 'flex'; }
window.salvarApiKey = () => { userApiKey = document.getElementById('input-api-key').value.trim(); localStorage.setItem('unity_google_api_key', userApiKey); document.getElementById('modal-apikey').style.display = 'none'; mostrarToast('Chave salva!', 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); }

let configAskToSave = localStorage.getItem('unity_config_ask_save') !== 'false';
document.getElementById('toggle-ask-save').checked = configAskToSave;
window.abrirConfigMenu = function(e) { e.stopPropagation(); const menu = document.getElementById('config-menu'); const btn = document.getElementById('btn-config').getBoundingClientRect(); if (menu.style.display === 'block') menu.style.display = 'none'; else { document.getElementById('profile-menu').style.display = 'none'; document.getElementById('notifications-menu').style.display = 'none'; menu.style.display = 'block'; menu.style.left = (btn.left + 10) + 'px'; menu.style.top = (btn.top - menu.offsetHeight - 10) + 'px'; } }
window.salvarPreferenciasConfig = function() { configAskToSave = document.getElementById('toggle-ask-save').checked; localStorage.setItem('unity_config_ask_save', configAskToSave); mostrarToast(configAskToSave ? 'Você escolherá onde salvar.' : 'Salvando na pasta padrão.', 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); }

// ================= RENDERIZAÇÃO E PRESENÇA OTIMIZADA =================
function renderizarSidebar() {
    const container = document.getElementById('lista-projetos');
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
                    if (cIdx === indexConv && (!usuarioAtual || emailUser !== usuarioAtual.email)) {
                        emailsNaConversa.push(emailUser);
                    }
                });
            }

            let avataresPresencaHTML = '';
            if (emailsNaConversa.length > 0) {
                const primeiroEmail = emailsNaConversa[0];
                const nomePrimeiro = formatarNomeUsuario(primeiroEmail);
                const primeiroAvatar = `https://ui-avatars.com/api/?name=${primeiroEmail}&background=21262d&color=c9d1d9&rounded=true`;
                avataresPresencaHTML += `<img src="${primeiroAvatar}" title="${nomePrimeiro}" style="width: 18px; height: 18px; border-radius: 50%; border: 1px solid #F58220; object-fit: cover; vertical-align: middle; margin-left: 4px;">`;
                
                if (emailsNaConversa.length > 1) {
                    const todosNomes = emailsNaConversa.map(e => formatarNomeUsuario(e)).join(', ');
                    const extrasCount = emailsNaConversa.length - 1;
                    avataresPresencaHTML += `<span title="${todosNomes}" style="font-size: 0.7rem; background: rgba(245,130,32,0.2); color: #F58220; padding: 1px 4px; border-radius: 4px; margin-left: 3px; vertical-align: middle; cursor: help;">+${extrasCount}</span>`;
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
            convDiv.oncontextmenu = (e) => window.abrirMenuContexto(e, 'conversa', indexProj, indexConv);
            containerConversas.appendChild(convDiv);
        });
    });
    atualizarEstadoBotaoEnvio();
}

window.alternarSidebar = () => { document.getElementById('sidebar').classList.toggle('recolhido'); }
window.alternarPasta = (indexProj) => { window.projetos[indexProj].aberto = !window.projetos[indexProj].aberto; salvarDadosAtuais(indexProj); renderizarSidebar(); }

window.abrirMenuContexto = function(event, tipo, indexProj, indexConv = null) {
    event.preventDefault(); alvoMenu = { tipo, indexProj, indexConv };
    const menu = document.getElementById('context-menu');
    let menuHTML = '';
    
    if (tipo === 'projeto') {
        if (usuarioAtual && window.projetos[indexProj].id) {
            menuHTML += `<div class="context-item" style="color:#F58220" onclick="abrirModalCompartilhar()">${SVG_SHARE} Add Colaborador</div><hr style="margin:5px 0; border-color:rgba(255,255,255,0.05);">`;
        }
        menuHTML += `<div class="context-item" onclick="abrirModalRenomear()">${SVG_EDIT} Renomear Projeto</div><div class="context-item" onclick="exportarProjetoZip()">${SVG_ARCHIVE} Baixar (.zip)</div><div class="context-item danger" onclick="deletarProjeto()">${SVG_TRASH} Apagar</div>`;
    } else {
        const conv = window.projetos[indexProj].conversas[indexConv];
        const podeApagar = !usuarioAtual || !conv.criador || conv.criador === usuarioAtual.email;
        
        menuHTML = `<div class="context-item" onclick="abrirModalRenomear()">${SVG_EDIT} Renomear Conversa</div><div class="context-item" onclick="exportarConversaMD()">${SVG_FILE} Baixar (.md)</div>`;
        if (podeApagar) {
            menuHTML += `<div class="context-item danger" onclick="deletarConversa()">${SVG_TRASH} Apagar</div>`;
        }
    }
    menu.innerHTML = menuHTML;
    menu.style.display = 'block'; menu.style.left = event.pageX + 'px'; menu.style.top = event.pageY + 'px';
}

// ================= GESTÃO DOS PROJETOS E CONVERSAS =================
window.abrirModal = () => { 
    document.getElementById('modal-projeto').style.display = 'flex'; 
    document.getElementById('input-nome-projeto').value = ''; 
    document.getElementById('input-genero-projeto').value = ''; 
    document.getElementById('input-desc-projeto').value = ''; 
    document.getElementById('input-nome-projeto').focus(); 
}
window.fecharModal = () => document.getElementById('modal-projeto').style.display = 'none';

window.confirmarProjeto = async function() {
    const nome = document.getElementById('input-nome-projeto').value.trim();
    const genero = document.getElementById('input-genero-projeto').value.trim();
    const descricao = document.getElementById('input-desc-projeto').value.trim();

    if (nome) { 
        window.fecharModal(); 
        if (usuarioAtual) {
            await addDoc(collection(db, "projetos"), {
                nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [], membros: [usuarioAtual.email], presenca: {}
            });
            mostrarToast('Projeto salvo na nuvem!', 'rgba(245, 130, 32, 0.9)', SVG_FOLDER); 
        } else {
            window.projetos.push({ nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [] }); 
            salvarDadosAtuais(); 
            renderizarSidebar(); 
            mostrarToast('Projeto criado!', 'rgba(245, 130, 32, 0.9)', SVG_FOLDER); 
        }
    }
}

window.novaConversa = function(indexProj, event) {
    event.stopPropagation();
    const generoStr = window.projetos[indexProj].genero ? ` de ${window.projetos[indexProj].genero}` : "";
    const emailCriador = usuarioAtual ? usuarioAtual.email : 'visitante';
    
    window.projetos[indexProj].conversas.push({ 
        nome: `Nova Conversa ${window.projetos[indexProj].conversas.length + 1}`, 
        criador: emailCriador,
        processando: false,
        mensagens: [{ papel: 'bot', texto: `Olá! Sou seu professor especialista em Unity. Como posso te ajudar neste projeto${generoStr}?` }] 
    });
    window.projetos[indexProj].aberto = true; 
    salvarDadosAtuais(indexProj); 
    renderizarSidebar(); 
    selecionarConversa(indexProj, window.projetos[indexProj].conversas.length - 1);
}

// ==== COLABORAÇÃO, CONVITES E GESTÃO DE USUÁRIOS ====
window.abrirModalCompartilhar = () => {
    document.getElementById('context-menu').style.display = 'none';
    document.getElementById('input-email-convite').value = '';
    
    const container = document.getElementById('lista-colaboradores-atual');
    container.innerHTML = '';
    
    if (alvoMenu.indexProj !== null) {
        const proj = window.projetos[alvoMenu.indexProj];
        const membros = proj.membros || [];
        
        membros.forEach(email => {
            const row = document.createElement('div');
            row.className = 'colaborador-row';
            
            const nomeFormatado = formatarNomeUsuario(email);
            const badgeDono = (email === membros[0]) ? ' <span style="font-size:0.75rem; background:rgba(245,130,32,0.2); color:#F58220; padding:1px 6px; border-radius:4px; margin-left:6px;">Dono</span>' : '';
            
            row.innerHTML = `<span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width: 260px;" title="${email}">${nomeFormatado}${badgeDono}</span>`;
            
            if (email !== membros[0]) {
                const btnRemover = document.createElement('button');
                btnRemover.className = 'btn-remover-collab';
                btnRemover.innerText = 'Remover';
                btnRemover.onclick = () => removerColaborador(email);
                row.appendChild(btnRemover);
            }
            
            container.appendChild(row);
        });
    }
    
    document.getElementById('modal-compartilhar').style.display = 'flex';
}

window.confirmarCompartilhamento = async () => {
    const email = document.getElementById('input-email-convite').value.trim();
    if (email && usuarioAtual && alvoMenu.indexProj !== null) {
        const proj = window.projetos[alvoMenu.indexProj];
        await addDoc(collection(db, "convites"), {
            projetoId: proj.id,
            projetoNome: proj.nome,
            remetente: usuarioAtual.email,
            destinatario: email,
            status: "pendente"
        });
        document.getElementById('input-email-convite').value = '';
        abrirModalCompartilhar(); 
        mostrarToast('Convite enviado com sucesso!', 'rgba(46, 204, 113, 0.9)', SVG_SHARE);
    }
}

window.removerColaborador = async (email) => {
    if (confirm(`Deseja remover ${formatarNomeUsuario(email)} deste projeto?`)) {
        if (alvoMenu.indexProj !== null) {
            const proj = window.projetos[alvoMenu.indexProj];
            if (proj && proj.id) {
                const ref = doc(db, "projetos", proj.id);
                await updateDoc(ref, { membros: arrayRemove(email) });
                proj.membros = proj.membros.filter(m => m !== email);
                abrirModalCompartilhar();
                mostrarToast("Colaborador removido.", "rgba(245, 130, 32, 0.9)", SVG_CHECK);
            }
        }
    }
}

window.abrirModalRenomear = () => { document.getElementById('context-menu').style.display='none'; const modal = document.getElementById('modal-renomear'); const input = document.getElementById('input-nome-renomear'); const titulo = document.getElementById('titulo-modal-renomear'); if (alvoMenu.tipo === 'projeto') { titulo.innerText = 'Renomear Projeto'; input.value = window.projetos[alvoMenu.indexProj].nome; } else { titulo.innerText = 'Renomear Conversa'; input.value = window.projetos[alvoMenu.indexProj].conversas[alvoMenu.indexConv].nome; } modal.style.display = 'flex'; input.focus(); }
window.fecharModalRenomear = () => document.getElementById('modal-renomear').style.display = 'none';
window.confirmarRenomear = function() {
    const novo = document.getElementById('input-nome-renomear').value.trim(); if (!novo) return;
    if (alvoMenu.tipo === 'projeto') window.projetos[alvoMenu.indexProj].nome = novo;
    else window.projetos[alvoMenu.indexProj].conversas[alvoMenu.indexConv].nome = novo;
    salvarDadosAtuais(alvoMenu.indexProj); renderizarSidebar(); 
    if (idProjetoAtivo !== null) {
        const proj = window.projetos[idProjetoAtivo];
        const conv = proj.conversas[idConversaAtiva];
        document.getElementById('header-title').innerText = `${proj.nome} / ${conv.nome}`;
    }
    window.fecharModalRenomear();
}

window.deletarConversa = function() {
    if (confirm('Apagar esta conversa?')) {
        const pIdx = alvoMenu.indexProj; const cIdx = alvoMenu.indexConv;
        window.projetos[pIdx].conversas.splice(cIdx, 1);
        if (idProjetoAtivo === pIdx) { if (idConversaAtiva === cIdx) { idProjetoAtivo=null; idConversaAtiva=null; } else if (idConversaAtiva > cIdx) idConversaAtiva--; }
        salvarDadosAtuais(pIdx); renderizarSidebar(); idProjetoAtivo===null ? resetarVisualizacaoChat() : renderizarChat();
    }
}

window.deletarProjeto = async function() {
    if (confirm('Apagar a pasta e todas as conversas permanentemente?')) {
        const pIdx = alvoMenu.indexProj;
        if (usuarioAtual && window.projetos[pIdx].id) {
            await deleteDoc(doc(db, "projetos", window.projetos[pIdx].id));
        } else {
            window.projetos.splice(pIdx, 1);
            salvarDadosAtuais();
        }
        if (idProjetoAtivo === pIdx) { idProjetoAtivo=null; idConversaAtiva=null; } else if (idProjetoAtivo > pIdx) idProjetoAtivo--;
        renderizarSidebar(); idProjetoAtivo===null ? resetarVisualizacaoChat() : renderizarChat();
    }
}

// ================= LÓGICA DO CHAT E PRESENÇA =================
function getChaveConversa(pIdx, cIdx) { return `${pIdx}_${cIdx}`; }

function resetarVisualizacaoChat() { 
    idProjetoAtivo = null; 
    idConversaAtiva = null; 
    document.getElementById('input-container').classList.remove('ativo'); 
    document.getElementById('header-title').innerText = 'ComboBoy Researcher'; 
    document.getElementById('header-subtitle').innerText = ''; 
    document.getElementById('chat').innerHTML = '<div id="sem-conversa-msg">Selecione uma conversa ao lado ou crie um novo projeto para começar.</div>'; 
}

async function selecionarConversa(indexProj, indexConv) {
    idProjetoAtivo = indexProj; idConversaAtiva = indexConv;
    
    if (usuarioAtual && window.projetos[indexProj].id) {
        const proj = window.projetos[indexProj];
        proj.presenca = proj.presenca || {};
        proj.presenca[usuarioAtual.email] = indexConv;
        renderizarSidebar(); 
        updateDoc(doc(db, "projetos", proj.id), { presenca: proj.presenca });
    }

    document.querySelectorAll('.conversa-item').forEach(el => el.classList.remove('ativa'));
    const itemAtivo = document.getElementById(`conv-${indexProj}-${indexConv}`);
    if (itemAtivo) itemAtivo.classList.add('ativa');
    document.getElementById('input-container').classList.add('ativo');
    
    const proj = window.projetos[indexProj];
    const conv = proj.conversas[indexConv];
    
    document.getElementById('header-title').innerText = `${proj.nome} / ${conv.nome}`;
    
    const autorEmail = conv.criador ? conv.criador : (usuarioAtual ? usuarioAtual.email : 'Visitante');
    document.getElementById('header-subtitle').innerText = `Criado por: ${formatarNomeUsuario(autorEmail)}`;

    renderizarChat(); atualizarEstadoBotaoEnvio(); validarInput();
}

function renderizarChat() {
    if (idProjetoAtivo === null || !window.projetos[idProjetoAtivo] || !window.projetos[idProjetoAtivo].conversas[idConversaAtiva]) return;
    const chatBox = document.getElementById('chat'); chatBox.innerHTML = ''; 
    const conversa = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    conversa.mensagens.forEach(msg => {
        if (msg.papel === 'system') chatBox.innerHTML += `<div class="system-msg">${msg.texto}</div>`;
        else chatBox.innerHTML += `<div class="balao ${msg.papel}">${msg.papel === 'aluno' ? msg.texto.replace(/\n/g, '<br>') : marked.parse(msg.texto)}</div>`;
    });
    
    // Verifica se a conversa atual está pensando na nuvem
    const estaProcessando = conversa.processando === true;
    if (estaProcessando) {
        chatBox.innerHTML += `<div class="balao bot"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
    }

    formatarBlocosDeCodigo(); chatBox.scrollTop = chatBox.scrollHeight;
}

window.validarInput = function() {
    const input = document.getElementById('mensagem'); const btn = document.getElementById('btn-acao');
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const conv = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    const estaProcessando = conv?.processando === true;
    if (!estaProcessando) {
        btn.disabled = input.value.trim().length === 0;
    } else {
        btn.disabled = true;
    }
}

function atualizarEstadoBotaoEnvio() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const btn = document.getElementById('btn-acao'); const iconSend = document.getElementById('icon-send'); const iconStop = document.getElementById('icon-stop');
    const conv = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    const estaProcessando = conv?.processando === true;

    if (estaProcessando) {
        btn.classList.remove('enviar');
        btn.classList.add('stop');
        btn.disabled = true;
        iconSend.style.display = 'none';
        iconStop.style.display = 'block';
        btn.title = "Aguardando resposta da IA...";
    } else {
        btn.classList.remove('stop');
        btn.classList.add('enviar');
        iconStop.style.display = 'none';
        iconSend.style.display = 'block';
        btn.title = "Enviar";
        window.validarInput();
    }
}

window.lidarComAcao = function() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const conv = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    if (!conv?.processando) {
        enviarMensagem();
    }
}

async function enviarMensagem() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const pIdx = idProjetoAtivo; const cIdx = idConversaAtiva;
    const proj = window.projetos[pIdx];
    const conversaAtual = proj.conversas[cIdx];
    
    if (conversaAtual.processando) return;

    const input = document.getElementById('mensagem'); 
    const texto = input.value.trim(); 
    if(!texto) return;

    conversaAtual.mensagens.push({ papel: 'aluno', texto: texto });
    if (conversaAtual.mensagens.length === 2) conversaAtual.nome = texto.substring(0, 25) + (texto.length > 25 ? "..." : "");
    
    // ATIVA O ESTADO DE PENSANDO COMPARTILHADO NA NUVEM PARA ESSA CONVERSA
    conversaAtual.processando = true;
    salvarDadosAtuais(pIdx); 
    
    input.value = ''; input.style.height = 'auto';
    renderizarSidebar(); 
    if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) {
        renderizarChat();
        atualizarEstadoBotaoEnvio();
    }

    try {
        const headers = { 'Content-Type': 'application/json' };
        if (usuarioAtual) {
            headers['Authorization'] = `Bearer ${await usuarioAtual.getIdToken(true)}`;
            if (userApiKey) headers['x-google-api-key'] = userApiKey;
        }

        const res = await fetch('https://chatbot-unity.onrender.com/api/chat', { method: 'POST', headers: headers, body: JSON.stringify({ texto: texto }) });
        
        if (res.status === 429) { 
            conversaAtual.mensagens.push({ papel: 'system', texto: `${SVG_CLOCK} Limite da IA atingido. Tente novamente em instantes.` });
        } else if (!res.ok) {
            let detalheErro = "Falha no Servidor"; try { const body = await res.json(); detalheErro = body.detail || detalheErro; } catch(e){} throw new Error(detalheErro);
        } else {
            const dados = await res.json();
            conversaAtual.mensagens.push({ papel: 'bot', texto: dados.resposta });
        }
    } catch (e) {
        conversaAtual.mensagens.push({ papel: 'system', texto: `${SVG_WARN} Erro de comunicação: ${e.message}` });
    } finally {
        // DESATIVA O ESTADO DE PENSANDO COMPARTILHADO
        conversaAtual.processando = false;
        salvarDadosAtuais(pIdx);
        renderizarSidebar(); 
        if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) {
            renderizarChat(); 
            atualizarEstadoBotaoEnvio();
        }
    }
}

// Fechar popups e menus ao clicar fora
document.addEventListener('click', (e) => { 
    if (!e.target.closest('#config-menu') && !e.target.closest('#btn-config')) document.getElementById('config-menu').style.display = 'none'; 
    if (!e.target.closest('#profile-menu') && !e.target.closest('#btn-profile')) document.getElementById('profile-menu').style.display = 'none'; 
    if (!e.target.closest('#notifications-menu') && !e.target.closest('#btn-notificacoes')) document.getElementById('notifications-menu').style.display = 'none'; 
    if (!e.target.closest('#context-menu') && !e.target.closest('.projeto-header') && !e.target.closest('.conversa-item')) document.getElementById('context-menu').style.display = 'none'; 
});

window.ajustarAltura = (e) => { e.style.height = 'auto'; e.style.height = (e.scrollHeight) + 'px'; }
window.lidarComTecla = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); const btn = document.getElementById('btn-acao'); if (btn.classList.contains('enviar') && !btn.disabled) window.lidarComAcao(); } }

marked.setOptions({ highlight: function(code, lang) { return hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value; }, langPrefix: 'hljs language-' });
function formatarBlocosDeCodigo() {
    document.querySelectorAll('.bot pre').forEach(pre => {
        if (pre.parentElement.classList.contains('code-wrapper')) return;
        const codeElement = pre.querySelector('code'); let linguagem = 'Code'; let linguagemRaw = '';
        if (codeElement && codeElement.className) { const match = codeElement.className.match(/language-(\w+)/); if (match) { linguagem = match[1]; linguagemRaw = match[1].toLowerCase(); } }
        if (codeElement && !codeElement.dataset.highlighted) hljs.highlightElement(codeElement);
        const wrapper = document.createElement('div'); wrapper.className = 'code-wrapper';
        const header = document.createElement('div'); header.className = 'code-header'; header.innerHTML = `<span>${linguagem}</span><div class="code-header-actions"><button class="btn-copy" onclick="baixarCodigo(this.parentElement.parentElement.nextElementSibling.innerText, '${linguagemRaw}')">${SVG_DOWNLOAD} Baixar</button><button class="btn-copy" onclick="copiar(this, this.parentElement.parentElement.nextElementSibling.innerText)">${SVG_COPY} Copiar</button></div>`;
        pre.parentNode.insertBefore(wrapper, pre); wrapper.appendChild(header); wrapper.appendChild(pre);
    });
}
window.copiar = (btn, texto) => { navigator.clipboard.writeText(texto).then(() => { btn.innerHTML = `${SVG_CHECK} Copiado`; btn.classList.add('copiado'); mostrarToast('Código copiado!', 'rgba(245, 130, 32, 0.9)', SVG_CHECK); setTimeout(() => { btn.innerHTML = `${SVG_COPY} Copiar`; btn.classList.remove('copiado'); }, 2000); }); }
window.baixarCodigo = async (texto, linguagem) => {
    const ext = { 'csharp':'cs', 'cs':'cs', 'javascript':'js', 'js':'js', 'python':'py', 'html':'html', 'css':'css', 'json':'json', 'cpp':'cpp' }[linguagem] || 'txt';
    let nome = `script.${ext}`; const match = texto.match(/(?:class|interface|struct|enum)\s+([A-Za-z0-9_]+)/); if(match) nome = `${match[1]}.${ext}`;
    if (configAskToSave && window.showSaveFilePicker) { try { const handle = await window.showSaveFilePicker({ suggestedName: nome }); const w = await handle.createWritable(); await w.write(texto); await w.close(); mostrarToast(`Salvo!`, 'rgba(245, 130, 32, 0.9)', SVG_SAVE); return; } catch (e) { return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([texto])); a.download = nome; a.click(); mostrarToast(`Download!`, 'rgba(245, 130, 32, 0.9)', SVG_DOWNLOAD);
}
window.exportarConversaMD = () => { const proj = window.projetos[alvoMenu.indexProj]; const conv = proj.conversas[alvoMenu.indexConv]; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([gerarMarkdownDaConversa(proj.nome, conv)])); a.download = `Unity_${conv.nome.replace(/[^a-z0-9]/gi, '_')}.md`; a.click(); }
window.exportarProjetoZip = async () => { const proj = window.projetos[alvoMenu.indexProj]; const zip = new JSZip(); proj.conversas.forEach((c, i) => zip.file(`${c.nome.replace(/[^a-z0-9]/gi, '_')}_${i}.md`, gerarMarkdownDaConversa(proj.nome, c))); const blob = await zip.generateAsync({type:"blob"}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Proj_${proj.nome.replace(/[^a-z0-9]/gi, '_')}.zip`; a.click(); }
function gerarMarkdownDaConversa(nomeProj, conv) { return `# Projeto: ${nomeProj}\n## Conversa: ${conv.nome}\n\n---\n\n` + conv.mensagens.map(m => (m.papel === 'aluno' ? `**🧑‍💻 Você:**\n${m.texto}\n\n` : `**🤖 Professor Unity:**\n${m.texto}\n\n`) + `---\n\n`).join(''); }