import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, arrayUnion, arrayRemove, deleteField, FieldPath } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { 
    SVG_CHECK, SVG_SETTINGS, SVG_DOWNLOAD, SVG_FOLDER, SVG_SAVE, SVG_EDIT, SVG_ARCHIVE, SVG_FILE, SVG_TRASH, SVG_WARN, SVG_CLOCK, SVG_SPINNER, SVG_COPY, SVG_SHARE,
    getMeme, formatarNomeUsuario, formatarDataHora, mostrarToast, aplicarTamanhosFonte, atualizarIndicadorApiKey, redimensionarEComprimirImagem, formatarBlocosDeCodigo
} from './utils.js';

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
window.alvoMenu = { tipo: null, indexProj: null, indexConv: null };

let idConversaAtiva = null; 
let idProjetoAtivo = null;
let statusConversas = {};
let unsubscribeProjetos = null;
let unsubscribeConvites = null;
let unsubscribeNotificacoes = null;
let unsubscribeUsuarios = null;
let loadingMemeInterval = null; 

let prefDetalhado = localStorage.getItem('unity_pref_detalhado') !== 'false';
let prefComentado = localStorage.getItem('unity_pref_comentado') === 'true';
let prefChatFs = parseFloat(localStorage.getItem('unity_pref_chat_fs')) || 0.95;
let prefCodeFs = parseFloat(localStorage.getItem('unity_pref_code_fs')) || 1.05;
aplicarTamanhosFonte(prefChatFs, prefCodeFs);

let perfilGlobalData = { profissao: "", tags: [] };
let tagsSelecionadas = [];

let anexoImagemBase64 = null;
let anexoImagemMimeType = null;
let anexoTextoConteudo = null;
let anexoTextoNome = null;
let userApiKey = '';

async function removerPresencaLocal() {
    if (usuarioAtual && idProjetoAtivo !== null && window.projetos[idProjetoAtivo] && window.projetos[idProjetoAtivo].id) {
        const ref = doc(db, "projetos", window.projetos[idProjetoAtivo].id);
        const proj = window.projetos[idProjetoAtivo];
        if(proj.presenca) {
            delete proj.presenca[usuarioAtual.email];
            try {
                await updateDoc(ref, new FieldPath('presenca', usuarioAtual.email), deleteField());
            } catch(e) { console.log(e); }
        }
    }
}

function adicionarPresencaLocal() {
    if (usuarioAtual && idProjetoAtivo !== null && idConversaAtiva !== null && window.projetos[idProjetoAtivo] && window.projetos[idProjetoAtivo].id) {
        const ref = doc(db, "projetos", window.projetos[idProjetoAtivo].id);
        const proj = window.projetos[idProjetoAtivo];
        proj.presenca = proj.presenca || {};
        proj.presenca[usuarioAtual.email] = idConversaAtiva;
        updateDoc(ref, new FieldPath('presenca', usuarioAtual.email), idConversaAtiva).catch(e=>console.log(e));
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') removerPresencaLocal();
    else adicionarPresencaLocal();
});
window.addEventListener('beforeunload', removerPresencaLocal);

function iniciarEscutaUsuarios() {
    unsubscribeUsuarios = onSnapshot(collection(db, "usuarios"), (snapshot) => {
        snapshot.forEach(doc => {
            const data = doc.data();
            if(data.email && data.nome) window.mapUsuarios[data.email] = data.nome;
        });
        if (window.atualizarBotaoPerfilGlobal) window.atualizarBotaoPerfilGlobal();
        if (window.renderizarSidebar) window.renderizarSidebar();
        if (idProjetoAtivo !== null && idConversaAtiva !== null) window.renderizarChat();
    });
}

window.atualizarBotaoPerfilGlobal = function() {
    if(!usuarioAtual) return;
    const userEmail = usuarioAtual.email;
    const nomeAtual = window.mapUsuarios[userEmail] || usuarioAtual.displayName || window.formatarNomeUsuario(userEmail);
    const photoUrl = usuarioAtual.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeAtual)}&background=21262d&color=c9d1d9&rounded=true`;
    
    const btnProfile = document.getElementById('btn-profile');
    if(btnProfile) {
        btnProfile.innerHTML = `<img src="${photoUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;"> <span class="texto-btn" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${nomeAtual}</span>`;
    }
}

onAuthStateChanged(auth, async (user) => {
    if(window.fecharModalAuth) window.fecharModalAuth();
    const btnProfile = document.getElementById('btn-profile');
    const btnNotif = document.getElementById('btn-notificacoes');

    if (user) {
        usuarioAtual = user;
        btnProfile.onclick = window.abrirProfileMenu;
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
                    userApiKey = data.googleApiKey; localStorage.setItem('unity_google_api_key', userApiKey); document.getElementById('input-api-key').value = userApiKey;
                } else {
                    userApiKey = localStorage.getItem('unity_google_api_key') || ''; document.getElementById('input-api-key').value = userApiKey;
                }
            } else {
                userApiKey = localStorage.getItem('unity_google_api_key') || ''; document.getElementById('input-api-key').value = userApiKey;
            }
        } catch(e) {}
        
        iniciarEscutaUsuarios(); 
        window.atualizarBotaoPerfilGlobal();
        atualizarIndicadorApiKey(userApiKey);
        iniciarEscutaProjetosNuvem(user.email);
        iniciarEscutaConvites(user.email);
        iniciarEscutaNotificacoes(user.email);
        
        if (localStorage.getItem('comboboy_tour') !== 'true') {
            window.iniciarTour();
        }

    } else {
        if (unsubscribeProjetos) unsubscribeProjetos();
        if (unsubscribeConvites) unsubscribeConvites();
        if (unsubscribeNotificacoes) unsubscribeNotificacoes();
        if (unsubscribeUsuarios) unsubscribeUsuarios();
        
        usuarioAtual = null;
        window.mapUsuarios = {};
        perfilGlobalData = { profissao: "", tags: [] };
        
        btnProfile.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="texto-btn">Minha Conta</span>`;
        btnProfile.onclick = window.abrirModalAuth;
        
        document.getElementById('config-btn-apikey').style.display = 'none';
        btnNotif.style.display = 'none';

        userApiKey = localStorage.getItem('unity_google_api_key') || ''; document.getElementById('input-api-key').value = userApiKey;
        atualizarIndicadorApiKey(userApiKey);
        
        carregarProjetosLocais();
        window.resetarVisualizacaoChat();
    }
});

window.abrirModalAuth = () => { document.getElementById('auth-error-msg').innerText = ''; document.getElementById('modal-auth').style.display = 'flex'; }
window.fecharModalAuth = () => { const m = document.getElementById('modal-auth'); if(m) m.style.display = 'none'; }
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

window.confirmarLogout = async function() {
    if (confirm("Tem certeza que deseja sair da sua conta?")) {
        await removerPresencaLocal(); 
        window.resetarVisualizacaoChat();
        window.projetos = [];
        window.renderizarSidebar();
        await signOut(auth);
        document.getElementById('profile-menu').style.display = 'none';
    }
}

