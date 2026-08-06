import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

let isCreatingAccount = false; 

// ================= GESTÃO DE AUTH E MIGRAÇÃO =================
onAuthStateChanged(auth, async (user) => {
    fecharModalAuth();
    
    const btnProfile = document.getElementById('btn-profile');

    if (user) {
        usuarioAtual = user;
        
        // Puxa a foto do Google ou gera um avatar com a inicial do email
        const userEmail = user.email || 'Usuario';
        const photoUrl = user.photoURL || `https://ui-avatars.com/api/?name=${userEmail}&background=21262d&color=c9d1d9&rounded=true`;
        const displayName = user.displayName || userEmail.split('@')[0];

        btnProfile.innerHTML = `<img src="${photoUrl}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;"> <span class="texto-btn" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${displayName}</span>`;
        btnProfile.onclick = abrirProfileMenu;
        
        document.getElementById('config-btn-apikey').style.display = 'flex';

        if (isCreatingAccount) {
            await salvarLocalmente();
            isCreatingAccount = false;
            mostrarToast("Conta criada! Projetos migrados para nuvem.", "rgba(46, 204, 113, 0.9)", SVG_CHECK);
        } else {
            await carregarProjetosDoFirebase();
            resetarVisualizacaoChat();
            mostrarToast("Login efetuado com sucesso!", "rgba(46, 204, 113, 0.9)", SVG_CHECK);
        }
    } else {
        usuarioAtual = null;
        btnProfile.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="texto-btn">Minha Conta</span>`;
        btnProfile.onclick = () => abrirModalAuth();
        
        document.getElementById('config-btn-apikey').style.display = 'none';

        carregarProjetosLocais();
        resetarVisualizacaoChat();
    }
});

// Abertura e fechamento do Popup de Sair
window.abrirProfileMenu = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('profile-menu');
    const btn = document.getElementById('btn-profile').getBoundingClientRect();
    
    if (menu.style.display === 'block') { 
        menu.style.display = 'none'; 
    } else {
        document.getElementById('config-menu').style.display = 'none'; 
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

// Mensagens de erro amigáveis do Firebase
function tratarErroAuth(erroCode) {
    switch(erroCode) {
        case 'auth/email-already-in-use': return 'Este e-mail já está cadastrado.';
        case 'auth/invalid-email': return 'Digite um e-mail com formato válido.';
        case 'auth/weak-password': return 'A senha é fraca. Use pelo menos 6 caracteres.';
        case 'auth/user-not-found': return 'Usuário não encontrado. Verifique o e-mail.';
        case 'auth/wrong-password': return 'Senha incorreta.';
        case 'auth/invalid-credential': return 'E-mail ou senha incorretos.';
        default: return 'Ocorreu um erro. Verifique seus dados e tente novamente.';
    }
}

window.abrirModalAuth = () => {
    document.getElementById('auth-error-msg').innerText = '';
    document.getElementById('modal-auth').style.display = 'flex';
}
window.fecharModalAuth = () => document.getElementById('modal-auth').style.display = 'none';

document.getElementById('btn-login-email').onclick = async () => {
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('senha-input').value;
    const errorMsg = document.getElementById('auth-error-msg');
    
    if(!email || !senha) { errorMsg.innerText = "Preencha e-mail e senha."; return; }
    
    errorMsg.innerText = "Conectando...";
    errorMsg.style.color = "#c9d1d9";
    try { await signInWithEmailAndPassword(auth, email, senha); } 
    catch(e) { errorMsg.style.color = "#ff7b72"; errorMsg.innerText = tratarErroAuth(e.code); }
};

document.getElementById('btn-cadastro-email').onclick = async () => {
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('senha-input').value;
    const errorMsg = document.getElementById('auth-error-msg');
    
    if(!email || senha.length < 6) { 
        errorMsg.style.color = "#ff7b72"; errorMsg.innerText = "Digite um e-mail válido e senha (mínimo 6 caracteres)."; 
        return; 
    }
    
    errorMsg.innerText = "Criando conta...";
    errorMsg.style.color = "#c9d1d9";
    try { isCreatingAccount = true; await createUserWithEmailAndPassword(auth, email, senha); } 
    catch(e) { isCreatingAccount = false; errorMsg.style.color = "#ff7b72"; errorMsg.innerText = tratarErroAuth(e.code); }
};

document.getElementById('btn-login-google').onclick = async () => {
    try { await signInWithPopup(auth, new GoogleAuthProvider()); } 
    catch(e) { document.getElementById('auth-error-msg').innerText = tratarErroAuth(e.code); }
};

// ================= GESTÃO DE ARMAZENAMENTO =================
async function salvarLocalmente() {
    if (usuarioAtual) {
        try { await setDoc(doc(db, "usuarios", usuarioAtual.uid), { projetos: window.projetos }); } 
        catch (e) { console.error("Erro ao salvar na nuvem", e); }
    } else {
        localStorage.setItem('unity_projetos_locais', JSON.stringify(window.projetos));
    }
}

async function carregarProjetosDoFirebase() {
    try {
        const docSnap = await getDoc(doc(db, "usuarios", usuarioAtual.uid));
        if (docSnap.exists() && docSnap.data().projetos) {
            window.projetos = docSnap.data().projetos;
        } else {
            window.projetos = [];
        }
        renderizarSidebar(); 
    } catch (e) { console.error("Erro ao puxar dados", e); }
}

function carregarProjetosLocais() {
    const salvo = localStorage.getItem('unity_projetos_locais');
    if (salvo) { window.projetos = JSON.parse(salvo); } 
    else { window.projetos = []; }
    renderizarSidebar();
}

// ================= GESTÃO DA API KEY CUSTOMIZADA =================
let userApiKey = localStorage.getItem('unity_google_api_key') || '';
document.getElementById('input-api-key').value = userApiKey;

window.abrirModalApiKey = () => {
    document.getElementById('config-menu').style.display = 'none';
    document.getElementById('modal-apikey').style.display = 'flex';
}
window.salvarApiKey = () => {
    const input = document.getElementById('input-api-key').value.trim();
    userApiKey = input;
    localStorage.setItem('unity_google_api_key', userApiKey);
    document.getElementById('modal-apikey').style.display = 'none';
    mostrarToast('Chave API salva no navegador!', 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS);
}

// ================= UTILITÁRIOS E UI =================
let configAskToSave = true;
if (localStorage.getItem('unity_config_ask_save') !== null) {
    configAskToSave = localStorage.getItem('unity_config_ask_save') === 'true';
}
document.getElementById('toggle-ask-save').checked = configAskToSave;

let toastTimeout;
function mostrarToast(mensagem, cor = 'rgba(245, 130, 32, 0.9)', iconeSvg = SVG_CHECK) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-icon').innerHTML = iconeSvg;
    document.getElementById('toast-msg').innerHTML = mensagem;
    toast.style.background = cor;
    toast.classList.add('mostrar');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toast.classList.remove('mostrar'); }, 3000);
}

window.abrirConfigMenu = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('config-menu');
    const btn = document.getElementById('btn-config').getBoundingClientRect();
    
    if (menu.style.display === 'block') { menu.style.display = 'none'; } 
    else {
        document.getElementById('profile-menu').style.display = 'none'; 
        menu.style.display = 'block';
        menu.style.left = (btn.left + 10) + 'px';
        menu.style.top = (btn.top - menu.offsetHeight - 10) + 'px';
    }
}

window.salvarPreferenciasConfig = function() {
    const toggle = document.getElementById('toggle-ask-save');
    configAskToSave = toggle.checked;
    localStorage.setItem('unity_config_ask_save', configAskToSave);
    mostrarToast(configAskToSave ? 'Você escolherá onde salvar.' : 'Salvando na pasta padrão.', 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS);
}

function formatarBlocosDeCodigo() {
    document.querySelectorAll('.bot pre').forEach(pre => {
        if (pre.parentElement.classList.contains('code-wrapper')) return;

        const codeElement = pre.querySelector('code');
        let linguagem = 'Code';
        let linguagemRaw = '';
        
        if (codeElement && codeElement.className) {
            const match = codeElement.className.match(/language-(\w+)/);
            if (match) { linguagem = match[1]; linguagemRaw = match[1].toLowerCase(); }
        }

        if (codeElement && !codeElement.dataset.highlighted) {
            hljs.highlightElement(codeElement);
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        
        const header = document.createElement('div');
        header.className = 'code-header';
        
        const title = document.createElement('span');
        title.innerText = linguagem;

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'code-header-actions';
        
        const btnDownload = document.createElement('button');
        btnDownload.className = 'btn-copy';
        btnDownload.innerHTML = `${SVG_DOWNLOAD} Baixar`;
        btnDownload.title = 'Baixar arquivo';
        btnDownload.onclick = () => baixarCodigo(codeElement.innerText, linguagemRaw);

        const btnCopy = document.createElement('button');
        btnCopy.className = 'btn-copy';
        btnCopy.innerHTML = `${SVG_COPY} Copiar`;
        btnCopy.onclick = () => {
            navigator.clipboard.writeText(codeElement.innerText).then(() => {
                btnCopy.innerHTML = `${SVG_CHECK} Copiado`;
                btnCopy.classList.add('copiado');
                mostrarToast('Código copiado!', 'rgba(245, 130, 32, 0.9)', SVG_CHECK);
                setTimeout(() => { btnCopy.innerHTML = `${SVG_COPY} Copiar`; btnCopy.classList.remove('copiado'); }, 2000);
            });
        };

        actionsContainer.appendChild(btnDownload);
        actionsContainer.appendChild(btnCopy);
        header.appendChild(title);
        header.appendChild(actionsContainer);
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
    });
}
async function baixarCodigo(texto, linguagem) {
    const mapExt = { 'csharp': 'cs', 'cs': 'cs', 'javascript': 'js', 'js': 'js', 'python': 'py', 'py': 'py', 'html': 'html', 'css': 'css', 'json': 'json', 'cpp': 'cpp', 'java': 'java', 'xml': 'xml', 'shader': 'shader' };
    const ext = mapExt[linguagem] || 'txt';
    let nomeArquivo = `script.${ext}`;

    if (ext === 'cs' || ext === 'java' || ext === 'cpp' || ext === 'js') {
        const match = texto.match(/(?:class|interface|struct|enum)\s+([A-Za-z0-9_]+)/);
        if (match && match[1]) nomeArquivo = `${match[1]}.${ext}`;
    }

    if (configAskToSave && window.showSaveFilePicker) {
        try {
            const handle = await window.showSaveFilePicker({ suggestedName: nomeArquivo, types: [{ description: 'Código', accept: { 'text/plain': [`.${ext}`] } }] });
            const writable = await handle.createWritable();
            await writable.write(texto);
            await writable.close();
            mostrarToast(`<b>${nomeArquivo}</b> salvo!`, 'rgba(245, 130, 32, 0.9)', SVG_SAVE);
            return; 
        } catch (err) { if (err.name === 'AbortError') return; }
    }

    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); 
    const a = document.createElement('a'); a.href = url; a.download = nomeArquivo; a.click(); URL.revokeObjectURL(url);
    mostrarToast(`Download iniciado!`, 'rgba(245, 130, 32, 0.9)', SVG_DOWNLOAD);
}

document.addEventListener('click', (e) => { 
    if (!e.target.closest('#config-menu') && !e.target.closest('#btn-config')) {
        document.getElementById('config-menu').style.display = 'none'; 
    }
    if (!e.target.closest('#profile-menu') && !e.target.closest('#btn-profile')) {
        document.getElementById('profile-menu').style.display = 'none'; 
    }
    document.getElementById('context-menu').style.display = 'none'; 
});

function getChaveConversa(pIdx, cIdx) { return `${pIdx}_${cIdx}`; }

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
            const chave = getChaveConversa(indexProj, indexConv);
            const estaProcessando = statusConversas[chave] && statusConversas[chave].ativa;
            const estaAtiva = (idProjetoAtivo === indexProj && idConversaAtiva === indexConv);
            
            const convDiv = document.createElement('div');
            convDiv.id = `conv-${indexProj}-${indexConv}`;
            convDiv.className = `conversa-item ${estaAtiva ? 'ativa' : ''} ${estaProcessando ? 'processando' : ''}`;
            
            convDiv.innerHTML = `
                <span style="display:block; width:calc(100% - 20px); overflow:hidden; text-overflow:ellipsis;">${conv.nome}</span>
                <span class="status-icon">${SVG_SPINNER}</span>
            `;
            
            convDiv.onclick = () => selecionarConversa(indexProj, indexConv);
            convDiv.oncontextmenu = (e) => window.abrirMenuContexto(e, 'conversa', indexProj, indexConv);
            containerConversas.appendChild(convDiv);
        });
    });
    atualizarEstadoBotaoEnvio();
}

window.alternarSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('recolhido')) { sidebar.classList.remove('recolhido'); } 
    else { sidebar.classList.add('recolhido'); }
}

window.alternarPasta = function(indexProj) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('recolhido')) { sidebar.classList.remove('recolhido'); window.projetos[indexProj].aberto = true; } 
    else { window.projetos[indexProj].aberto = !window.projetos[indexProj].aberto; }
    salvarLocalmente(); renderizarSidebar();
}

window.abrirMenuContexto = function(event, tipo, indexProj, indexConv = null) {
    event.preventDefault(); alvoMenu = { tipo, indexProj, indexConv };
    const menu = document.getElementById('context-menu');
    
    menu.innerHTML = tipo === 'projeto' 
        ? `<div class="context-item" onclick="abrirModalRenomear()">${SVG_EDIT} Renomear Projeto</div><div class="context-item" onclick="exportarProjetoZip()">${SVG_ARCHIVE} Baixar Projeto (.zip)</div><div class="context-item danger" onclick="deletarProjeto()">${SVG_TRASH} Apagar Projeto</div>`
        : `<div class="context-item" onclick="abrirModalRenomear()">${SVG_EDIT} Renomear Conversa</div><div class="context-item" onclick="exportarConversaMD()">${SVG_FILE} Baixar Conversa (.md)</div><div class="context-item danger" onclick="deletarConversa()">${SVG_TRASH} Apagar Conversa</div>`;
        
    menu.style.display = 'block'; menu.style.left = event.pageX + 'px'; menu.style.top = event.pageY + 'px';
}

window.abrirModalRenomear = function() {
    document.getElementById('context-menu').style.display = 'none';
    const modal = document.getElementById('modal-renomear');
    const input = document.getElementById('input-nome-renomear');
    const titulo = document.getElementById('titulo-modal-renomear');

    if (alvoMenu.tipo === 'projeto') {
        titulo.innerText = 'Renomear Projeto';
        input.value = window.projetos[alvoMenu.indexProj].nome;
    } else {
        titulo.innerText = 'Renomear Conversa';
        input.value = window.projetos[alvoMenu.indexProj].conversas[alvoMenu.indexConv].nome;
    }

    modal.style.display = 'flex';
    input.focus();
}

window.fecharModalRenomear = function() {
    document.getElementById('modal-renomear').style.display = 'none';
}

window.confirmarRenomear = function() {
    const novoNome = document.getElementById('input-nome-renomear').value.trim();
    if (!novoNome) return;

    if (alvoMenu.tipo === 'projeto') {
        window.projetos[alvoMenu.indexProj].nome = novoNome;
        mostrarToast('Projeto renomeado!', 'rgba(245, 130, 32, 0.9)', SVG_FOLDER);
    } else {
        window.projetos[alvoMenu.indexProj].conversas[alvoMenu.indexConv].nome = novoNome;
        mostrarToast('Conversa renomeada!', 'rgba(245, 130, 32, 0.9)', SVG_FILE);
    }

    salvarLocalmente();
    renderizarSidebar();
    
    if (idProjetoAtivo !== null) {
        document.getElementById('chat-header').innerText = `${window.projetos[idProjetoAtivo].nome} / ${window.projetos[idProjetoAtivo].conversas[idConversaAtiva].nome}`;
    }
    
    window.fecharModalRenomear();
}

window.deletarConversa = function() {
    if (confirm('Apagar esta conversa?')) {
        const chave = getChaveConversa(alvoMenu.indexProj, alvoMenu.indexConv);
        if (statusConversas[chave] && statusConversas[chave].ativa) cancelarRequisicao(chave);

        window.projetos[alvoMenu.indexProj].conversas.splice(alvoMenu.indexConv, 1);
        if (idProjetoAtivo === alvoMenu.indexProj) {
            if (idConversaAtiva === alvoMenu.indexConv) { idProjetoAtivo = null; idConversaAtiva = null; }
            else if (idConversaAtiva > alvoMenu.indexConv) idConversaAtiva--;
        }
        salvarLocalmente(); renderizarSidebar(); if(idProjetoAtivo===null)resetarVisualizacaoChat(); else renderizarChat();
    }
}

window.deletarProjeto = function() {
    if (confirm('Apagar a pasta e todas as conversas?')) {
        Object.keys(statusConversas).forEach(k => { if(k.startsWith(alvoMenu.indexProj+'_')) cancelarRequisicao(k); });
        window.projetos.splice(alvoMenu.indexProj, 1);
        if (idProjetoAtivo === alvoMenu.indexProj) { idProjetoAtivo = null; idConversaAtiva = null; }
        else if (idProjetoAtivo > alvoMenu.indexProj) idProjetoAtivo--;
        salvarLocalmente(); renderizarSidebar(); if(idProjetoAtivo===null)resetarVisualizacaoChat(); else renderizarChat();
    }
}

function resetarVisualizacaoChat() {
    idProjetoAtivo = null;
    idConversaAtiva = null;
    document.getElementById('input-container').classList.remove('ativo');
    document.getElementById('chat-header').innerText = 'ComboBoy Researcher';
    document.getElementById('chat').innerHTML = '<div id="sem-conversa-msg">Selecione uma conversa ao lado ou crie um novo projeto para começar.</div>';
}

window.exportarConversaMD = function() {
    const proj = window.projetos[alvoMenu.indexProj]; const conv = proj.conversas[alvoMenu.indexConv];
    const blob = new Blob([gerarMarkdownDaConversa(proj.nome, conv)], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Unity_${conv.nome.replace(/[^a-z0-9]/gi, '_')}.md`; a.click();
}

window.exportarProjetoZip = async function() {
    const proj = window.projetos[alvoMenu.indexProj]; const zip = new JSZip();
    proj.conversas.forEach((conv, i) => { zip.file(`${conv.nome.replace(/[^a-z0-9]/gi, '_').substring(0, 30)}_${i}.md`, gerarMarkdownDaConversa(proj.nome, conv)); });
    const blob = await zip.generateAsync({type:"blob"});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Proj_${proj.nome.replace(/[^a-z0-9]/gi, '_')}.zip`; a.click();
}

function gerarMarkdownDaConversa(nomeProj, conv) {
    let md = `# Projeto: ${nomeProj}\n## Conversa: ${conv.nome}\n\n---\n\n`;
    conv.mensagens.forEach(msg => { md += (msg.papel === 'aluno' ? `**🧑‍💻 Você:**\n${msg.texto}\n\n` : `**🤖 Professor Unity:**\n${msg.texto}\n\n`) + `---\n\n`; });
    return md;
}

window.abrirModal = function() { 
    document.getElementById('modal-projeto').style.display = 'flex'; 
    document.getElementById('input-nome-projeto').value = ''; 
    document.getElementById('input-genero-projeto').value = ''; 
    document.getElementById('input-desc-projeto').value = ''; 
    document.getElementById('input-nome-projeto').focus(); 
}

window.fecharModal = function() { document.getElementById('modal-projeto').style.display = 'none'; }

// ======= CRIAÇÃO DO PROJETO COM OS NOVOS CAMPOS =======
window.confirmarProjeto = function() {
    const nome = document.getElementById('input-nome-projeto').value.trim();
    const genero = document.getElementById('input-genero-projeto').value.trim();
    const descricao = document.getElementById('input-desc-projeto').value.trim();

    if (nome) { 
        window.projetos.push({ 
            nome: nome, 
            genero: genero,
            descricao: descricao,
            aberto: true, 
            conversas: [] 
        }); 
        salvarLocalmente(); 
        renderizarSidebar(); 
        window.fecharModal(); 
        mostrarToast('Projeto criado!', 'rgba(245, 130, 32, 0.9)', SVG_FOLDER); 
    }
}

window.novaConversa = function(indexProj, event) {
    event.stopPropagation();
    
    // Puxa as informações caso elas existam para personalizar o início da conversa
    const generoStr = window.projetos[indexProj].genero ? ` de ${window.projetos[indexProj].genero}` : "";
    
    window.projetos[indexProj].conversas.push({ 
        nome: `Nova Conversa ${window.projetos[indexProj].conversas.length + 1}`, 
        mensagens: [{ papel: 'bot', texto: `Olá! Sou seu professor especialista em Unity. Como posso te ajudar neste projeto${generoStr}?` }] 
    });
    
    window.projetos[indexProj].aberto = true; 
    document.getElementById('sidebar').classList.remove('recolhido');
    salvarLocalmente(); 
    renderizarSidebar(); 
    selecionarConversa(indexProj, window.projetos[indexProj].conversas.length - 1);
}

function selecionarConversa(indexProj, indexConv) {
    idProjetoAtivo = indexProj; idConversaAtiva = indexConv;
    document.querySelectorAll('.conversa-item').forEach(el => el.classList.remove('ativa'));
    const itemAtivo = document.getElementById(`conv-${indexProj}-${indexConv}`);
    if (itemAtivo) itemAtivo.classList.add('ativa');
    
    document.getElementById('input-container').classList.add('ativo');
    document.getElementById('chat-header').innerText = `${window.projetos[indexProj].nome} / ${window.projetos[indexProj].conversas[indexConv].nome}`;
    
    renderizarChat();
    atualizarEstadoBotaoEnvio();
    validarInput();
}

function renderizarChat() {
    if (idProjetoAtivo === null) return;
    const chatBox = document.getElementById('chat'); chatBox.innerHTML = ''; 
    const conversa = window.projetos[idProjetoAtivo].conversas[idConversaAtiva];
    
    conversa.mensagens.forEach(msg => {
        if (msg.papel === 'system') {
            chatBox.innerHTML += `<div class="system-msg">${msg.texto}</div>`;
        } else {
            chatBox.innerHTML += `<div class="balao ${msg.papel}">${msg.papel === 'aluno' ? msg.texto.replace(/\n/g, '<br>') : marked.parse(msg.texto)}</div>`;
        }
    });
    
    const chave = getChaveConversa(idProjetoAtivo, idConversaAtiva);
    if (statusConversas[chave] && statusConversas[chave].ativa) {
        chatBox.innerHTML += `<div id="indicador-${chave}" class="balao bot"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
    }

    formatarBlocosDeCodigo();
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.validarInput = function() {
    const input = document.getElementById('mensagem');
    const btn = document.getElementById('btn-acao');
    
    if (idProjetoAtivo === null) return;
    const chave = getChaveConversa(idProjetoAtivo, idConversaAtiva);
    const estaProcessando = statusConversas[chave] && statusConversas[chave].ativa;

    if (!estaProcessando) {
        btn.disabled = input.value.trim().length === 0;
    }
}

function atualizarEstadoBotaoEnvio() {
    if (idProjetoAtivo === null) return;
    
    const btn = document.getElementById('btn-acao');
    const iconSend = document.getElementById('icon-send');
    const iconStop = document.getElementById('icon-stop');
    
    const chave = getChaveConversa(idProjetoAtivo, idConversaAtiva);
    const estaProcessando = statusConversas[chave] && statusConversas[chave].ativa;

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
        window.validarInput();
    }
}

window.lidarComAcao = function() {
    const chave = getChaveConversa(idProjetoAtivo, idConversaAtiva);
    const estaProcessando = statusConversas[chave] && statusConversas[chave].ativa;

    if (estaProcessando) { cancelarRequisicao(chave); } 
    else { enviarMensagem(); }
}

function cancelarRequisicao(chave) {
    if (statusConversas[chave] && statusConversas[chave].controller) {
        statusConversas[chave].controller.abort();
    }
}

async function enviarMensagem() {
    if (idProjetoAtivo === null || idConversaAtiva === null) return;
    
    const pIdx = idProjetoAtivo;
    const cIdx = idConversaAtiva;
    const chave = getChaveConversa(pIdx, cIdx);
    
    if (statusConversas[chave] && statusConversas[chave].ativa) return;

    const input = document.getElementById('mensagem');
    const texto = input.value.trim(); if(!texto) return;

    const conversaAtual = window.projetos[pIdx].conversas[cIdx];
    conversaAtual.mensagens.push({ papel: 'aluno', texto: texto });
    
    if (conversaAtual.mensagens.length === 2) {
        conversaAtual.nome = texto.substring(0, 25) + (texto.length > 25 ? "..." : "");
    }
    salvarLocalmente();
    
    if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) {
        input.value = ''; input.style.height = 'auto';
    }

    const controller = new AbortController();
    statusConversas[chave] = { ativa: true, controller: controller };
    
    renderizarSidebar();
    if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) {
        renderizarChat();
        atualizarEstadoBotaoEnvio();
    }

    try {
        const headers = { 'Content-Type': 'application/json' };
        
        if (usuarioAtual) {
            const tokenFresco = await usuarioAtual.getIdToken(true);
            headers['Authorization'] = `Bearer ${tokenFresco}`;
            if (userApiKey) { headers['x-google-api-key'] = userApiKey; }
        }

        const res = await fetch('https://chatbot-unity.onrender.com/api/chat', { 
            method: 'POST', 
            headers: headers, 
            body: JSON.stringify({ texto: texto }),
            signal: controller.signal 
        });
        
        let respostaFinal = "";        
        if (res.status === 429) { 
            respostaFinal = "Limite da IA atingido. O Gemini está processando muitos pedidos agora. Por favor, tente novamente em alguns instantes.";
            conversaAtual.mensagens.push({ papel: 'system', texto: `${SVG_CLOCK} ${respostaFinal}` });
        } else if (!res.ok) {
            let detalheErro = "Falha no Servidor";
            try { const body = await res.json(); detalheErro = body.detail || detalheErro; } catch(e){}
            throw new Error(detalheErro);
        } else {
            const dados = await res.json();
            if (dados.error && (String(dados.error).includes('429') || String(dados.error).toLowerCase().includes('quota'))) {
                respostaFinal = "Limite de Quota atingido. Tente novamente mais tarde.";
                conversaAtual.mensagens.push({ papel: 'system', texto: `${SVG_CLOCK} ${respostaFinal}` });
            } else {
                respostaFinal = dados.resposta;
                conversaAtual.mensagens.push({ papel: 'bot', texto: respostaFinal });
            }
        }

    } catch (e) {
        if (e.name === 'AbortError') {
            conversaAtual.mensagens.push({ papel: 'system', texto: `${SVG_WARN} Geração de resposta cancelada pelo usuário.` });
        } else {
            conversaAtual.mensagens.push({ papel: 'system', texto: `${SVG_WARN} Erro de comunicação: ${e.message}` });
        }
    } finally {
        statusConversas[chave].ativa = false;
        salvarLocalmente();
        
        renderizarSidebar();
        if (idProjetoAtivo === pIdx && idConversaAtiva === cIdx) {
            renderizarChat();
            atualizarEstadoBotaoEnvio();
        }
    }
}

window.ajustarAltura = function(elemento) { elemento.style.height = 'auto'; elemento.style.height = (elemento.scrollHeight) + 'px'; }

window.lidarComTecla = function(event) { 
    if (event.key === 'Enter' && !event.shiftKey) { 
        event.preventDefault(); 
        const btn = document.getElementById('btn-acao');
        if (btn.classList.contains('enviar') && !btn.disabled) {
            window.lidarComAcao(); 
        }
    } 
}