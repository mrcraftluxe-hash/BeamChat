const chats = [
    { id: 1, name: "Алекс (Курьер)", lastMsg: "Пицца доставлена?", color: "#ff5722" },
    { id: 2, name: "Компаньон", lastMsg: "Обнаружена активность в 3:33", color: "#4caf50" },
    { id: 3, name: "Разработка BeamChat", lastMsg: "Код готов к деплою", color: "#2196f3" }
];

const chatList = document.getElementById('chatList');
const messagesContainer = document.getElementById('messagesContainer');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

// Рендер списка чатов
function initChats() {
    chatList.innerHTML = chats.map(chat => `
        <div class="chat-item" onclick="selectChat(${chat.id}, '${chat.name}')">
            <div class="avatar" style="background:${chat.color}">${chat.name[0]}</div>
            <div class="info">
                <div class="name">${chat.name}</div>
                <div class="last-msg" style="font-size:12px; color:#707579">${chat.lastMsg}</div>
            </div>
        </div>
    `).join('');
}

window.selectChat = (id, name) => {
    document.getElementById('currentChatName').innerText = name;
    document.getElementById('currentAvatar').innerText = name[0];
    messagesContainer.innerHTML = ''; // Очистка при смене
};

function sendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'bubble sent';
    msgDiv.innerText = text;
    messagesContainer.appendChild(msgDiv);
    
    msgInput.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Простой автоответ (бот)
    setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'bubble received';
        reply.innerText = "BeamChat: Сообщение получено.";
        messagesContainer.appendChild(reply);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMessage(); });

initChats();