const TAGS_DISPONIVEIS = [
    "Programador C#", "Mecânicas", "Bot AI", "Level Design", "Animation 2D", "Animation 3D", 
    "Banco de dados", "Tech Artist", "UI/UX", "VFX", "Multiplayer/Netcode", "Mobile", 
    "VR/AR", "Game Design", "Sound Design", "Monetização", "Shader Graph", "Cinematics"
];

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

window.abrirModalPerfil = async function() {
    document.getElementById('profile-menu').style.display = 'none';
    if(!usuarioAtual) return;
    document.getElementById('input-perfil-nome').value = window.mapUsuarios[usuarioAtual.email] || usuarioAtual.displayName || window.formatarNomeUsuario(usuarioAtual.email);
    document.getElementById('input-perfil-profissao').value = perfilGlobalData.profissao;
    tagsSelecionadas = [...perfilGlobalData.tags];
    renderizarTags();
    document.getElementById('modal-perfil').style.display = 'flex';
}
window.fecharModalPerfil = function() { document.getElementById('modal-perfil').style.display = 'none'; }

window.salvarPerfil = async function() {
    if(!usuarioAtual) return;
    const nome = document.getElementById('input-perfil-nome').value.trim();
    const profissao = document.getElementById('input-perfil-profissao').value.trim();
    
    try {
        if(nome && nome !== usuarioAtual.displayName) {
            await updateProfile(usuarioAtual, { displayName: nome });
        }
        await setDoc(doc(db, "usuarios", usuarioAtual.uid), {
            nome: nome, profissao: profissao, tags: tagsSelecionadas, email: usuarioAtual.email
        }, { merge: true });

        perfilGlobalData.profissao = profissao;
        perfilGlobalData.tags = [...tagsSelecionadas];

        window.fecharModalPerfil();
        mostrarToast(getMeme('sucesso'), "rgba(46, 204, 113, 0.9)", SVG_CHECK);
    } catch(e) {
        mostrarToast(getMeme('erro'), "rgba(218, 54, 51, 0.9)", SVG_WARN);
    }
}

window.abrirModalApoio = function() { document.getElementById('modal-apoio').style.display = 'flex'; }
window.fecharModalApoio = function() { document.getElementById('modal-apoio').style.display = 'none'; }

// ==========================================================
// 4. LÓGICA DE ANEXOS E DRAG AND DROP
// ==========================================================
window.lidarComAnexo = function(eventOrFile) {
    const file = eventOrFile.target ? eventOrFile.target.files[0] : eventOrFile;
    if (!file) return;
    document.getElementById('btn-anexo').style.opacity = '0.5';
    
    if (file.type.startsWith('image/')) {
        anexoTextoConteudo = null; 
        redimensionarEComprimirImagem(file, 1024, function(base64Data, mimeType) {
            anexoImagemBase64 = base64Data; anexoImagemMimeType = mimeType;
            document.getElementById('file-preview').style.display = 'none';
            document.getElementById('image-preview').src = anexoImagemBase64;
            document.getElementById('image-preview').style.display = 'block';
            mostrarPreviewContainer();
        });
    } else {
        anexoImagemBase64 = null; 
        const reader = new FileReader();
        reader.onload = function(e) {
            anexoTextoConteudo = e.target.result; anexoTextoNome = file.name;
            document.getElementById('image-preview').style.display = 'none';
            document.getElementById('file-name').innerText = anexoTextoNome;
            document.getElementById('file-preview').style.display = 'flex';
            mostrarPreviewContainer();
        };
        reader.readAsText(file);
    }
}

function mostrarPreviewContainer() {
    document.getElementById('anexo-preview-container').style.display = 'flex';
    document.getElementById('main-input-wrapper').style.borderRadius = '0 0 16px 16px';
    document.getElementById('btn-anexo').style.opacity = '1'; window.validarInput();
}

window.removerAnexo = function() {
    anexoImagemBase64 = null; anexoImagemMimeType = null; anexoTextoConteudo = null; anexoTextoNome = null;
    document.getElementById('input-anexo').value = '';
    document.getElementById('anexo-preview-container').style.display = 'none';
    document.getElementById('main-input-wrapper').style.borderRadius = '16px'; window.validarInput();
}

const dropZone = document.getElementById('main-input-wrapper');
if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (idProjetoAtivo !== null && idConversaAtiva !== null) dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('drag-over');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('drag-over');
        if (idProjetoAtivo === null || idConversaAtiva === null) { mostrarToast("Selecione uma conversa primeiro!", 'rgba(245, 130, 32, 0.9)', SVG_WARN); return; }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const validExtensions = ['.cs', '.txt', '.js', '.json'];
            const isValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
            if (file.type.startsWith('image/') || isValidExt) window.lidarComAnexo(file);
            else mostrarToast(getMeme('aviso'), 'rgba(245, 130, 32, 0.9)', SVG_WARN);
        }
    });
}


// ==========================================================
// 5. FIREBASE REALTIME & NOTIFICAÇÕES
// ==========================================================
function iniciarEscutaProjetosNuvem(email) {
    const q = query(collection(db, "projetos"), where("membros", "array-contains", email));
    unsubscribeProjetos = onSnapshot(q, (snapshot) => {
        let idProjAntigo = idProjetoAtivo !== null && window.projetos[idProjetoAtivo] ? window.projetos[idProjetoAtivo].id : null;

        window.projetos = [];
        snapshot.forEach((doc) => { window.projetos.push({ id: doc.id, ...doc.data() }); });
        
        if (idProjAntigo) {
            const novoIndex = window.projetos.findIndex(p => p.id === idProjAntigo);
            if (novoIndex !== -1) {
                idProjetoAtivo = novoIndex; 
                if (!window.projetos[idProjetoAtivo].conversas[idConversaAtiva]) window.resetarVisualizacaoChat();
            } else {
                window.resetarVisualizacaoChat();
            }
        }
        window.renderizarSidebar();
        if (idProjetoAtivo !== null && window.projetos[idProjetoAtivo] && window.projetos[idProjetoAtivo].conversas[idConversaAtiva]) window.renderizarChat();
    });
}

window.salvarDadosAtuais = function(indexProj = null) {
    if (usuarioAtual && indexProj !== null && window.projetos[indexProj].id) {
        const proj = window.projetos[indexProj];
        updateDoc(doc(db, "projetos", proj.id), { 
            nome: proj.nome, aberto: proj.aberto, conversas: proj.conversas, membros: proj.membros || []
        });
    } else if (!usuarioAtual) {
        localStorage.setItem('unity_projetos_locais', JSON.stringify(window.projetos)); 
    }
}

function carregarProjetosLocais() {
    const salvo = localStorage.getItem('unity_projetos_locais');
    if (salvo) { window.projetos = JSON.parse(salvo); } else { window.projetos = []; }
    window.renderizarSidebar();
}

let cacheConvites = [];
let cacheNotifs = [];

