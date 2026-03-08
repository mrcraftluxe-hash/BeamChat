import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ТВОИ ДАННЫЕ ИЗ FIREBASE (получи их в настройках проекта)
const firebaseConfig = {
  apiKey: "ТВОЙ_API_KEY",
  databaseURL: "ТВОЙ_DB_URL",
  projectId: "ТВОЙ_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const usernameInput = document.getElementById('username');
const sendBtn = document.getElementById('send-btn');

// Функция отправки
function sendMessage() {
    const text = messageInput.value;
    const user = usernameInput.value || "Anon";
    
    if (text.trim() !== "") {
        push(messagesRef, {
            user: user,
            text: text,
            timestamp: Date.now()
        });
        messageInput.value = "";
    }
}

sendBtn.onclick = sendMessage;

// Слушаем новые сообщения в реальном времени
onChildAdded(messagesRef, (data) => {
    const msg = data.val();
    const isMine = msg.user === usernameInput.value;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${isMine ? 'mine' : 'others'}`;
    msgDiv.innerHTML = `<b>${msg.user}</b>${msg.text}`;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Автопрокрутка вниз
});
