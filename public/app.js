import { collection, addDoc, updateDoc, deleteDoc, doc, arrayRemove, FieldPath } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db, auth } from './firebase_service.js';
import './webrtc_service.js';
import { SVG_CHECK, SVG_SETTINGS, SVG_DOWNLOAD, SVG_FOLDER, SVG_SAVE, SVG_EDIT, SVG_ARCHIVE, SVG_FILE, SVG_TRASH, SVG_WARN, SVG_CLOCK, SVG_SPINNER, SVG_COPY, SVG_SHARE, getMeme, formatarNomeUsuario, formatarDataHora, mostrarToast, aplicarTamanhosFonte, atualizarIndicadorApiKey, redimensionarEComprimirImagem, formatarBlocosDeCodigo } from './utils.js';

const SVG_REPLY = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>`;

// ==========================================================
// 1. INICIALIZAÇÃO DE ESTADOS GLOBAIS E UI SETUP
// ==========================================================
window.projetos = [];  
window.alvoMenu = { tipo: null, indexProj: null, indexConv: null };
window.idConversaAtiva = null; 
window.idProjetoAtivo = null;
window.statusConversas = {};
window.unsubscribeProjetos = null;
window.unsubscribeConvites = null;
window.unsubscribeNotificacoes = null;
window.unsubscribeUsuarios = null;
window.loadingMemeInterval = null; 

window.prefDetalhado = localStorage.getItem('unity_pref_detalhado') !== 'false';
window.prefComentado = localStorage.getItem('unity_pref_comentado') === 'true';
window.prefChatFs = parseFloat(localStorage.getItem('unity_pref_chat_fs')) || 0.95;
window.prefCodeFs = parseFloat(localStorage.getItem('unity_pref_code_fs')) || 1.05;
window.aplicarTamanhosFonte(window.prefChatFs, window.prefCodeFs);

window.anexoImagemBase64 = null;
window.anexoImagemMimeType = null;
window.anexoTextoConteudo = null;
window.anexoTextoNome = null;
window.userApiKey = '';
window.usuarioAtual = null;
window.mensagemRespondidaTexto = null;

// ==========================================================
// 2. MODAIS E DRAG & DROP
// ==========================================================
window.abrirMenuContexto = function(event, tipo, indexProj, indexConv = null) {
    event.preventDefault(); window.alvoMenu = { tipo, indexProj, indexConv };
    const menu = document.getElementById('context-menu');
    let menuHTML = '';
    
    if (tipo === 'projeto') {
        const isDonoProjeto = window.usuarioAtual && window.projetos[indexProj].membros && window.projetos[indexProj].membros[0] === window.usuarioAtual.email;
        if (window.usuarioAtual && window.projetos[indexProj].id) menuHTML += `<div class="context-item" style="color:#F58220" onclick="window.abrirModalCompartilhar()">${SVG_SHARE} Gerenciar Colab</div><hr style="margin:5px 0; border-color:rgba(255,255,255,0.05);">`;
        
        if (isDonoProjeto || !window.projetos[indexProj].id) {
            menuHTML += `<div class="context-item" onclick="window.abrirModalRenomear()">${SVG_EDIT} Renomear Projeto</div>`;
        }
        menuHTML += `<div class="context-item" onclick="window.exportarProjetoZip()">${SVG_ARCHIVE} Baixar (.zip)</div>`;
        
        if (isDonoProjeto || !window.projetos[indexProj].id) {
            menuHTML += `<div class="context-item danger" onclick="window.deletarProjeto()">${SVG_TRASH} Apagar Projeto</div>`;
        }
    } else {
        const conv = window.projetos[indexProj].conversas[indexConv];
        const isDonoConversa = !window.usuarioAtual || !conv.criador || conv.criador === window.usuarioAtual.email;
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
            const estaAtiva = (window.idProjetoAtivo === indexProj && window.idConversaAtiva === indexConv);
            
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
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width: calc(100% - 50px); pointer-events: none;">${conv.nome}</span>
                <span style="display:flex; align-items:center; flex-shrink:0; pointer-events: none;">${avataresPresencaHTML} <span class="status-icon">${estaProcessando ? SVG_SPINNER : ''}</span></span>
            `;
            
            convDiv.setAttribute('draggable', 'true');
            convDiv.ondragstart = (e) => {
                e.dataTransfer.setData('application/json', JSON.stringify({ p: indexProj, c: indexConv }));
                convDiv.classList.add('dragging');
            };
            convDiv.ondragend = () => convDiv.classList.remove('dragging');
            convDiv.ondragover = (e) => { e.preventDefault(); convDiv.classList.add('drag-over-conv'); };
            convDiv.ondragleave = () => convDiv.classList.remove('drag-over-conv');
            
            convDiv.ondrop = (e) => {
                e.preventDefault();
                convDiv.classList.remove('drag-over-conv');
                try {
                    const data = JSON.parse(e.dataTransfer.getData('application/json'));
                    if (data.p === indexProj && data.c !== indexConv) {
                        const project = window.projetos[indexProj];
                        const itemMovido = project.conversas.splice(data.c, 1)[0];
                        project.conversas.splice(indexConv, 0, itemMovido);
                        
                        if (window.idProjetoAtivo === indexProj) {
                            if (window.idConversaAtiva === data.c) window.idConversaAtiva = indexConv;
                            else if (data.c < window.idConversaAtiva && indexConv >= window.idConversaAtiva) window.idConversaAtiva--;
                            else if (data.c > window.idConversaAtiva && indexConv <= window.idConversaAtiva) window.idConversaAtiva++;
                        }
                        
                        window.adicionarPresencaLocal(); 
                        window.salvarDadosAtuais(indexProj);
                        window.renderizarSidebar();
                    }
                } catch(err) {}
            };
            
            convDiv.onclick = () => window.selecionarConversa(indexProj, indexConv);
            convDiv.oncontextmenu = (e) => window.abrirMenuContexto(e, 'conversa', indexProj, indexConv);
            
            containerConversas.appendChild(convDiv);
        });
    });
    if(window.atualizarEstadoBotaoEnvio) window.atualizarEstadoBotaoEnvio();
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
    if (window.usuarioAtual) {
        await addDoc(collection(db, "projetos"), { nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [], membros: [window.usuarioAtual.email], presenca: {} });
        mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_FOLDER); 
    } else { window.projetos.push({ nome: nome, genero: genero, descricao: descricao, aberto: true, conversas: [] }); window.salvarDadosAtuais(); window.renderizarSidebar(); }
}