function atualizarPainelNotificacoesUnificado() {
    const listaNotif = document.getElementById('lista-notificacoes-popup');
    listaNotif.innerHTML = '';
    const totalItens = cacheConvites.length + cacheNotifs.length;
    document.getElementById('badge-notificacao').style.display = totalItens > 0 ? 'block' : 'none';

    if (totalItens === 0) {
        listaNotif.innerHTML = `<div style="color: #8b949e; font-size: 0.85rem; text-align: center; padding: 10px;">Nenhuma notificação.</div>`; return;
    }

    cacheConvites.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).forEach((convite) => {
        listaNotif.innerHTML += `
            <div id="convite-${convite.id}" style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; margin-bottom: 6px; font-size: 0.85rem; border: 1px solid rgba(245, 130, 32, 0.2);">
                <div style="color: #e6edf3; margin-bottom: 6px;"><b>${window.formatarNomeUsuario(convite.remetente)}</b> convidou você para <b>${convite.projetoNome}</b></div>
                <div style="display: flex; gap: 6px;">
                    <button onclick="window.responderConvite('${convite.id}', '${convite.projetoId}', '${convite.remetente}', '${convite.projetoNome}', true)" style="flex:1; background:#2ea043; color:white; border:none; padding:4px; border-radius:4px; cursor:pointer; font-weight:600;">Aceitar</button>
                    <button onclick="window.responderConvite('${convite.id}', '${convite.projetoId}', '${convite.remetente}', '${convite.projetoNome}', false)" style="flex:1; background:#da3633; color:white; border:none; padding:4px; border-radius:4px; cursor:pointer; font-weight:600;">Recusar</button>
                </div>
                <div style="font-size: 0.65rem; color: #8b949e; text-align: right; margin-top: 6px;">${window.formatarDataHora(convite.timestamp)}</div>
            </div>`;
    });

    cacheNotifs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).forEach((notif) => {
        listaNotif.innerHTML += `
            <div id="notif-${notif.id}" style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; margin-bottom: 6px; font-size: 0.85rem;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
                    <span style="color: #e6edf3; flex: 1;">${notif.mensagem}</span>
                    <button onclick="window.apagarNotificacao(event, '${notif.id}')" style="background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 2px; font-weight: bold; line-height: 1;">✕</button>
                </div>
                <div style="font-size: 0.65rem; color: #8b949e; text-align: right; margin-top: 4px;">${window.formatarDataHora(notif.timestamp)}</div>
            </div>`;
    });
}

function iniciarEscutaConvites(email) {
    const q = query(collection(db, "convites"), where("destinatario", "==", email), where("status", "==", "pendente"));
    unsubscribeConvites = onSnapshot(q, (snapshot) => { cacheConvites = []; snapshot.forEach((docSnap) => { cacheConvites.push({ id: docSnap.id, ...docSnap.data() }); }); atualizarPainelNotificacoesUnificado(); });
}

function iniciarEscutaNotificacoes(email) {
    const q = query(collection(db, "notificacoes"), where("destinatario", "==", email));
    unsubscribeNotificacoes = onSnapshot(q, (snapshot) => { cacheNotifs = []; snapshot.forEach((docSnap) => { cacheNotifs.push({ id: docSnap.id, ...docSnap.data() }); }); atualizarPainelNotificacoesUnificado(); });
}

window.abrirMenuNotificacoes = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('notifications-menu');
    const btn = document.getElementById('btn-notificacoes').getBoundingClientRect();
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else {
        document.getElementById('config-menu').style.display = 'none'; 
        document.getElementById('profile-menu').style.display = 'none';
        document.getElementById('historico-menu').style.display = 'none';
        menu.style.display = 'block'; menu.style.right = '20px'; menu.style.top = (btn.bottom + 10) + 'px';
    }
}

window.responderConvite = async function(conviteId, projetoId, remetente, projetoNome, aceitar) {
    const box = document.getElementById(`convite-${conviteId}`);
    if(box) box.style.display = 'none';
    try {
        if (aceitar && projetoId) {
            await updateDoc(doc(db, "projetos", projetoId), { membros: arrayUnion(usuarioAtual.email) });
            mostrarToast(getMeme('sucesso'), "rgba(46, 204, 113, 0.9)", SVG_CHECK);
        } else {
            mostrarToast("Convite recusado.", "rgba(218, 54, 51, 0.9)", SVG_WARN);
        }
        await deleteDoc(doc(db, "convites", conviteId));
        await addDoc(collection(db, "notificacoes"), { destinatario: remetente, mensagem: `<b>${window.formatarNomeUsuario(usuarioAtual.email)}</b> ${aceitar ? "aceitou" : "recusou"} seu convite para <b>${projetoNome}</b>.`, timestamp: Date.now() });
        document.getElementById('notifications-menu').style.display = 'none';
    } catch(e) {
        if(box) box.style.display = 'block'; mostrarToast(getMeme('erro'), "rgba(218, 54, 51, 0.9)", SVG_WARN);
    }
}

window.apagarNotificacao = async function(event, notifId) {
    event.stopPropagation();
    const box = document.getElementById(`notif-${notifId}`);
    if(box) box.style.display = 'none'; 
    try { await deleteDoc(doc(db, "notificacoes", notifId)); } catch(e) { if(box) box.style.display = 'flex'; }
}

// ==========================================================
// 6. UI DA BARRA LATERAL E MODAIS
// ==========================================================
window.abrirMenuContexto = function(event, tipo, indexProj, indexConv = null) {
    event.preventDefault(); window.alvoMenu = { tipo, indexProj, indexConv };
    const menu = document.getElementById('context-menu');
    let menuHTML = '';
    
    if (tipo === 'projeto') {
        const isDonoProjeto = usuarioAtual && window.projetos[indexProj].membros && window.projetos[indexProj].membros[0] === usuarioAtual.email;
        if (usuarioAtual && window.projetos[indexProj].id) menuHTML += `<div class="context-item" style="color:#F58220" onclick="window.abrirModalCompartilhar()">${SVG_SHARE} Gerenciar Colab</div><hr style="margin:5px 0; border-color:rgba(255,255,255,0.05);">`;
        
        if (isDonoProjeto || !window.projetos[indexProj].id) {
            menuHTML += `<div class="context-item" onclick="window.abrirModalRenomear()">${SVG_EDIT} Renomear Projeto</div>`;
        }
        menuHTML += `<div class="context-item" onclick="window.exportarProjetoZip()">${SVG_ARCHIVE} Baixar (.zip)</div>`;
        
        if (isDonoProjeto || !window.projetos[indexProj].id) {
            menuHTML += `<div class="context-item danger" onclick="window.deletarProjeto()">${SVG_TRASH} Apagar Projeto</div>`;
        }
    } else {
        const conv = window.projetos[indexProj].conversas[indexConv];
        const isDonoConversa = !usuarioAtual || !conv.criador || conv.criador === usuarioAtual.email;
        menuHTML = `<div class="context-item" onclick="window.abrirModalRenomear()">${SVG_EDIT} Renomear Conversa</div><div class="context-item" onclick="window.exportarConversaMD()">${SVG_FILE} Baixar (.md)</div>`;
        if (isDonoConversa) menuHTML += `<div class="context-item danger" onclick="window.deletarConversa()">${SVG_TRASH} Apagar Conversa</div>`;
    }
    menu.innerHTML = menuHTML; menu.style.display = 'block'; menu.style.left = event.pageX + 'px'; menu.style.top = event.pageY + 'px';
}

