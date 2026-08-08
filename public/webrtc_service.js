import { SVG_WARN, SVG_SETTINGS, mostrarToast } from './utils.js';

let meuPeer = null;
let streamLocalAudio = null;
let streamLocalVideo = null;
let chamadasAtivas = {};
let peerConfigurado = false;

window.chatScope = 'local';
window.selectedAudioInput = '';
window.selectedAudioOutput = '';

// ==========================================================
// CHAT LATERAL DE EQUIPE (TEXTO)
// ==========================================================
window.toggleSidebarColab = function() {
    const sidebarR = document.getElementById('sidebar-right');
    sidebarR.classList.toggle('open');
    if(sidebarR.classList.contains('open')) window.renderizarChatLateral();
}

window.fecharSidebarColab = function() { document.getElementById('sidebar-right').classList.remove('open'); }

window.toggleChatScope = function() {
    const btn = document.getElementById('btn-chat-scope');
    if(window.chatScope === 'local') {
        window.chatScope = 'global';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F58220" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
        btn.title = "Enviando para: Todas as Salas";
        mostrarToast("Modo Global Ativado", "rgba(245, 130, 32, 0.9)", "");
    } else {
        window.chatScope = 'local';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b949e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
        btn.title = "Enviando para: Sala Atual";
        mostrarToast("Modo Sala Atual", "rgba(245, 130, 32, 0.9)", "");
    }
}

window.renderizarChatLateral = function() {
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null || !window.projetos[window.idProjetoAtivo]) return;
    const container = document.getElementById('chat-lateral-msgs');
    const conv = window.projetos[window.idProjetoAtivo].conversas[window.idConversaAtiva];
    if (!conv.chatLateral) conv.chatLateral = [];
    
    container.innerHTML = '';
    if(conv.chatLateral.length === 0) {
        container.innerHTML = `<div style="text-align:center; color:#8b949e; font-size:0.8rem; margin-top: 20px;">Nenhuma mensagem na equipe.</div>`;
        return;
    }

    conv.chatLateral.forEach(msg => {
        const souEu = window.usuarioAtual && msg.email === window.usuarioAtual.email;
        const badgeGlobal = msg.isGlobal ? `<span style="font-size:0.55rem; background:#F58220; color:white; padding:2px 4px; border-radius:4px; margin-left:4px;">GLOBAL</span>` : '';
        const timeStr = msg.timestamp ? `<span style="font-size:0.6rem; color:#6e7681; margin-left:6px; font-weight: normal;">${window.formatarDataHora(msg.timestamp)}</span>` : '';
        
        container.innerHTML += `
            <div style="display:flex; flex-direction:column; gap:2px; ${souEu ? 'align-items:flex-end;' : 'align-items:flex-start;'}">
                <span style="font-size:0.65rem; color:#8b949e; padding: 0 4px; display:flex; align-items:center;">
                    ${window.formatarNomeUsuario(msg.email)} ${badgeGlobal} ${timeStr}
                </span>
                <div class="balao-lateral ${souEu ? 'eu' : 'outro'}">${msg.texto}</div>
            </div>`;
    });
    container.scrollTop = container.scrollHeight;
}

window.enviarMensagemLateral = function() {
    if (!window.usuarioAtual || window.idProjetoAtivo === null || window.idConversaAtiva === null) return;
    const input = document.getElementById('input-lateral');
    const texto = input.value.trim();
    if(!texto) return;

    const proj = window.projetos[window.idProjetoAtivo];
    
    if(window.chatScope === 'global') {
        proj.conversas.forEach(c => {
            if (!c.chatLateral) c.chatLateral = [];
            c.chatLateral.push({ email: window.usuarioAtual.email, texto: texto, timestamp: Date.now(), isGlobal: true });
        });
    } else {
        if (!proj.conversas[window.idConversaAtiva].chatLateral) proj.conversas[window.idConversaAtiva].chatLateral = [];
        proj.conversas[window.idConversaAtiva].chatLateral.push({ email: window.usuarioAtual.email, texto: texto, timestamp: Date.now() });
    }

    window.salvarDadosAtuais(window.idProjetoAtivo); input.value = ''; window.renderizarChatLateral();
}