window.novaConversa = function(indexProj, event) {
    event.stopPropagation();
    window.projetos[indexProj].conversas.push({ 
        nome: `Nova Conversa ${window.projetos[indexProj].conversas.length + 1}`, criador: window.usuarioAtual ? window.usuarioAtual.email : 'visitante', processando: false,
        mensagens: [{ papel: 'bot', texto: `Pode mandar o seu código, arquivo ou erro!`, timestamp: Date.now() }] 
    });
    window.projetos[indexProj].aberto = true; window.salvarDadosAtuais(indexProj); window.renderizarSidebar(); window.selecionarConversa(indexProj, window.projetos[indexProj].conversas.length - 1);
}

window.confirmarCompartilhamento = async () => {
    const email = document.getElementById('input-email-convite').value.trim();
    if (email && window.usuarioAtual && window.alvoMenu.indexProj !== null) {
        const proj = window.projetos[window.alvoMenu.indexProj];
        await addDoc(collection(db, "convites"), { projetoId: proj.id, projetoNome: proj.nome, remetente: window.usuarioAtual.email, destinatario: email, status: "pendente", timestamp: Date.now() });
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
    if (window.idProjetoAtivo !== null) document.getElementById('header-title').innerText = `${window.projetos[window.idProjetoAtivo].nome} / ${window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva].nome}`;
    window.fecharModalRenomear();
}

window.deletarConversa = function() {
    document.getElementById('context-menu').style.display = 'none';
    if (confirm('Apagar esta conversa?')) {
        const pIdx = window.alvoMenu.indexProj; const cIdx = window.alvoMenu.indexConv;
        window.projetos[pIdx].conversas.splice(cIdx, 1);
        if (window.idProjetoAtivo === pIdx) { if (window.idConversaAtiva === cIdx) { window.idProjetoAtivo=null; window.idConversaAtiva=null; } else if (window.idConversaAtiva > cIdx) window.idConversaAtiva--; }
        window.salvarDadosAtuais(pIdx); window.renderizarSidebar(); window.idProjetoAtivo===null ? window.resetarVisualizacaoChat() : window.renderizarChat();
    }
}

window.deletarProjeto = async function() {
    document.getElementById('context-menu').style.display = 'none';
    if (confirm('Apagar permanentemente o projeto?')) {
        const pIdx = window.alvoMenu.indexProj;
        if (window.usuarioAtual && window.projetos[pIdx].id) await deleteDoc(doc(db, "projetos", window.projetos[pIdx].id));
        else { window.projetos.splice(pIdx, 1); window.salvarDadosAtuais(); }
        if (window.idProjetoAtivo === pIdx) { window.idProjetoAtivo=null; window.idConversaAtiva=null; } else if (window.idProjetoAtivo > pIdx) window.idProjetoAtivo--;
        window.renderizarSidebar(); window.idProjetoAtivo===null ? window.resetarVisualizacaoChat() : window.renderizarChat();
    }
}

// ACORDEÃO E CONFIGURAÇÕES
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

window.togglePersonalizar = function(event) {
    if (event) event.stopPropagation();
    const content = document.getElementById('accordion-personalizar');
    const chevron = document.getElementById('icon-chevron-personalizar');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'flex'; chevron.style.transform = 'rotate(180deg)';
        document.getElementById('label-chat-fs').innerText = window.prefChatFs.toFixed(2);
        document.getElementById('label-code-fs').innerText = window.prefCodeFs.toFixed(2);
        document.getElementById('check-pref-comentado').checked = window.prefComentado;
        window.mudarTamanhoResposta(window.prefDetalhado, true);
    } else {
        content.style.display = 'none'; chevron.style.transform = 'rotate(0deg)';
    }
}