window.renderizarSidebar = function() {
    const container = document.getElementById('lista-projetos');
    if(!container) return;
    container.innerHTML = ''; 

    window.projetos.forEach((proj, indexProj) => {
        const iconeSeta = proj.aberto ? '▼' : '▶';
        const inicialProjeto = proj.nome.charAt(0).toUpperCase();

        const projetoDiv = document.createElement('div');
        projetoDiv.className = 'projeto-item';
        projetoDiv.innerHTML = `
            <div class="projeto-header" oncontextmenu="window.abrirMenuContexto(event, 'projeto', ${indexProj})">
                <div class="projeto-avatar" title="${proj.nome}" onclick="window.alternarPasta(${indexProj})">${inicialProjeto}</div>
                <div class="projeto-titulo" onclick="window.alternarPasta(${indexProj})">
                    <span style="font-size: 0.6rem; color: #8b949e; width: 15px;">${iconeSeta}</span>
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${proj.nome}</span>
                </div>
                <button class="icon-btn" title="Nova Conversa" onclick="window.novaConversa(${indexProj}, event)">
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
                    if (typeof cIdx === 'object') return; 
                    if (proj.membros && !proj.membros.includes(emailUser)) return;
                    if (cIdx === indexConv) emailsNaConversa.push(emailUser);
                });
            }

            let avataresPresencaHTML = '';
            if (emailsNaConversa.length > 0) {
                const maxAvatars = 2;
                avataresPresencaHTML += `<div style="display:flex; align-items:center;">`;
                emailsNaConversa.slice(0, maxAvatars).forEach((email, idx) => {
                    const nome = window.formatarNomeUsuario(email);
                    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=21262d&color=c9d1d9&rounded=true`;
                    const margin = idx > 0 ? '-8px' : '0';
                    const zIndex = 10 - idx;
                    avataresPresencaHTML += `<img src="${avatar}" title="${nome}" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid #161b22; object-fit: cover; margin-left: ${margin}; z-index: ${zIndex}; position: relative;">`;
                });

                if (emailsNaConversa.length > maxAvatars) {
                    const extrasCount = emailsNaConversa.length - maxAvatars;
                    const nomesOcultos = emailsNaConversa.slice(maxAvatars).map(e => window.formatarNomeUsuario(e)).join(', ');
                    avataresPresencaHTML += `<div onclick="event.stopPropagation(); window.mostrarToast('Também na sala: ${nomesOcultos}', 'rgba(245, 130, 32, 0.9)')" style="width: 20px; height: 20px; border-radius: 50%; background: #F58220; color: white; font-size: 0.65rem; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #161b22; margin-left: -8px; position: relative; z-index: 0; cursor: pointer;" title="Mais colaboradores">+${extrasCount}</div>`;
                }
                avataresPresencaHTML += `</div>`;
            }

            const convDiv = document.createElement('div');
            convDiv.id = `conv-${indexProj}-${indexConv}`;
            convDiv.className = `conversa-item ${estaAtiva ? 'ativa' : ''} ${estaProcessando ? 'processando' : ''}`;
            convDiv.innerHTML = `
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width: calc(100% - 50px);">${conv.nome}</span>
                <span style="display:flex; align-items:center; flex-shrink:0;">${avataresPresencaHTML} <span class="status-icon">${estaProcessando ? SVG_SPINNER : ''}</span></span>
            `;
            convDiv.onclick = () => window.selecionarConversa(indexProj, indexConv);
            convDiv.oncontextmenu = (e) => window.abrirMenuContexto(e, 'conversa', indexProj, indexConv);
            containerConversas.appendChild(convDiv);
        });
    });
    window.atualizarEstadoBotaoEnvio();
}

window.alternarSidebar = function() { 
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('active');
    } else {
        sidebar.classList.toggle('recolhido');
    }
}

window.alternarPasta = function(indexProj) { window.projetos[indexProj].aberto = !window.projetos[indexProj].aberto; window.salvarDadosAtuais(indexProj); window.renderizarSidebar(); }

window.abrirProfileMenu = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('profile-menu');
    const btn = document.getElementById('btn-profile').getBoundingClientRect();
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else {
        document.getElementById('config-menu').style.display = 'none';
        document.getElementById('notifications-menu').style.display = 'none';
        document.getElementById('historico-menu').style.display = 'none';
        menu.style.display = 'block'; menu.style.left = (btn.left + 10) + 'px'; menu.style.top = 'auto'; menu.style.bottom = (window.innerHeight - btn.top + 10) + 'px';
    }
}

window.abrirModal = () => { document.getElementById('modal-projeto').style.display = 'flex'; document.getElementById('input-nome-projeto').value = ''; document.getElementById('input-nome-projeto').focus(); }
window.fecharModal = () => document.getElementById('modal-projeto').style.display = 'none';

window.abrirModalCompartilhar = () => {
    document.getElementById('context-menu').style.display = 'none'; document.getElementById('input-email-convite').value = '';
    const container = document.getElementById('lista-colaboradores-atual'); container.innerHTML = '';
    if (window.alvoMenu.indexProj !== null) {
        const proj = window.projetos[window.alvoMenu.indexProj]; const membros = proj.membros || [];
        membros.forEach(email => {
            const row = document.createElement('div'); row.className = 'colaborador-row';
            const badgeDono = (email === membros[0]) ? ' <span style="font-size:0.75rem; background:rgba(245,130,32,0.2); color:#F58220; padding:1px 6px; border-radius:4px; margin-left:6px;">Dono</span>' : '';
            row.innerHTML = `<span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width: 260px;" title="${email}">${window.formatarNomeUsuario(email)}${badgeDono}</span>`;
            if (email !== membros[0]) {
                const btnRemover = document.createElement('button'); btnRemover.className = 'btn-remover-collab'; btnRemover.innerText = 'Remover';
                btnRemover.onclick = () => window.removerColaborador(email); row.appendChild(btnRemover);
            }
            container.appendChild(row);
        });
    }
    document.getElementById('modal-compartilhar').style.display = 'flex';
}

window.abrirModalRenomear = () => { document.getElementById('context-menu').style.display='none'; const modal = document.getElementById('modal-renomear'); const input = document.getElementById('input-nome-renomear'); const titulo = document.getElementById('titulo-modal-renomear'); if (window.alvoMenu.tipo === 'projeto') { titulo.innerText = 'Renomear Projeto'; input.value = window.projetos[window.alvoMenu.indexProj].nome; } else { titulo.innerText = 'Renomear Conversa'; input.value = window.projetos[window.alvoMenu.indexProj].conversas[window.alvoMenu.indexConv].nome; } modal.style.display = 'flex'; input.focus(); }
window.fecharModalRenomear = () => document.getElementById('modal-renomear').style.display = 'none';

