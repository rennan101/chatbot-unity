import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, arrayUnion, deleteField, FieldPath } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { SVG_CHECK, SVG_WARN, mostrarToast } from './utils.js';

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
export const auth = getAuth(app);
export const db = getFirestore(app);

window.perfilGlobalData = { profissao: "", tags: [] };
window.tagsSelecionadas = [];

// ==========================================================
// 1. PRESENÇA EM TEMPO REAL BLINDADA E LIMPEZA GLOBAL
// ==========================================================
window.limparMinhaPresencaGlobal = async function() {
    if (!window.usuarioAtual) return;
    let promessas = [];
    
    window.projetos.forEach((proj) => {
        // 1. Deletar Presença Física da Sala (Usando FieldPath para driblar o problema de pontos no e-mail)
        if (proj.presenca && proj.presenca[window.usuarioAtual.email] !== undefined) {
            const ref = doc(db, "projetos", proj.id);
            promessas.push(updateDoc(ref, new FieldPath('presenca', window.usuarioAtual.email), deleteField()));
        }
        
        // 2. Limpar Áudio e Tela de Todas as Conversas
        if (proj.conversas) {
            let convUpdated = false;
            proj.conversas.forEach((c) => {
                if (c.tela === window.usuarioAtual.email) { c.tela = null; convUpdated = true; }
                if (c.chamada && c.chamada[window.usuarioAtual.email]) { delete c.chamada[window.usuarioAtual.email]; convUpdated = true; }
            });
            if (convUpdated) { 
                const ref = doc(db, "projetos", proj.id);
                promessas.push(updateDoc(ref, { conversas: proj.conversas })); 
            }
        }
    });
    
    if (window.sairDaChamada) { window.sairDaChamada(true); }
    try { await Promise.all(promessas); } catch(e) { }
}

window.adicionarPresencaLocal = async function() {
    if (!window.usuarioAtual || window.idProjetoAtivo === null || window.idConversaAtiva === null || !window.projetos[window.idProjetoAtivo].id) return;
    const ref = doc(db, "projetos", window.projetos[window.idProjetoAtivo].id);
    updateDoc(ref, new FieldPath('presenca', window.usuarioAtual.email), window.idConversaAtiva).catch(e=>{});
}

window.addEventListener('pagehide', window.limparMinhaPresencaGlobal);
window.addEventListener('beforeunload', window.limparMinhaPresencaGlobal);

window.iniciarEscutaUsuarios = function() {
    window.unsubscribeUsuarios = onSnapshot(collection(db, "usuarios"), (snapshot) => {
        snapshot.forEach(doc => { const data = doc.data(); if(data.email && data.nome) window.mapUsuarios[data.email] = data.nome; });
        if (window.atualizarBotaoPerfilGlobal) window.atualizarBotaoPerfilGlobal();
        if (window.renderizarSidebar) window.renderizarSidebar();
        if (window.idProjetoAtivo !== null && window.idConversaAtiva !== null) {
            if(window.renderizarChat) window.renderizarChat();
            if(window.renderizarUsuariosNaChamada) window.renderizarUsuariosNaChamada();
        }
    }, (e) => { console.warn("Escuta restrita."); });
}