window.ajustarFonte = function(tipo, valor) {
    if (tipo === 'chat') { window.prefChatFs = Math.max(0.7, Math.min(1.5, window.prefChatFs + valor)); document.getElementById('label-chat-fs').innerText = window.prefChatFs.toFixed(2); } 
    else { window.prefCodeFs = Math.max(0.7, Math.min(1.5, window.prefCodeFs + valor)); document.getElementById('label-code-fs').innerText = window.prefCodeFs.toFixed(2); }
    window.salvarPersonalizacao();
    window.aplicarTamanhosFonte(window.prefChatFs, window.prefCodeFs);
}

window.mudarTamanhoResposta = function(detalhado, start = false) {
    window.prefDetalhado = detalhado;
    document.getElementById('label-resp-size').innerText = window.prefDetalhado ? "Detalhadas" : "Curtas";
    document.getElementById('btn-resp-prev').disabled = !window.prefDetalhado;
    document.getElementById('btn-resp-next').disabled = window.prefDetalhado;
    if (!start) window.salvarPersonalizacao();
}

window.salvarPersonalizacao = function() {
    window.prefComentado = document.getElementById('check-pref-comentado').checked;
    localStorage.setItem('unity_pref_chat_fs', window.prefChatFs); localStorage.setItem('unity_pref_code_fs', window.prefCodeFs); localStorage.setItem('unity_pref_comentado', window.prefComentado); localStorage.setItem('unity_pref_detalhado', window.prefDetalhado);
}

window.abrirModalApiKey = () => { document.getElementById('config-menu').style.display = 'none'; document.getElementById('modal-apikey').style.display = 'flex'; }
window.salvarApiKey = async () => { 
    window.userApiKey = document.getElementById('input-api-key').value.trim(); 
    localStorage.setItem('unity_google_api_key', window.userApiKey); 
    if (window.usuarioAtual) { try { await setDoc(doc(db, "usuarios", window.usuarioAtual.uid), { googleApiKey: window.userApiKey }, { merge: true }); } catch(e) {} }
    document.getElementById('modal-apikey').style.display = 'none'; window.atualizarIndicadorApiKey(window.userApiKey); mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); 
}

let configAskToSave = localStorage.getItem('unity_config_ask_save') !== 'false'; document.getElementById('toggle-ask-save').checked = configAskToSave;
window.salvarPreferenciasConfig = () => { configAskToSave = document.getElementById('toggle-ask-save').checked; localStorage.setItem('unity_config_ask_save', configAskToSave); mostrarToast(getMeme('sucesso'), 'rgba(245, 130, 32, 0.9)', SVG_SETTINGS); }

// ==========================================================
// 3. SISTEMA DE ANEXOS E REPLY (RESPONDER)
// ==========================================================
window.atualizarBordasInput = function() {
    const replyCont = document.getElementById('reply-preview-container');
    const anexoCont = document.getElementById('anexo-preview-container');
    const replyAtivo = replyCont && replyCont.style.display === 'flex';
    const anexoAtivo = anexoCont && anexoCont.style.display === 'flex';
    
    if(replyAtivo || anexoAtivo) {
        document.getElementById('main-input-wrapper').style.borderRadius = '0 0 16px 16px';
    } else {
        document.getElementById('main-input-wrapper').style.borderRadius = '16px';
    }
}

window.prepararResposta = function(idx) {
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null) return;
    const msg = window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva].mensagens[idx];
    window.mensagemRespondidaTexto = msg.texto;
    
    const previewContainer = document.getElementById('reply-preview-container');
    const previewText = document.getElementById('reply-preview-text');
    if (previewContainer && previewText) {
        previewText.innerText = msg.texto.substring(0, 80) + (msg.texto.length > 80 ? '...' : '');
        previewContainer.style.display = 'flex';
        window.atualizarBordasInput();
    }
    document.getElementById('mensagem').focus();
}