window.confirmarProjeto = async function() {
    const nome = document.getElementById('input-nome-projeto').value.trim(); const genero = document.getElementById('input-genero-projeto').value.trim(); const descricao = document.getElementById('input-desc-projeto').value.trim();
    if (!nome) return; window.fecharModal(); 
    if (usuarioAtual) {
        await addDoc(collection(db, "projetos"), { nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [], membros: [usuarioAtual.email], presenca: {} });
        mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_FOLDER); 
    } else { window.projetos.push({ nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [] }); window.salvarDadosAtuais(); window.renderizarSidebar(); }
}

window.novaConversa = function(indexProj, event) {
    event.stopPropagation();
    window.projetos[indexProj].conversas.push({ 
        nome: `Nova Conversa ${window.projetos[indexProj].conversas.length + 1}`, criador: usuarioAtual ? usuarioAtual.email : 'visitante', processando: false,
        mensagens: [{ papel: 'bot', texto: `Pode mandar o seu código, arquivo ou erro!` }] 
    });
    window.projetos[indexProj].aberto = true; window.salvarDadosAtuais(indexProj); window.renderizarSidebar(); window.selecionarConversa(indexProj, window.projetos[indexProj].conversas.length - 1);
}

window.confirmarCompartilhamento = async () => {
    const email = document.getElementById('input-email-convite').value.trim();
    if (email && usuarioAtual && window.alvoMenu.indexProj !== null) {
        const proj = window.projetos[window.alvoMenu.indexProj];
        await addDoc(collection(db, "convites"), { projetoId: proj.id, projetoNome: proj.nome, remetente: usuarioAtual.email, destinatario: email, status: "pendente", timestamp: Date.now() });
        document.getElementById('input-email-convite').value = ''; window.abrirModalCompartilhar(); mostrarToast('Convite enviado!', 'rgba(46, 204, 113, 0.9)', SVG_SHARE);
    }
}

window.removerColaborador = async (email) => {
    if (confirm(`Deseja remover ${window.formatarNomeUsuario(email)}?`)) {
        if (window.alvoMenu.indexProj !== null) {
            const proj = window.projetos[window.alvoMenu.indexProj];
            if (proj && proj.id) { 
                await updateDoc(doc(db, "projetos", proj.id), 
                    "membros", arrayRemove(email),
                    new FieldPath("presenca", email), deleteField()
                );
                proj.membros = proj.membros.filter(m => m !== email); if(proj.presenca) delete proj.presenca[email]; window.abrirModalCompartilhar(); 
            }
        }
    }
}

window.confirmarRenomear = function() {
    const novo = document.getElementById('input-nome-renomear').value.trim(); if (!novo) return;
    if (window.alvoMenu.tipo === 'projeto') window.projetos[window.alvoMenu.indexProj].nome = novo; else window.projetos[window.alvoMenu.indexProj].conversas[window.alvoMenu.indexConv].nome = novo;
    window.salvarDadosAtuais(window.alvoMenu.indexProj); window.renderizarSidebar(); 
    if (idProjetoAtivo !== null) document.getElementById('header-title').innerText = `${window.projetos[idProjetoAtivo].nome} / ${window.projetos[idProjetoAtivo].conversas[idConversaAtiva].nome}`;
    window.fecharModalRenomear();
}

window.deletarConversa = function() {
    document.getElementById('context-menu').style.display = 'none';
    if (confirm('Apagar esta conversa?')) {
        const pIdx = window.alvoMenu.indexProj; const cIdx = window.alvoMenu.indexConv;
        window.projetos[pIdx].conversas.splice(cIdx, 1);
        if (idProjetoAtivo === pIdx) { if (idConversaAtiva === cIdx) { idProjetoAtivo=null; idConversaAtiva=null; } else if (idConversaAtiva > cIdx) idConversaAtiva--; }
        window.salvarDadosAtuais(pIdx); window.renderizarSidebar(); idProjetoAtivo===null ? window.resetarVisualizacaoChat() : window.renderizarChat();
    }
}

window.deletarProjeto = async function() {
    document.getElementById('context-menu').style.display = 'none';
    if (confirm('Apagar permanentemente o projeto?')) {
        const pIdx = window.alvoMenu.indexProj;
        if (usuarioAtual && window.projetos[pIdx].id) await deleteDoc(doc(db, "projetos", window.projetos[pIdx].id));
        else { window.projetos.splice(pIdx, 1); window.salvarDadosAtuais(); }
        if (idProjetoAtivo === pIdx) { idProjetoAtivo=null; idConversaAtiva=null; } else if (idProjetoAtivo > pIdx) idProjetoAtivo--;
        window.renderizarSidebar(); idProjetoAtivo===null ? window.resetarVisualizacaoChat() : window.renderizarChat();
    }
}

// ACORDEÃO E CONFIGURAÇÕES ANCORADOS
window.abrirConfigMenu = function(e) { 
    e.stopPropagation(); const menu = document.getElementById('config-menu'); const btn = document.getElementById('btn-config').getBoundingClientRect(); 
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else { 
        document.getElementById('profile-menu').style.display = 'none'; 
        document.getElementById('notifications-menu').style.display = 'none'; 
        document.getElementById('historico-menu').style.display = 'none';
        menu.style.display = 'block'; 
        menu.style.left = (btn.left + 10) + 'px'; 
        menu.style.top = 'auto'; 
        menu.style.bottom = (window.innerHeight - btn.top + 10) + 'px'; 
    } 
}

window.togglePersonalizar = function() {
    const content = document.getElementById('accordion-personalizar');
    const chevron = document.getElementById('icon-chevron-personalizar');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'flex'; chevron.style.transform = 'rotate(180deg)';
        document.getElementById('label-chat-fs').innerText = prefChatFs.toFixed(2);
        document.getElementById('label-code-fs').innerText = prefCodeFs.toFixed(2);
        document.getElementById('check-pref-comentado').checked = prefComentado;
        window.mudarTamanhoResposta(prefDetalhado, true);
    } else {
        content.style.display = 'none'; chevron.style.transform = 'rotate(0deg)';
    }
}

window.ajustarFonte = function(tipo, valor) {
    if (tipo === 'chat') { prefChatFs = Math.max(0.7, Math.min(1.5, prefChatFs + valor)); document.getElementById('label-chat-fs').innerText = prefChatFs.toFixed(2); } 
    else { prefCodeFs = Math.max(0.7, Math.min(1.5, prefCodeFs + valor)); document.getElementById('label-code-fs').innerText = prefCodeFs.toFixed(2); }
    window.salvarPersonalizacao();
    aplicarTamanhosFonte(prefChatFs, prefCodeFs);
}