// ==========================================================
// 2. AUTH E GESTÃO DE PERFIL
// ==========================================================
window.atualizarBotaoPerfilGlobal = function() {
    if(!window.usuarioAtual) return;
    const userEmail = window.usuarioAtual.email;
    const nomeAtual = window.mapUsuarios[userEmail] || window.usuarioAtual.displayName || window.formatarNomeUsuario(userEmail);
    const photoUrl = window.usuarioAtual.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeAtual)}&background=21262d&color=c9d1d9&rounded=true`;
    const btnProfile = document.getElementById('btn-profile');
    if(btnProfile) btnProfile.innerHTML = `<img src="${photoUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;"> <span class="texto-btn" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${nomeAtual}</span>`;
}

onAuthStateChanged(auth, async (user) => {
    if(window.fecharModalAuth) window.fecharModalAuth();
    const btnProfile = document.getElementById('btn-profile');
    const btnNotif = document.getElementById('btn-notificacoes');

    if (user) {
        window.usuarioAtual = user;
        btnProfile.onclick = window.abrirProfileMenu;
        document.getElementById('config-btn-apikey').style.display = 'flex';
        btnNotif.style.display = 'flex';

        try {
            const docSnap = await getDoc(doc(db, "usuarios", user.uid));
            if (docSnap.exists()) {
                const data = docSnap.data();
                window.perfilGlobalData.profissao = data.profissao || "";
                window.perfilGlobalData.tags = data.tags || [];
                window.tagsSelecionadas = data.tags || [];

                if (data.googleApiKey) {
                    window.userApiKey = data.googleApiKey; localStorage.setItem('unity_google_api_key', window.userApiKey); document.getElementById('input-api-key').value = window.userApiKey;
                } else {
                    window.userApiKey = localStorage.getItem('unity_google_api_key') || ''; document.getElementById('input-api-key').value = window.userApiKey;
                }
            } else { window.userApiKey = localStorage.getItem('unity_google_api_key') || ''; document.getElementById('input-api-key').value = window.userApiKey; }
        } catch(e) {}
        
        window.iniciarEscutaUsuarios(); 
        window.atualizarBotaoPerfilGlobal();
        if(window.atualizarIndicadorApiKey) window.atualizarIndicadorApiKey(window.userApiKey);
        window.iniciarEscutaProjetosNuvem(user.email);
        window.iniciarEscutaConvites(user.email);
        window.iniciarEscutaNotificacoes(user.email);
        
        if (localStorage.getItem('comboboy_tour') !== 'true' && window.iniciarTour) window.iniciarTour();

    } else {
        if (window.unsubscribeProjetos) window.unsubscribeProjetos();
        if (window.unsubscribeConvites) window.unsubscribeConvites();
        if (window.unsubscribeNotificacoes) window.unsubscribeNotificacoes();
        if (window.unsubscribeUsuarios) window.unsubscribeUsuarios();
        
        window.usuarioAtual = null; window.mapUsuarios = {};
        window.perfilGlobalData = { profissao: "", tags: [] };
        
        btnProfile.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="texto-btn">Minha Conta</span>`;
        btnProfile.onclick = window.abrirModalAuth;
        document.getElementById('config-btn-apikey').style.display = 'none';
        btnNotif.style.display = 'none';

        window.userApiKey = localStorage.getItem('unity_google_api_key') || ''; document.getElementById('input-api-key').value = window.userApiKey;
        if(window.atualizarIndicadorApiKey) window.atualizarIndicadorApiKey(window.userApiKey);
        
        window.carregarProjetosLocais();
        if(window.resetarVisualizacaoChat) window.resetarVisualizacaoChat();
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
        if (window.unsubscribeProjetos) window.unsubscribeProjetos();
        if (window.unsubscribeConvites) window.unsubscribeConvites();
        if (window.unsubscribeNotificacoes) window.unsubscribeNotificacoes();
        if (window.unsubscribeUsuarios) window.unsubscribeUsuarios();
        
        await window.limparMinhaPresencaGlobal(); 
        window.location.reload(); // Evita fantasmas na memoria
    }
}

// ==========================================================
// 3. LISTENERS FIREBASE GERAIS
// ==========================================================
window.iniciarEscutaProjetosNuvem = function(email) {
    const q = query(collection(db, "projetos"), where("membros", "array-contains", email));
    window.unsubscribeProjetos = onSnapshot(q, (snapshot) => {
        let idProjAntigo = window.idProjetoAtivo !== null && window.projetos[window.idProjetoAtivo] ? window.projetos[window.idProjetoAtivo].id : null;
        window.projetos = [];
        snapshot.forEach((doc) => { window.projetos.push({ id: doc.id, ...doc.data() }); });
        
        if (idProjAntigo) {
            const novoIndex = window.projetos.findIndex(p => p.id === idProjAntigo);
            if (novoIndex !== -1) {
                window.idProjetoAtivo = novoIndex; 
                if (!window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva]) window.resetarVisualizacaoChat();
            } else { window.resetarVisualizacaoChat(); }
        }
        window.renderizarSidebar();
        if (window.idProjetoAtivo !== null && window.projetos[window.idProjetoAtivo] && window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva]) {
            if(window.renderizarChat) window.renderizarChat();
            if(window.renderizarChatLateral) window.renderizarChatLateral();
            if(window.verificarNovosPeers) window.verificarNovosPeers();
            if(window.renderizarUsuariosNaChamada) window.renderizarUsuariosNaChamada();
            if(window.atualizarBotoesChamada) window.atualizarBotoesChamada();
        }
    }, (e) => { console.warn("Escuta Bloqueada."); });
}