window.cancelarResposta = function() {
    window.mensagemRespondidaTexto = null;
    const previewContainer = document.getElementById('reply-preview-container');
    if (previewContainer) previewContainer.style.display = 'none';
    window.atualizarBordasInput();
}

window.lidarComAnexo = function(eventOrFile) {
    const file = eventOrFile.target ? eventOrFile.target.files[0] : eventOrFile;
    if (!file) return;
    document.getElementById('btn-anexo').style.opacity = '0.5';
    
    if (file.type.startsWith('image/')) {
        window.anexoTextoConteudo = null; 
        window.redimensionarEComprimirImagem(file, 1024, function(base64Data, mimeType) {
            window.anexoImagemBase64 = base64Data; window.anexoImagemMimeType = mimeType;
            document.getElementById('file-preview').style.display = 'none';
            document.getElementById('image-preview').src = window.anexoImagemBase64;
            document.getElementById('image-preview').style.display = 'block';
            window.mostrarPreviewContainer();
        });
    } else {
        window.anexoImagemBase64 = null; 
        const reader = new FileReader();
        reader.onload = function(e) {
            window.anexoTextoConteudo = e.target.result; window.anexoTextoNome = file.name;
            document.getElementById('image-preview').style.display = 'none';
            document.getElementById('file-name').innerText = window.anexoTextoNome;
            document.getElementById('file-preview').style.display = 'flex';
            window.mostrarPreviewContainer();
        };
        reader.readAsText(file);
    }
}

window.mostrarPreviewContainer = function() {
    document.getElementById('anexo-preview-container').style.display = 'flex';
    window.atualizarBordasInput();
    document.getElementById('btn-anexo').style.opacity = '1'; window.validarInput();
}

window.removerAnexo = function() {
    window.anexoImagemBase64 = null; window.anexoImagemMimeType = null; window.anexoTextoConteudo = null; window.anexoTextoNome = null;
    document.getElementById('input-anexo').value = '';
    document.getElementById('anexo-preview-container').style.display = 'none';
    window.atualizarBordasInput();
    window.validarInput();
}

const dropZone = document.getElementById('main-input-wrapper');
if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (window.idProjetoAtivo !== null && window.idConversaAtiva !== null) dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('drag-over');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('drag-over');
        if (window.idProjetoAtivo === null || window.idConversaAtiva === null) { mostrarToast("Selecione uma conversa primeiro!", 'rgba(245, 130, 32, 0.9)', SVG_WARN); return; }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const validExtensions = ['.cs', '.txt', '.js', '.json'];
            const isValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
            if (file.type.startsWith('image/') || isValidExt) window.lidarComAnexo(file);
            else mostrarToast(window.getMeme('aviso'), 'rgba(245, 130, 32, 0.9)', SVG_WARN);
        }
    });
}

// ==========================================================
// 4. SISTEMA DE CHAT E TELA INICIAL
// ==========================================================
window.resetarVisualizacaoChat = async function() { 
    await window.limparMinhaPresencaGlobal(); 
    window.idProjetoAtivo = null; window.idConversaAtiva = null; document.getElementById('input-container').classList.remove('ativo'); 
    document.getElementById('header-title').innerText = 'ComboBoy Researcher'; document.getElementById('header-subtitle').innerText = ''; 
    document.getElementById('btn-colab').style.display = 'none';
    
    document.getElementById('chat').innerHTML = `
        <div id="sem-conversa-msg" style="margin: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.9; text-align: center; max-width: 500px; padding: 20px;">
            <img src="assets/icons/comboboy.svg" alt="ComboBoy" style="width: 200px; height: 200px; margin-bottom: 10px; filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.5));">
            <h2 style="font-family: 'Alumni Sans SC', sans-serif; font-size: 2.8rem; margin: 0 0 15px 0; font-weight: 700; display:flex; align-items:center; gap:8px;">
                <div><span style="color: #F58220; font-style: italic;">COMBO</span><span style="color: #FFFFFF;">BOY</span></div> 
            </h2>
            <p style="color: #c9d1d9; font-size: 1rem; line-height: 1.5; margin: 0 0 15px 0;">
                Sou um pesquisador de game engines. Por enquanto, meu conhecimento é focado inteiramente no <b>Unity</b>.
            </p>
            <div style="color: #8b949e; font-size: 0.9rem;">Selecione uma conversa ao lado ou crie um novo projeto para começar.</div>
        </div>`; 
        
    const btnIndice = document.getElementById('btn-historico'); if (btnIndice) btnIndice.style.display = 'none';
    if(window.fecharSidebarColab) window.fecharSidebarColab();
    window.renderizarSidebar();
}