window.mudarTamanhoResposta = function(detalhado, start = false) {
    prefDetalhado = detalhado;
    document.getElementById('label-resp-size').innerText = prefDetalhado ? "Detalhadas" : "Curtas";
    document.getElementById('btn-resp-prev').disabled = !prefDetalhado;
    document.getElementById('btn-resp-next').disabled = prefDetalhado;
    if (!start) window.salvarPersonalizacao();
}

window.salvarPersonalizacao = function() {
    prefComentado = document.getElementById('check-pref-comentado').checked;
    localStorage.setItem('unity_pref_chat_fs', prefChatFs); localStorage.setItem('unity_pref_code_fs', prefCodeFs); localStorage.setItem('unity_pref_comentado', prefComentado); localStorage.setItem('unity_pref_detalhado', prefDetalhado);
}

window.abrirModalApiKey = () => { document.getElementById('config-menu').style.display = 'none'; document.getElementById('modal-apikey').style.display = 'flex'; }
window.salvarApiKey = async () => { 
    userApiKey = document.getElementById('input-api-key').value.trim(); 
    localStorage.setItem('unity_google_api_key', userApiKey); 
    if (usuarioAtual) { try { await setDoc(doc(db, "usuarios", usuarioAtual.uid), { googleApiKey: userApiKey }, { merge: true }); } catch(e) {} }
    document.getElementById('modal-apikey').style.display = 'none'; atualizarIndicadorApiKey(userApiKey); mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); 
}

let configAskToSave = localStorage.getItem('unity_config_ask_save') !== 'false'; document.getElementById('toggle-ask-save').checked = configAskToSave;
window.salvarPreferenciasConfig = () => { configAskToSave = document.getElementById('toggle-ask-save').checked; localStorage.setItem('unity_config_ask_save', configAskToSave); mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); }


// ==========================================================
// 7. SISTEMA DE CHAT, NOMES E ÍNDICE DE PERGUNTAS
// ==========================================================
function getChaveConversa(pIdx, cIdx) { return `${pIdx}_${cIdx}`; }

window.resetarVisualizacaoChat = function() { 
    removerPresencaLocal(); 
    idProjetoAtivo = null; idConversaAtiva = null; document.getElementById('input-container').classList.remove('ativo'); 
    document.getElementById('header-title').innerText = 'ComboBoy Researcher'; document.getElementById('header-subtitle').innerText = ''; 
    
    // TELA DE BOAS VINDAS DO COMBOBOY CORRIGIDA COM OS NOMES JUNTOS
    document.getElementById('chat').innerHTML = `
        <div id="sem-conversa-msg" style="margin: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.9; text-align: center; max-width: 500px; padding: 20px;">
            <img src="assets/icons/comboboy.svg" alt="ComboBoy" style="width: 200px; height: 200px; margin-bottom: 10px; filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.5));">
            <h2 style="font-family: 'Alumni Sans SC', sans-serif; font-size: 2.8rem; margin: 0 0 15px 0; font-weight: 700; display:flex; align-items:center; gap:8px;">
                <div><span style="color: #F58220; font-style: italic;">COMBO</span><span style="color: #FFFFFF;">BOY</span></div> 
                <span style="font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; color: #8b949e; font-style: normal; font-weight: 500; margin-top: 12px;">Online!</span>
            </h2>
            <p style="color: #c9d1d9; font-size: 1rem; line-height: 1.5; margin: 0 0 15px 0;">
                Sou um pesquisador de game engines. Por enquanto, meu conhecimento é focado inteiramente no <b>Unity</b>.
            </p>
            <div style="color: #8b949e; font-size: 0.9rem;">Selecione uma conversa ao lado ou crie um novo projeto para começar.</div>
        </div>`; 
        
    const btnIndice = document.getElementById('btn-historico'); if (btnIndice) btnIndice.style.display = 'none';
    window.renderizarSidebar();
}

window.selecionarConversa = function(indexProj, indexConv) {
    if (idProjetoAtivo !== null && idProjetoAtivo !== indexProj) { removerPresencaLocal(); }
    idProjetoAtivo = indexProj; idConversaAtiva = indexConv;
    
    if (usuarioAtual && window.projetos[indexProj].id) {
        const proj = window.projetos[indexProj]; proj.presenca = proj.presenca || {}; proj.presenca[usuarioAtual.email] = indexConv;
        window.renderizarSidebar(); 
        updateDoc(doc(db, "projetos", proj.id), new FieldPath('presenca', usuarioAtual.email), indexConv).catch(e=>console.log(e));
    }
    document.querySelectorAll('.conversa-item').forEach(el => el.classList.remove('ativa'));
    const itemAtivo = document.getElementById(`conv-${indexProj}-${indexConv}`); if (itemAtivo) itemAtivo.classList.add('ativa');
    document.getElementById('input-container').classList.add('ativo');
    const proj = window.projetos[indexProj]; const conv = proj.conversas[indexConv];
    document.getElementById('header-title').innerText = `${proj.nome} / ${conv.nome}`;
    const autorEmail = conv.criador ? conv.criador : (usuarioAtual ? usuarioAtual.email : 'Visitante');
    document.getElementById('header-subtitle').innerText = `Criado por: ${window.formatarNomeUsuario(autorEmail)}`;
    
    document.getElementById('btn-historico').style.display = 'flex';
    
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebar-backdrop').classList.remove('active');
    }

    window.renderizarChat(); window.atualizarEstadoBotaoEnvio(); window.validarInput();
}

window.abrirMenuHistorico = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('historico-menu');
    const btn = document.getElementById('btn-historico').getBoundingClientRect();
    if (menu.style.display === 'block') { menu.style.display = 'none'; }
    else {
        document.getElementById('config-menu').style.display = 'none'; document.getElementById('profile-menu').style.display = 'none'; document.getElementById('notifications-menu').style.display = 'none';
        menu.style.display = 'block'; 
        menu.style.left = (btn.left + (btn.width / 2)) + 'px'; 
        menu.style.transform = 'translateX(-50%)'; 
        menu.style.top = (btn.bottom + 8) + 'px'; 
    }
}

window.irParaMensagem = function(idx) {
    const el = document.getElementById(`msg-wrapper-${idx}`);
    if(el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const bubble = el.querySelector('.balao');
        if(bubble) {
            const oldBoxShadow = bubble.style.boxShadow;
            bubble.style.boxShadow = '0 0 0 3px #F58220';
            setTimeout(() => { bubble.style.boxShadow = oldBoxShadow; }, 1500);
        }
        document.getElementById('historico-menu').style.display = 'none';
    }
}