window.renderizarUsuariosNaChamada = function() {
    const container = document.getElementById('active-call-users');
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null || !window.projetos[window.idProjetoAtivo]) {
        container.style.display = 'none'; return;
    }
    
    const proj = window.projetos[window.idProjetoAtivo];
    const chamadaAtiva = proj.conversas[window.idConversaAtiva].chamada || {};
    const emailsNaChamada = Object.keys(chamadaAtiva);

    if (emailsNaChamada.length > 0) {
        container.style.display = 'flex';
        container.innerHTML = '';
        emailsNaChamada.forEach(email => {
            const nome = window.formatarNomeUsuario(email);
            const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=21262d&color=c9d1d9&rounded=true`;
            container.innerHTML += `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;" title="${nome}">
                    <img src="${avatar}" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid #2ea043; object-fit: cover;">
                    <span style="font-size: 0.65rem; color: #c9d1d9; max-width: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${nome}</span>
                </div>`;
        });
    } else { container.style.display = 'none'; }
};

// ==========================================================
// SELEÇÃO DE DISPOSITIVOS (MICROFONE/FONES)
// ==========================================================
window.abrirModalDevices = async function() {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const selInput = document.getElementById('select-mic');
        const selOutput = document.getElementById('select-speaker');
        selInput.innerHTML = ''; selOutput.innerHTML = '';
        
        devices.forEach(d => {
            if(d.kind === 'audioinput') {
                const opt = document.createElement('option');
                opt.value = d.deviceId; opt.text = d.label || `Microfone ${selInput.length + 1}`;
                if(d.deviceId === window.selectedAudioInput) opt.selected = true;
                selInput.appendChild(opt);
            } else if(d.kind === 'audiooutput') {
                const opt = document.createElement('option');
                opt.value = d.deviceId; opt.text = d.label || `Alto-falante ${selOutput.length + 1}`;
                if(d.deviceId === window.selectedAudioOutput) opt.selected = true;
                selOutput.appendChild(opt);
            }
        });
        document.getElementById('modal-devices').style.display = 'flex';
    } catch(e) {
        mostrarToast("Permita o uso do microfone primeiro.", "rgba(218, 54, 51, 0.9)", SVG_WARN);
    }
}

window.salvarDevices = async function() {
    window.selectedAudioInput = document.getElementById('select-mic').value;
    window.selectedAudioOutput = document.getElementById('select-speaker').value;
    
    const audios = document.querySelectorAll('audio');
    audios.forEach(async a => {
        if(a.setSinkId && window.selectedAudioOutput) {
            try { await a.setSinkId(window.selectedAudioOutput); } catch(e){}
        }
    });
    
    if(streamLocalAudio) {
        streamLocalAudio.getTracks().forEach(t => t.stop());
        try {
            streamLocalAudio = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: window.selectedAudioInput ? { exact: window.selectedAudioInput } : undefined } });
            const newAudioTrack = streamLocalAudio.getAudioTracks()[0];
            if(!document.getElementById('btn-call-mic').classList.contains('active')) {
                newAudioTrack.enabled = false;
            }
            Object.values(chamadasAtivas).forEach(call => {
                const sender = call.peerConnection.getSenders().find(s => s.track && s.track.kind === 'audio');
                if(sender) sender.replaceTrack(newAudioTrack);
            });
        } catch(e){}
    }
    document.getElementById('modal-devices').style.display = 'none';
    mostrarToast("Dispositivos atualizados", "rgba(46, 204, 113, 0.9)", SVG_SETTINGS);
}

// ==========================================================
// MOTOR WEBRTC P2P - VOZ E TELA (RACE CONDITION PROOF)
// ==========================================================
window.atualizarBotoesChamada = function() {
    if (window.idProjetoAtivo === null || window.idConversaAtiva === null || !window.projetos[window.idProjetoAtivo]) return;
    const proj = window.projetos[window.idProjetoAtivo];
    const telaAtual = proj.conversas[window.idConversaAtiva].tela;
    const btnScreen = document.getElementById('btn-call-screen');
    
    if (telaAtual && telaAtual !== window.usuarioAtual.email) {
        btnScreen.disabled = true;
        btnScreen.style.opacity = '0.4';
        btnScreen.title = `Tela sendo compartilhada por ${window.formatarNomeUsuario(telaAtual)}`;
    } else {
        btnScreen.disabled = !peerConfigurado;
        btnScreen.style.opacity = peerConfigurado ? '1' : '0.4';
        btnScreen.title = "Compartilhar Tela";
    }
}

window.inicializarPeer = function() {
    if(meuPeer) return;
    meuPeer = new Peer();
    
    meuPeer.on('open', (id) => {
        peerConfigurado = true;
        document.getElementById('btn-call-mic').disabled = false;
        document.getElementById('btn-call-join').classList.add('danger');
        document.getElementById('btn-call-join').innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>`;
        
        window.atualizarBotoesChamada();

        if (window.idProjetoAtivo !== null && window.projetos[window.idProjetoAtivo]) {
            const proj = window.projetos[window.idProjetoAtivo];
            proj.conversas[window.idConversaAtiva].chamada = proj.conversas[window.idConversaAtiva].chamada || {};
            proj.conversas[window.idConversaAtiva].chamada[window.usuarioAtual.email] = id;
            window.salvarDadosAtuais(window.idProjetoAtivo);
        }
        window.verificarNovosPeers();
    });

    meuPeer.on('call', (call) => {
        let mediaCombinada = new MediaStream();
        if(streamLocalAudio) streamLocalAudio.getTracks().forEach(t => mediaCombinada.addTrack(t));
        if(streamLocalVideo) streamLocalVideo.getTracks().forEach(t => mediaCombinada.addTrack(t));
        
        call.answer(mediaCombinada); 
        chamadasAtivas[call.peer] = call;
        call.on('stream', (streamRemoto) => { window.gerenciarMediaRemota(streamRemoto, call.peer); });
        call.on('close', () => window.limparMediaRemota(call.peer));
    });
}