window.selecionarConversa = async function(indexProj, indexConv) {
    if (window.idProjetoAtivo !== indexProj || window.idConversaAtiva !== indexConv) {
        await window.limparMinhaPresencaGlobal(); 
    }
    
    window.idProjetoAtivo = indexProj; window.idConversaAtiva = indexConv;
    await window.adicionarPresencaLocal();
    window.cancelarResposta(); // Limpa o reply ao trocar de sala
    
    document.querySelectorAll('.conversa-item').forEach(el => el.classList.remove('ativa'));
    const itemAtivo = document.getElementById(`conv-${indexProj}-${indexConv}`); if (itemAtivo) itemAtivo.classList.add('ativa');
    document.getElementById('input-container').classList.add('ativo');
    const proj = window.projetos[indexProj]; const conv = proj.conversas[indexConv];
    document.getElementById('header-title').innerText = `${proj.nome} / ${conv.nome}`;
    const autorEmail = conv.criador ? conv.criador : (window.usuarioAtual ? window.usuarioAtual.email : 'Visitante');
    document.getElementById('header-subtitle').innerText = `Criado por: ${window.formatarNomeUsuario(autorEmail)}`;
    
    document.getElementById('btn-historico').style.display = 'flex';
    document.getElementById('btn-colab').style.display = 'flex';
    
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebar-backdrop').classList.remove('active');
    }

    window.renderizarChat(); 
    if(window.renderizarChatLateral) window.renderizarChatLateral();
    if(window.renderizarUsuariosNaChamada) window.renderizarUsuariosNaChamada();
    window.atualizarEstadoBotaoEnvio(); 
    window.validarInput();
    if(window.atualizarBotoesChamada) window.atualizarBotoesChamada();
}

window.abrirMenuHistorico = function(event) {
    event.stopPropagation();
    const menu = document.getElementById('historico-menu');
    const btn = document.getElementById('btn-historico').getBoundingClientRect();
    if (menu.style.display === 'block') { menu.style.display = 'none'; }
    else {
        document.getElementById('config-menu').style.display = 'none'; document.getElementById('profile-menu').style.display = 'none'; document.getElementById('notifications-menu').style.display = 'none';
        menu.style.display = 'block'; 
        
        if (window.innerWidth <= 768) {
            menu.style.left = 'auto'; menu.style.right = '15px'; menu.style.transform = 'none';
        } else {
            menu.style.left = (btn.left + (btn.width / 2)) + 'px'; menu.style.transform = 'translateX(-50%)'; 
        }
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
    if (window.idProjetoAtivo === null || !window.projetos[window.idProjetoAtivo] || !window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva]) return;
    const chatBox = document.getElementById('chat'); chatBox.innerHTML = ''; 
    const conversa = window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva];
    
    let indiceHTML = '';

    conversa.mensagens.forEach((msg, idx) => {
        if (msg.papel === 'system') { 
            chatBox.innerHTML += `<div id="msg-wrapper-${idx}" class="system-msg">${msg.texto}</div>`; 
        } else {
            let imgHtml = msg.imagem_url ? `<img src="${msg.imagem_url}" class="balao-imagem">` : '';
            let timeStr = msg.timestamp ? `<span style="font-size: 0.65rem; color: #8b949e; margin-left: 8px; font-weight: normal;">${window.formatarDataHora(msg.timestamp)}</span>` : '';
            
            if (msg.papel === 'aluno') {
                const nomeAutor = msg.autorEmail ? window.formatarNomeUsuario(msg.autorEmail) : (msg.autor || 'Colaborador');
                chatBox.innerHTML += `
                <div id="msg-wrapper-${idx}" style="align-self: flex-end; display: flex; flex-direction: column; align-items: flex-end; max-width: 100%;">
                    <span style="font-size: 0.75rem; color: #8b949e; margin-bottom: 4px; margin-right: 12px; font-weight: 500; display: flex; align-items: center;">${nomeAutor}${timeStr}</span>
                    <div class="balao aluno" style="align-self: flex-end; margin: 0;">${imgHtml}${msg.texto.replace(/\n/g, '<br>')}</div>
                </div>`;
            } else {
                chatBox.innerHTML += `
                <div id="msg-wrapper-${idx}" style="align-self: flex-start; display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
                    <span style="font-size: 0.75rem; color: #F58220; font-weight: 600; margin-bottom: 4px; margin-left: 12px; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px;">
                        ComboBoy ${timeStr}
                        <button onclick="window.prepararResposta(${idx})" style="background:transparent; border:none; color:#8b949e; cursor:pointer; padding:0; display:flex; align-items:center; transition: color 0.2s;" onmouseover="this.style.color='#F58220'" onmouseout="this.style.color='#8b949e'" title="Responder a esta mensagem">${SVG_REPLY}</button>
                    </span>
                    <div class="balao bot" style="margin: 0;">${imgHtml}${window.marked.parse(msg.texto)}</div>
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
                <span id="loading-meme-text" class="meme-text">${window.getMeme('loading')}</span>
                <div class="typing-indicator" style="height: auto; padding: 0;"><span></span><span></span><span></span></div>
            </div>
        </div>`;
        
        if(window.loadingMemeInterval) clearInterval(window.loadingMemeInterval);
        window.loadingMemeInterval = setInterval(() => {
            const el = document.getElementById('loading-meme-text');
            if(el) {
                el.style.opacity = 0; setTimeout(() => { el.innerText = window.getMeme('loading'); el.style.opacity = 1; }, 300);
            } else { clearInterval(window.loadingMemeInterval); }
        }, 3500);

    } else {
        if(window.loadingMemeInterval) clearInterval(window.loadingMemeInterval);
    }
    
    window.formatarBlocosDeCodigo(); chatBox.scrollTop = chatBox.scrollHeight;
}

window.validarInput = function() {
    const input = document.getElementById('mensagem'); const btn = document.getElementById('btn-acao');
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null) return;
    const conv = window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva];
    
    if (!conv?.processando) { btn.disabled = input.value.trim().length === 0 && !window.anexoImagemBase64 && !window.anexoTextoConteudo; } 
    else { btn.disabled = false; }
}