window.renderizarChat = function() {
    if (idProjetoAtivo === null || !window.projetos[idProjetoAtivo] || !window.projetos[idProjetoAtivo].conversas[idConversaAtiva]) return;
    const chatBox = document.getElementById('chat'); chatBox.innerHTML = ''; 
    const conversa = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    
    let indiceHTML = '';

    conversa.mensagens.forEach((msg, idx) => {
        if (msg.papel === 'system') { 
            chatBox.innerHTML += `<div id="msg-wrapper-${idx}" class="system-msg">${msg.texto}</div>`; 
        } else {
            let imgHtml = msg.imagem_url ? `<img src="${msg.imagem_url}" class="balao-imagem">` : '';
            
            if (msg.papel === 'aluno') {
                const nomeAutor = msg.autorEmail ? window.formatarNomeUsuario(msg.autorEmail) : (msg.autor || 'Colaborador');
                chatBox.innerHTML += `
                <div id="msg-wrapper-${idx}" style="align-self: flex-end; display: flex; flex-direction: column; align-items: flex-end; max-width: 100%;">
                    <span style="font-size: 0.75rem; color: #8b949e; margin-bottom: 4px; margin-right: 12px; font-weight: 500;">${nomeAutor}</span>
                    <div class="balao aluno" style="align-self: flex-end; margin: 0;">${imgHtml}${msg.texto.replace(/\n/g, '<br>')}</div>
                </div>`;
            } else {
                chatBox.innerHTML += `
                <div id="msg-wrapper-${idx}" style="align-self: flex-start; display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
                    <span style="font-size: 0.75rem; color: #F58220; font-weight: 600; margin-bottom: 4px; margin-left: 12px; letter-spacing: 0.5px;">ComboBoy</span>
                    <div class="balao bot" style="margin: 0;">${imgHtml}${marked.parse(msg.texto)}</div>
                </div>`;
            }
        }

        if(msg.papel === 'aluno') {
            const textoCurto = msg.texto.length > 40 ? msg.texto.substring(0, 40) + '...' : msg.texto;
            indiceHTML += `<div onclick="window.irParaMensagem(${idx})" style="padding: 8px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; color: #c9d1d9; background: rgba(255,255,255,0.03); border: 1px solid transparent; transition: all 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" onmouseover="this.style.borderColor='#F58220'" onmouseout="this.style.borderColor='transparent'">${textoCurto || 'Imagem Anexada'}</div>`;
        }
    });
    
    const listaIndice = document.getElementById('lista-historico-popup');
    listaIndice.innerHTML = indiceHTML || `<div style="color: #8b949e; font-size: 0.85rem; text-align: center; padding: 10px;">Nenhuma pergunta nesta conversa.</div>`;

    if (conversa.processando) {
        chatBox.innerHTML += `
        <div style="align-self: flex-start; display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
            <span style="font-size: 0.75rem; color: #F58220; font-weight: 600; margin-bottom: 4px; margin-left: 12px; letter-spacing: 0.5px;">ComboBoy</span>
            <div class="balao bot typing-container" style="margin: 0;">
                <span id="loading-meme-text" class="meme-text">${getMeme('loading')}</span>
                <div class="typing-indicator" style="height: auto; padding: 0;"><span></span><span></span><span></span></div>
            </div>
        </div>`;
        
        if(loadingMemeInterval) clearInterval(loadingMemeInterval);
        loadingMemeInterval = setInterval(() => {
            const el = document.getElementById('loading-meme-text');
            if(el) {
                el.style.opacity = 0; setTimeout(() => { el.innerText = getMeme('loading'); el.style.opacity = 1; }, 300);
            } else { clearInterval(loadingMemeInterval); }
        }, 3500);

    } else {
        if(loadingMemeInterval) clearInterval(loadingMemeInterval);
    }
    
    window.formatarBlocosDeCodigo(); chatBox.scrollTop = chatBox.scrollHeight;
}

window.validarInput = function() {
    const input = document.getElementById('mensagem'); const btn = document.getElementById('btn-acao');
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const conv = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    
    if (!conv?.processando) { btn.disabled = input.value.trim().length === 0 && !anexoImagemBase64 && !anexoTextoConteudo; } 
    else { btn.disabled = false; }
}

window.atualizarEstadoBotaoEnvio = function() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const btn = document.getElementById('btn-acao'); const iconSend = document.getElementById('icon-send'); const iconStop = document.getElementById('icon-stop');
    const conv = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];

    if (conv?.processando) {
        btn.classList.remove('enviar'); btn.classList.add('stop'); btn.disabled = false; iconSend.style.display = 'none'; iconStop.style.display = 'block'; btn.title = "Cancelar Resposta";
    } else {
        btn.classList.remove('stop'); btn.classList.add('enviar'); iconStop.style.display = 'none'; iconSend.style.display = 'block'; btn.title = "Enviar"; window.validarInput();
    }
}

window.lidarComAcao = function() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const pIdx = idProjetoAtivo; const cIdx = idConversaAtiva;
    const chave = getChaveConversa(pIdx, cIdx); const conv = window.projetos[pIdx].conversas[cIdx];

    if (conv?.processando) {
        if (statusConversas[chave] && statusConversas[chave].controller) {
            statusConversas[chave].controller.abort(); window.projetos[pIdx].conversas[cIdx].processando = false; window.salvarDadosAtuais(pIdx); window.renderizarChat(); window.atualizarEstadoBotaoEnvio();
        } else { mostrarToast(getMeme('aviso'), 'rgba(245, 130, 32, 0.9)', SVG_WARN); }
    } else { enviarMensagem(); }
}