window.toggleChamada = async function() {
    if (!window.usuarioAtual) return;
    if (peerConfigurado) {
        window.sairDaChamada(false);
    } else {
        try {
            streamLocalAudio = await navigator.mediaDevices.getUserMedia({ audio: window.selectedAudioInput ? { deviceId: { exact: window.selectedAudioInput } } : true });
            document.getElementById('btn-call-mic').classList.add('active');
            window.inicializarPeer();
        } catch(e) { mostrarToast("Permissão de microfone negada.", 'rgba(218, 54, 51, 0.9)', SVG_WARN); }
    }
}

window.sairDaChamada = function(force = false) {
    if (streamLocalAudio) { streamLocalAudio.getTracks().forEach(t => t.stop()); streamLocalAudio = null; }
    if (streamLocalVideo) { streamLocalVideo.getTracks().forEach(t => t.stop()); streamLocalVideo = null; }
    
    Object.values(chamadasAtivas).forEach(call => call.close());
    chamadasAtivas = {};
    
    if(meuPeer) meuPeer.destroy();
    meuPeer = null; peerConfigurado = false;
    document.getElementById('stage-container').style.display = 'none';
    document.getElementById('stage-container').innerHTML = '';
    
    document.getElementById('btn-call-mic').disabled = true;
    document.getElementById('btn-call-screen').disabled = true;
    document.getElementById('btn-call-mic').classList.remove('active');
    document.getElementById('btn-call-screen').classList.remove('active');
    document.getElementById('btn-call-join').classList.remove('danger');
    document.getElementById('btn-call-join').innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;

    if (!force && window.idProjetoAtivo !== null && window.projetos[window.idProjetoAtivo]) {
        const proj = window.projetos[window.idProjetoAtivo];
        if (proj.conversas[window.idConversaAtiva] && proj.conversas[window.idConversaAtiva].tela === window.usuarioAtual.email) {
            proj.conversas[window.idConversaAtiva].tela = null;
        }
        if (proj.conversas[window.idConversaAtiva] && proj.conversas[window.idConversaAtiva].chamada && proj.conversas[window.idConversaAtiva].chamada[window.usuarioAtual.email]) {
            delete proj.conversas[window.idConversaAtiva].chamada[window.usuarioAtual.email];
        }
        window.salvarDadosAtuais(window.idProjetoAtivo);
        window.atualizarBotoesChamada();
    }
}