window.atualizarEstadoBotaoEnvio = function() {
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null) return;
    const btn = document.getElementById('btn-acao'); const iconSend = document.getElementById('icon-send'); const iconStop = document.getElementById('icon-stop');
    const conv = window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva];

    if (conv?.processando) {
        btn.classList.remove('enviar'); btn.classList.add('stop'); btn.disabled = false; iconSend.style.display = 'none'; iconStop.style.display = 'block'; btn.title = "Cancelar Resposta";
    } else {
        btn.classList.remove('stop'); btn.classList.add('enviar'); iconStop.style.display = 'none'; iconSend.style.display = 'block'; btn.title = "Enviar"; window.validarInput();
    }
}

window.lidarComAcao = function() {
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null) return;
    const pIdx = window.idProjetoAtivo; const cIdx = window.idConversaAtiva;
    const chave = `${pIdx}_${cIdx}`; 
    const conv = window.projetos[pIdx].conversas[cIdx];

    if (conv?.processando) {
        if (window.statusConversas[chave] && window.statusConversas[chave].controller) {
            window.statusConversas[chave].controller.abort(); window.projetos[pIdx].conversas[cIdx].processando = false; window.salvarDadosAtuais(pIdx); window.renderizarChat(); window.atualizarEstadoBotaoEnvio();
        } else { mostrarToast(window.getMeme('aviso'), 'rgba(245, 130, 32, 0.9)', SVG_WARN); }
    } else { window.enviarMensagem(); }
}

