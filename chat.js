// --- ДАННЫЕ И СОСТОЯНИЕ ---
const state = {
    currentChatId: null,
    chats: [
        { 
            id: 1, name: "Алекс (Курьер)", color: "#ff5722", status: "в сети",
            messages: [{ text: "Пицца у меня, скоро буду.", time: "12:40", type: "received" }]
        },
        { 
            id: 2, name: "Компаньон", color: "#4caf50", status: "был(а) недавно",
            messages: [{ text: "Обнаружена активность в районе порта. Будь осторожен.", time: "03:33", type: "received" }]
        },
        { 
            id: 3, name: "BeamChat Support", color: "#2196f3", status: "в сети",
            messages: [{ text: "Добро пожаловать в BeamChat! Настройте свой профиль.", time: "10:00", type: "received" }]
        }
    ]
};

// --- ЭЛЕМЕНТЫ UI ---
const chatList = document.getElementById('chatList');
const messagesContainer = document.getElementById('messagesContainer');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const chatStatus = document.querySelector('.chat-status');

// --- ЛОГИКА ЧАТОВ ---
function init() {
    renderChatList();
    // Автоматически выбираем первый чат при загрузке
    selectChat(state.chats[0].id);
}

function renderChatList() {
    chatList.innerHTML = state.chats.map(chat => {
        const lastMsg = chat.messages[chat.messages.length - 1];
        return `
            <div class="chat-item ${state.currentChatId === chat.id ? 'active' : ''}" onclick="selectChat(${chat.id})">
                <div class="avatar" style="background:${chat.color}">${chat.name[0]}</div>
                <div class="info">
                    <div class="name">${chat.name}</div>
                    <div class="last-msg">${lastMsg ? lastMsg.text : ''}</div>
                </div>
            </div>
        `;
    }).join('');
}

window.selectChat = (id) => {
    state.currentChatId = id;
    const chat = state.chats.find(c => c.id === id);
    
    // Обновляем шапку
    document.getElementById('currentChatName').innerText = chat.name;
    document.getElementById('currentAvatar').innerText = chat.name[0];
    document.getElementById('currentAvatar').style.background = chat.color;
    chatStatus.innerText = chat.status;

    renderMessages();
    renderChatList(); // Чтобы обновить активный класс
};

// --- ЛОГИКА СООБЩЕНИЙ ---
function renderMessages() {
    const chat = state.chats.find(c => c.id === state.currentChatId);
    messagesContainer.innerHTML = chat.messages.map(m => `
        <div class="bubble ${m.type}">
            ${m.text}
            <span class="msg-time">${m.time} ${m.type === 'sent' ? '✓✓' : ''}</span>
        </div>
    `).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const text = msgInput.value.trim();
    if (!text || !state.currentChatId) return;

    const chat = state.chats.find(c => c.id === state.currentChatId);
    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');

    // Добавляем наше сообщение
    chat.messages.push({ text, time: timeStr, type: "sent" });
    msgInput.value = '';
    renderMessages();
    renderChatList();

    // Имитация ответа
    simulateResponse(chat);
}

function simulateResponse(chat) {
    chatStatus.innerText = "печатает...";
    chatStatus.style.color = "#3390ec";

    setTimeout(() => {
        const now = new Date();
        const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
        
        let responseText = "Интересно. Расскажи подробнее?";
        if (chat.id === 2) responseText = "Сигнал нестабилен. Код ошибки 333.";
        
        chat.messages.push({ text: responseText, time: timeStr, type: "received" });
        chatStatus.innerText = "в сети";
        chatStatus.style.color = "";
        
        if (state.currentChatId === chat.id) renderMessages();
        renderChatList();
    }, 2000);
}

// --- СОБЫТИЯ ---
sendBtn.onclick = sendMessage;
msgInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };

init();