window.toggleAudio = function() {
    if (!streamLocalAudio) return;
    const audioTrack = streamLocalAudio.getAudioTracks()[0];
    if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        const btn = document.getElementById('btn-call-mic');
        if (audioTrack.enabled) {
            btn.classList.add('active'); btn.classList.remove('danger');
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
        } else {
            btn.classList.remove('active'); btn.classList.add('danger');
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 1.67M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
        }
    }
}

window.compartilharTela = async function() {
    if (!peerConfigurado) return;
    const proj = window.projetos[window.idProjetoAtivo];
    const telaAtual = proj.conversas[window.idConversaAtiva].tela;

    try {
        if (!streamLocalVideo) {
            if(telaAtual && telaAtual !== window.usuarioAtual.email) {
                mostrarToast("Outro usuário já está compartilhando.", "rgba(218, 54, 51, 0.9)", SVG_WARN); return;
            }
            
            streamLocalVideo = await navigator.mediaDevices.getDisplayMedia({ video: true });
            document.getElementById('btn-call-screen').classList.add('active');
            
            proj.conversas[window.idConversaAtiva].tela = window.usuarioAtual.email;
            window.salvarDadosAtuais(window.idProjetoAtivo);

            streamLocalVideo.getVideoTracks()[0].onended = () => window.compartilharTela();
            window.atualizarStreamsP2P();
        } else {
            streamLocalVideo.getTracks().forEach(t => t.stop());
            streamLocalVideo = null;
            document.getElementById('btn-call-screen').classList.remove('active');
            
            proj.conversas[window.idConversaAtiva].tela = null;
            window.salvarDadosAtuais(window.idProjetoAtivo);

            window.limparMediaRemota(meuPeer.id, true);
            window.atualizarStreamsP2P();
        }
    } catch(e) {}
}

window.atualizarStreamsP2P = function() {
    let combinedStream = new MediaStream();
    if(streamLocalAudio) streamLocalAudio.getTracks().forEach(t => combinedStream.addTrack(t));
    if(streamLocalVideo) streamLocalVideo.getTracks().forEach(t => combinedStream.addTrack(t));
    
    const oldLocal = document.getElementById(`video-${meuPeer.id}`);
    if(oldLocal) oldLocal.remove();
    
    if(streamLocalVideo) window.gerenciarMediaRemota(combinedStream, meuPeer.id, true);

    if (window.idProjetoAtivo === null || !window.projetos[window.idProjetoAtivo]) return;
    const proj = window.projetos[window.idProjetoAtivo];
    const chamadaAtiva = proj.conversas[window.idConversaAtiva].chamada || {};
    
    // DEBOUNCE OTIMIZADO
    Object.values(chamadasAtivas).forEach(c => c.close());
    chamadasAtivas = {};
    document.getElementById('stage-container').innerHTML = ''; 
    if(streamLocalVideo) window.gerenciarMediaRemota(combinedStream, meuPeer.id, true); 

    setTimeout(() => {
        Object.entries(chamadaAtiva).forEach(([email, peerIdRemoto]) => {
            if (email !== window.usuarioAtual.email) {
                const call = meuPeer.call(peerIdRemoto, combinedStream);
                if (call) {
                    chamadasAtivas[peerIdRemoto] = call;
                    call.on('stream', (streamRemoto) => window.gerenciarMediaRemota(streamRemoto, peerIdRemoto));
                    call.on('close', () => window.limparMediaRemota(peerIdRemoto));
                }
            }
        });
    }, 1000); 
}

window.verificarNovosPeers = function() {
    if (!peerConfigurado || window.idProjetoAtivo === null) return;
    const proj = window.projetos[window.idProjetoAtivo];
    const chamadaAtiva = proj.conversas[window.idConversaAtiva].chamada || {};
    
    let combinedStream = new MediaStream();
    if(streamLocalAudio) streamLocalAudio.getTracks().forEach(t => combinedStream.addTrack(t));
    if(streamLocalVideo) streamLocalVideo.getTracks().forEach(t => combinedStream.addTrack(t));

    Object.entries(chamadaAtiva).forEach(([email, peerIdRemoto]) => {
        if (email !== window.usuarioAtual.email && !chamadasAtivas[peerIdRemoto]) {
            const call = meuPeer.call(peerIdRemoto, combinedStream);
            if (call) {
                chamadasAtivas[peerIdRemoto] = call;
                call.on('stream', (streamRemoto) => window.gerenciarMediaRemota(streamRemoto, peerIdRemoto));
                call.on('close', () => window.limparMediaRemota(peerIdRemoto));
            }
        }
    });
}