// ==========================================================
// INJEÇÃO DA PERSONA, MEMÓRIA E ENVIO PARA O BACKEND
// ==========================================================
window.enviarMensagem = async function() {
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null) return;
    const pIdx = window.idProjetoAtivo; const cIdx = window.idConversaAtiva;
    const proj = window.projetos[pIdx]; const chave = `${pIdx}_${cIdx}`;
    
    if (proj.conversas[cIdx].processando) return;

    const input = document.getElementById('mensagem'); let textoDigitado = input.value.trim(); let textoFinal = textoDigitado;
    
    if (window.anexoTextoConteudo) {
        const ext = window.anexoTextoNome.split('.').pop().toLowerCase(); const linguagemMarkdown = (ext === 'cs') ? 'csharp' : ext; const quebraLinha = textoDigitado ? '\n\n' : '';
        textoFinal += `${quebraLinha}📄 **Arquivo Anexado (${window.anexoTextoNome}):**\n\`\`\`${linguagemMarkdown}\n${window.anexoTextoConteudo}\n\`\`\``;
    }
    
    const imgBase64 = window.anexoImagemBase64; const imgMime = window.anexoImagemMimeType;
    if(!textoFinal && !imgBase64) return;

    const autorNome = window.usuarioAtual ? (window.usuarioAtual.displayName || window.formatarNomeUsuario(window.usuarioAtual.email)) : 'Visitante';
    const autorEmail = window.usuarioAtual ? window.usuarioAtual.email : null;
    
    const novaMsg = { papel: 'aluno', texto: textoFinal, autor: autorNome, autorEmail: autorEmail, timestamp: Date.now() }; 
    if (imgBase64) novaMsg.imagem_url = imgBase64; 
    
    proj.conversas[cIdx].mensagens.push(novaMsg);
    
    if (proj.conversas[cIdx].mensagens.length === 2) {
        if (textoDigitado) proj.conversas[cIdx].nome = textoDigitado.substring(0, 25) + (textoDigitado.length > 25 ? "..." : "");
        else if (window.anexoTextoNome) proj.conversas[cIdx].nome = `Análise: ${window.anexoTextoNome}`;
        else proj.conversas[cIdx].nome = "Análise de Imagem";
    }
    
    window.removerAnexo(); proj.conversas[cIdx].processando = true; window.salvarDadosAtuais(pIdx); 
    input.value = ''; input.style.height = 'auto'; window.renderizarSidebar(); 
    if (window.idProjetoAtivo === pIdx && window.idConversaAtiva === cIdx) { window.renderizarChat(); window.atualizarEstadoBotaoEnvio(); }

    const controller = new AbortController(); window.statusConversas[chave] = { ativa: true, controller: controller };

    // --- CONTEXT INJECTION (MEMÓRIA DAS ÚLTIMAS 6 MENSAGENS) ---
    const mensagensAnteriores = proj.conversas[cIdx].mensagens.slice(0, -1).filter(m => m.papel !== 'system').slice(-6);
    let contextoHistorico = "";
    if (mensagensAnteriores.length > 0) {
        contextoHistorico = "\n\n[CONTEXTO DE MEMÓRIA DAS ÚLTIMAS MENSAGENS]:\n" + 
            mensagensAnteriores.map(m => `${m.papel === 'aluno' ? 'Usuário' : 'ComboBoy'}: ${m.texto}`).join('\n\n');
    }

    // --- REPLY INJECTION ---
    let trechoResposta = "";
    if (window.mensagemRespondidaTexto) {
        trechoResposta = `\n\n[ATENÇÃO: O USUÁRIO ESTÁ RESPONDENDO DIRETAMENTE A ESTE TRECHO ESPECÍFICO GERADO POR VOCÊ ANTERIORMENTE]:\n"${window.mensagemRespondidaTexto}"\n\nBaseie-se fortemente nesse trecho para atender ao pedido do usuário abaixo.\n\n`;
        window.cancelarResposta();
    }

    // --- INJEÇÃO DA PERSONA ---
    let instrucaoNivel = "";
    if (window.perfilGlobalData.nivel === 'chupetinha') {
        instrucaoNivel = "Aja como se eu fosse uma criança de 10 anos que não sabe absolutamente nada de programação ou Unity. Explique tudo de forma extremamente simples e muito didática.";
    } else if (window.perfilGlobalData.nivel === 'nextagebb') {
        instrucaoNivel = "Aja como se eu fosse um Pro Player sênior na indústria de jogos. Use termos técnicos avançados e foque em arquitetura limpa, performance de alto nível e projetos AAA.";
    } else {
        instrucaoNivel = "Aja como se eu fosse um desenvolvedor que já fez pequenos projetos e conhece um pouco de programação.";
    }
    let instrucaoChaves = window.prefComentado ? " REGRA ESTrita: VOCÊ É PROIBIDO de inserir comentários em linhas que contêm apenas chaves isoladas (ex: nunca comente apenas '}')." : "";
    
    let promptInjetado = `[INSTRUÇÃO DE PERSONA: ${instrucaoNivel}${instrucaoChaves}]${contextoHistorico}${trechoResposta}\n\n[PERGUNTA ATUAL DO USUÁRIO]:\n${textoFinal}`;

    try {
        const headers = { 'Content-Type': 'application/json' };
        if (window.usuarioAtual) { headers['Authorization'] = `Bearer ${await window.usuarioAtual.getIdToken(true)}`; if (window.userApiKey) headers['x-google-api-key'] = window.userApiKey; }

        const payload = { 
            texto: promptInjetado, detalhado: window.prefDetalhado, codigo_comentado: window.prefComentado, profissao: window.perfilGlobalData.profissao, tags: window.perfilGlobalData.tags,
            projeto_nome: proj.nome || "", projeto_genero: proj.genero || "", projeto_descricao: proj.descricao || ""
        };
        if (imgBase64) { payload.imagem_base64 = imgBase64; payload.mime_type = imgMime; }

        const res = await fetch('https://chatbot-unity.onrender.com/api/chat', { method: 'POST', headers: headers, body: JSON.stringify(payload), signal: controller.signal });
        if (!window.projetos[pIdx] || !window.projetos[pIdx].conversas[cIdx]) return; 

        if (res.status === 429) { window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'system', texto: `${SVG_CLOCK} Fomos nerfados! Limite atingido.` }); } 
        else if (!res.ok) { let detalheErro = "Falha no Servidor"; try { const body = await res.json(); detalheErro = body.detail || detalheErro; } catch(e){} throw new Error(detalheErro); } 
        else { const dados = await res.json(); window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'bot', texto: dados.resposta, timestamp: Date.now() }); }
    } catch (e) {
        if (window.projetos[pIdx] && window.projetos[pIdx].conversas[cIdx]) { window.projetos[pIdx].conversas[cIdx].mensagens.push({ papel: 'system', texto: `${SVG_WARN} ${e.name === 'AbortError' ? 'Miss click? Ação cancelada.' : 'Erro: ' + e.message}` }); }
    } finally {
        if (window.projetos[pIdx] && window.projetos[pIdx].conversas[cIdx]) { window.projetos[pIdx].conversas[cIdx].processando = false; window.salvarDadosAtuais(pIdx); }
        if (window.statusConversas[chave]) window.statusConversas[chave].ativa = false;
        window.renderizarSidebar(); if (window.idProjetoAtivo === pIdx && window.idConversaAtiva === cIdx) { window.renderizarChat(); window.atualizarEstadoBotaoEnvio(); }
    }
}