async function enviarMensagem() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    const pIdx = idProjetoAtivo; const cIdx = idConversaAtiva;
    const proj = window.projetos[pIdx]; const chave = getChaveConversa(pIdx, cIdx);
    
    if (proj.conversas[cIdx].processando) return;

    const input = document.getElementById('mensagem'); let textoDigitado = input.value.trim(); let textoFinal = textoDigitado;
    
    if (anexoTextoConteudo) {
        const ext = anexoTextoNome.split('.').pop().toLowerCase(); const linguagemMarkdown = (ext === 'cs') ? 'csharp' : ext; const quebraLinha = textoDigitado ? '\n\n' : '';
        textoFinal += `${quebraLinha}📄 **Arquivo Anexado (${anexoTextoNome}):**\n\`\`\`${linguagemMarkdown}\n${anexoTextoConteudo}\n\`\`\``;
    }
    
    const imgBase64 = anexoImagemBase64; const imgMime = anexoImagemMimeType;
    if(!textoFinal && !imgBase64) return;

    const autorNome = usuarioAtual ? (usuarioAtual.displayName || window.formatarNomeUsuario(usuarioAtual.email)) : 'Visitante';
    const autorEmail = usuarioAtual ? usuarioAtual.email : null;
    const novaMsg = { papel: 'aluno', texto: textoFinal, autor: autorNome, autorEmail: autorEmail }; 
    if (imgBase64) novaMsg.imagem_url = imgBase64; 
    
    proj.conversas[cIdx].mensagens.push(novaMsg);
    
    if (proj.conversas[cIdx].mensagens.length === 2) {
        if (textoDigitado) proj.conversas[cIdx].nome = textoDigitado.substring(0, 25) + (textoDigitado.length > 25 ? "..." : "");
        else if (anexoTextoNome) proj.conversas[cIdx].nome = `Análise: ${anexoTextoNome}`;
        else proj.conversas[cIdx].nome = "Análise de Imagem";
    }
    
    window.removerAnexo(); proj.conversas[cIdx].processando = true; window.salvarDadosAtuais(pIdx); 
    input.value = ''; input.style.height = 'auto'; window.renderizarSidebar(); 
    if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) { window.renderizarChat(); window.atualizarEstadoBotaoEnvio(); }

    const controller = new AbortController(); statusConversas[chave] = { ativa: true, controller: controller };

    try {
        const headers = { 'Content-Type': 'application/json' };
        if (usuarioAtual) { headers['Authorization'] = `Bearer ${await usuarioAtual.getIdToken(true)}`; if (userApiKey) headers['x-google-api-key'] = userApiKey; }

        const payload = { 
            texto: textoFinal, detalhado: prefDetalhado, codigo_comentado: prefComentado, profissao: perfilGlobalData.profissao, tags: perfilGlobalData.tags,
            projeto_nome: proj.nome || "", projeto_genero: proj.genero || "", projeto_descricao: proj.descricao || ""
        };
        if (imgBase64) { payload.imagem_base64 = imgBase64; payload.mime_type = imgMime; }

        const res = await fetch('https://chatbot-unity.onrender.com/api/chat', { method: 'POST', headers: headers, body: JSON.stringify(payload), signal: controller.signal });
        if (!window.projetos[pIdx] || !window.projetos[pIdx].conversas[cIdx]) return; 

        if (res.status === 429) { window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'system', texto: `${SVG_CLOCK} Fomos nerfados! Limite atingido.` }); } 
        else if (!res.ok) { let detalheErro = "Falha no Servidor"; try { const body = await res.json(); detalheErro = body.detail || detalheErro; } catch(e){} throw new Error(detalheErro); } 
        else { const dados = await res.json(); window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'bot', texto: dados.resposta }); }
    } catch (e) {
        if (window.projetos[pIdx] && window.projetos[pIdx].conversas[cIdx]) { window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'system', texto: `${SVG_WARN} ${e.name === 'AbortError' ? 'Miss click? Ação cancelada.' : 'Erro: ' + e.message}` }); }
    } finally {
        if (window.projetos[pIdx] && window.projetos[pIdx].conversas[cIdx]) { window.projetos[pIdx].conversas[cIdx].processando = false; window.salvarDadosAtuais(pIdx); }
        if (statusConversas[chave]) statusConversas[chave].ativa = false;
        window.renderizarSidebar(); if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) { window.renderizarChat(); window.atualizarEstadoBotaoEnvio(); }
    }
}

// ==========================================================
// 8. LÓGICA DO TOUR DE ONBOARDING
// ==========================================================
const tourSteps = [
    { 
        target: null, 
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
        title: "Bem-vindo ao ComboBoy!", 
        text: "Seu assistente IA especialista em Unity. Sincronize projetos, tire dúvidas com códigos otimizados e colabore em tempo real com sua equipe!" 
    },
    { 
        target: "sidebar", 
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
        title: "Seus Projetos", 
        text: "Aqui você cria pastas de projetos e organiza conversas. Seus projetos ficam salvos na nuvem." 
    },
    { 
        target: "input-container", 
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
        title: "Área de Pesquisa", 
        text: "Faça perguntas ou arraste imagens e scripts (.cs) diretamente para cá!" 
    },
    { 
        target: "btn-config", 
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
        title: "Configurações", 
        text: "Ajuste o tamanho da fonte, nível de detalhe e insira sua API Key do Google para evitar filas." 
    },
    { 
        target: "btn-notificacoes", 
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
        title: "Notificações", 
        text: "Acompanhe convites de colaboração e interações da sua equipe por aqui." 
    }
];
let currentTourStep = 0;

window.iniciarTour = function() {
    currentTourStep = 0;
    document.getElementById('config-menu').style.display = 'none';
    if(window.innerWidth <= 768) { document.getElementById('sidebar').classList.add('open'); }
    document.getElementById('tour-overlay').style.display = 'block';
    window.renderizarStepTour();
}

window.renderizarStepTour = function() {
    const step = tourSteps[currentTourStep];
    
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    document.querySelectorAll('.tour-highlight-parent').forEach(el => el.classList.remove('tour-highlight-parent'));
    
    const card = document.getElementById('tour-card');
    card.style.display = 'block';
    
    document.getElementById('tour-title').innerHTML = `<span style="display:flex; align-items:center; justify-content:center; gap:8px; color: #F58220;">${step.icon} ${step.title}</span>`;
    document.getElementById('tour-text').innerText = step.text;
    document.getElementById('tour-btn-next').innerText = currentTourStep === tourSteps.length - 1 ? "Finalizar" : "Avançar";
    
    if (step.target) {
        const targetEl = document.getElementById(step.target);
        if(targetEl) {
            targetEl.classList.add('tour-highlight');
            if(targetEl.closest('aside')) targetEl.closest('aside').classList.add('tour-highlight-parent');
            if(targetEl.closest('header')) targetEl.closest('header').classList.add('tour-highlight-parent');
            if(targetEl.id === 'input-container') targetEl.classList.add('tour-highlight-parent');
        }
    }
}

window.avancarTour = function() {
    if (currentTourStep < tourSteps.length - 1) {
        currentTourStep++; window.renderizarStepTour();
    } else { window.fecharTour(); }
}

window.fecharTour = function() {
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    document.querySelectorAll('.tour-highlight-parent').forEach(el => el.classList.remove('tour-highlight-parent'));
    document.getElementById('tour-overlay').style.display = 'none';
    document.getElementById('tour-card').style.display = 'none';
    localStorage.setItem('comboboy_tour', 'true');
    if(window.innerWidth <= 768) { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebar-backdrop').classList.remove('active');}
}

document.addEventListener('click', (e) => { 
    if (!e.target.closest('#config-menu') && !e.target.closest('#btn-config')) document.getElementById('config-menu').style.display = 'none'; 
    if (!e.target.closest('#profile-menu') && !e.target.closest('#btn-profile')) document.getElementById('profile-menu').style.display = 'none'; 
    if (!e.target.closest('#notifications-menu') && !e.target.closest('#btn-notificacoes')) document.getElementById('notifications-menu').style.display = 'none'; 
    if (!e.target.closest('#historico-menu') && !e.target.closest('#btn-historico')) document.getElementById('historico-menu').style.display = 'none'; 
    if (!e.target.closest('#context-menu') && !e.target.closest('.projeto-header') && !e.target.closest('.conversa-item')) document.getElementById('context-menu').style.display = 'none'; 
});

window.ajustarAltura = (e) => { e.style.height = 'auto'; e.style.height = (e.scrollHeight) + 'px'; }
window.lidarComTecla = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); const btn = document.getElementById('btn-acao'); if (btn.classList.contains('enviar') && !btn.disabled) window.lidarComAcao(); } }