window.gerenciarMediaRemota = function(stream, peerId, isLocal = false) {
    const hasVideo = stream.getVideoTracks().length > 0;
    
    // Áudio Invisível
    let audioEl = document.getElementById(`audio-${peerId}`);
    if (!audioEl) {
        audioEl = document.createElement('audio');
        audioEl.id = `audio-${peerId}`;
        audioEl.autoplay = true;
        if(isLocal) audioEl.muted = true;
        if(window.selectedAudioOutput && audioEl.setSinkId) audioEl.setSinkId(window.selectedAudioOutput).catch(e=>{});
        document.body.appendChild(audioEl);
    }
    if(audioEl.srcObject !== stream) audioEl.srcObject = stream;

    // Vídeo e Stage
    const stage = document.getElementById('stage-container');
    let videoWrapper = document.getElementById(`video-${peerId}`);

    if (hasVideo) {
        stage.style.display = 'flex';
        
        if (!videoWrapper) {
            videoWrapper = document.createElement('div');
            videoWrapper.className = 'video-wrapper';
            videoWrapper.id = `video-${peerId}`;
            
            const videoEl = document.createElement('video');
            videoEl.autoplay = true; 
            videoEl.playsInline = true; 
            videoEl.muted = true; 
            
            videoEl.addEventListener('loadedmetadata', () => { videoEl.play().catch(e=>console.warn(e)); });
            
            let userEmailStr = 'Colaborador';
            if (isLocal) { userEmailStr = 'Você (Transmitindo)'; } 
            else {
                const proj = window.projetos[window.idProjetoAtivo];
                const chamada = proj.conversas[window.idConversaAtiva].chamada || {};
                const email = Object.keys(chamada).find(key => chamada[key] === peerId);
                if (email) userEmailStr = window.formatarNomeUsuario(email);
            }
            
            const tag = document.createElement('div');
            tag.className = 'video-tag'; tag.innerText = userEmailStr;
            
            const controls = document.createElement('div');
            controls.className = 'video-controls';
            let htmlControles = '';
            
            if (!isLocal) {
                htmlControles += `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:white; margin-left:8px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    <input type="range" class="vol-slider" min="0" max="1" step="0.05" value="1" title="Volume da Chamada">`;
            }

            htmlControles += `
                <button class="ctrl-btn fs-btn" title="Tela Cheia">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                </button>`;
            controls.innerHTML = htmlControles;
            
            if (!isLocal) {
                controls.querySelector('.vol-slider').addEventListener('input', (e) => { audioEl.volume = e.target.value; });
            }

            controls.querySelector('.fs-btn').addEventListener('click', () => {
                if (!document.fullscreenElement) videoWrapper.requestFullscreen().catch(err => console.log(err));
                else document.exitFullscreen();
            });
            
            videoWrapper.appendChild(videoEl); videoWrapper.appendChild(tag); videoWrapper.appendChild(controls);
            stage.appendChild(videoWrapper);
        }
        
        const vEl = videoWrapper.querySelector('video');
        if (vEl.srcObject !== stream) vEl.srcObject = stream;
        
    } else {
        if (videoWrapper) videoWrapper.remove();
        if (stage.children.length === 0) stage.style.display = 'none';
    }

    stream.onaddtrack = () => window.gerenciarMediaRemota(stream, peerId, isLocal);
    stream.onremovetrack = () => window.gerenciarMediaRemota(stream, peerId, isLocal);
}

window.limparMediaRemota = function(peerId, keepAudio = false) {
    const elVid = document.getElementById(`video-${peerId}`);
    if(elVid) elVid.remove();
    
    if(!keepAudio) {
        const elAud = document.getElementById(`audio-${peerId}`);
        if(elAud) elAud.remove();
    }
    
    const stage = document.getElementById('stage-container');
    if(stage && stage.children.length === 0) stage.style.display = 'none';
}