// ==========================================================
// 5. LÓGICA DO TOUR E MOBILE SWIPE
// ==========================================================
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

document.addEventListener('touchend', e => {
    if (window.innerWidth > 768) return;
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    if (Math.abs(touchEndY - touchStartY) > Math.abs(touchEndX - touchStartX)) return;
    if (e.target.closest('pre') || e.target.closest('code') || e.target.type === 'range') return;

    const swipeDist = touchEndX - touchStartX;
    const sidebarL = document.getElementById('sidebar');
    const sidebarR = document.getElementById('sidebar-right');
    const backdrop = document.querySelector('.sidebar-backdrop');
    
    if (swipeDist > 70) { 
        if (sidebarR.classList.contains('open')) {
            if(window.fecharSidebarColab) window.fecharSidebarColab();
        } else {
            sidebarL.classList.add('open');
            backdrop.classList.add('active');
        }
    } else if (swipeDist < -70) { 
        if (sidebarL.classList.contains('open')) {
            if(window.alternarSidebar) window.alternarSidebar();
        } else if (window.idProjetoAtivo !== null && window.toggleSidebarColab) {
            sidebarR.classList.add('open');
            if(window.renderizarChatLateral) window.renderizarChatLateral();
        }
    }
}, {passive: true});

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
        text: "Aqui você cria pastas de projetos e organiza conversas. Seus projetos ficam salvos na nuvem. Você também pode arrastar e soltar conversas!" 
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
        target: "btn-colab", 
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        title: "Área de Colaboração", 
        text: "Compartilhe tela, faça chat de voz e de texto diretamente com seus colaboradores, sem latência!" 
    }
];

window.iniciarTour = function() {
    window.currentTourStep = 0;
    document.getElementById('config-menu').style.display = 'none';
    if(window.innerWidth <= 768) { document.getElementById('sidebar').classList.add('open'); }
    
    document.getElementById('btn-colab').style.display = 'flex'; 

    document.getElementById('tour-overlay').style.display = 'block';
    window.renderizarStepTour();
}

window.renderizarStepTour = function() {
    const step = tourSteps[window.currentTourStep];
    
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    document.querySelectorAll('.tour-highlight-parent').forEach(el => el.classList.remove('tour-highlight-parent'));
    
    const card = document.getElementById('tour-card');
    card.style.display = 'block';
    
    document.getElementById('tour-title').innerHTML = `<span style="display:flex; align-items:center; justify-content:center; gap:8px; color: #F58220;">${step.icon} ${step.title}</span>`;
    document.getElementById('tour-text').innerText = step.text;
    document.getElementById('tour-btn-next').innerText = window.currentTourStep === tourSteps.length - 1 ? "Finalizar" : "Avançar";
    
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
    if (window.currentTourStep < tourSteps.length - 1) {
        window.currentTourStep++; window.renderizarStepTour();
    } else { window.fecharTour(); }
}

window.fecharTour = function() {
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    document.querySelectorAll('.tour-highlight-parent').forEach(el => el.classList.remove('tour-highlight-parent'));
    document.getElementById('tour-overlay').style.display = 'none';
    document.getElementById('tour-card').style.display = 'none';
    localStorage.setItem('comboboy_tour', 'true');
    if(window.innerWidth <= 768) { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebar-backdrop').classList.remove('active');}
    if(window.idProjetoAtivo === null) document.getElementById('btn-colab').style.display = 'none';
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