window.salvarDadosAtuais = function(indexProj = null) {
    if (window.usuarioAtual && indexProj !== null && window.projetos[indexProj] && window.projetos[indexProj].id) {
        const proj = window.projetos[indexProj];
        updateDoc(doc(db, "projetos", proj.id), { nome: proj.nome, aberto: proj.aberto, conversas: proj.conversas, membros: proj.membros || [] });
    } else if (!window.usuarioAtual) { localStorage.setItem('unity_projetos_locais', JSON.stringify(window.projetos)); }
}

window.carregarProjetosLocais = function() {
    const salvo = localStorage.getItem('unity_projetos_locais');
    if (salvo) { window.projetos = JSON.parse(salvo); } else { window.projetos = []; }
    window.renderizarSidebar();
}

let cacheConvites = []; let cacheNotifs = [];
window.atualizarPainelNotificacoesUnificado = function() {
    const listaNotif = document.getElementById('lista-notificacoes-popup'); listaNotif.innerHTML = '';
    const totalItens = cacheConvites.length + cacheNotifs.length;
    document.getElementById('badge-notificacao').style.display = totalItens > 0 ? 'block' : 'none';
    if (totalItens === 0) { listaNotif.innerHTML = `<div style="color: #8b949e; font-size: 0.85rem; text-align: center; padding: 10px;">Nenhuma notificação.</div>`; return; }

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

window.iniciarEscutaConvites = function(email) {
    const q = query(collection(db, "convites"), where("destinatario", "==", email), where("status", "==", "pendente"));
    window.unsubscribeConvites = onSnapshot(q, (snapshot) => { cacheConvites = []; snapshot.forEach((docSnap) => { cacheConvites.push({ id: docSnap.id, ...docSnap.data() }); }); window.atualizarPainelNotificacoesUnificado(); }, (e) => {});
}

window.iniciarEscutaNotificacoes = function(email) {
    const q = query(collection(db, "notificacoes"), where("destinatario", "==", email));
    window.unsubscribeNotificacoes = onSnapshot(q, (snapshot) => { cacheNotifs = []; snapshot.forEach((docSnap) => { cacheNotifs.push({ id: docSnap.id, ...docSnap.data() }); }); window.atualizarPainelNotificacoesUnificado(); }, (e) => {});
}

window.abrirMenuNotificacoes = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('notifications-menu'); const btn = document.getElementById('btn-notificacoes').getBoundingClientRect();
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else {
        document.getElementById('config-menu').style.display = 'none'; document.getElementById('profile-menu').style.display = 'none'; document.getElementById('historico-menu').style.display = 'none';
        menu.style.display = 'block'; menu.style.right = '20px'; menu.style.top = (btn.bottom + 10) + 'px';
    }
}

window.responderConvite = async function(conviteId, projetoId, remetente, projetoNome, aceitar) {
    const box = document.getElementById(`convite-${conviteId}`); if(box) box.style.display = 'none';
    try {
        if (aceitar && projetoId) { await updateDoc(doc(db, "projetos", projetoId), { membros: arrayUnion(window.usuarioAtual.email) }); mostrarToast(window.getMeme('sucesso'), "rgba(46, 204, 113, 0.9)", SVG_CHECK);
        } else { mostrarToast("Convite recusado.", "rgba(218, 54, 51, 0.9)", SVG_WARN); }
        await deleteDoc(doc(db, "convites", conviteId));
        await addDoc(collection(db, "notificacoes"), { destinatario: remetente, mensagem: `<b>${window.formatarNomeUsuario(window.usuarioAtual.email)}</b> ${aceitar ? "aceitou" : "recusou"} seu convite para <b>${projetoNome}</b>.`, timestamp: Date.now() });
        document.getElementById('notifications-menu').style.display = 'none';
    } catch(e) { if(box) box.style.display = 'block'; mostrarToast(window.getMeme('erro'), "rgba(218, 54, 51, 0.9)", SVG_WARN); }
}

window.apagarNotificacao = async function(event, notifId) {
    event.stopPropagation();
    const box = document.getElementById(`notif-${notifId}`); if(box) box.style.display = 'none'; 
    try { await deleteDoc(doc(db, "notificacoes", notifId)); } catch(e) { if(box) box.style.display = 'flex'; }
}