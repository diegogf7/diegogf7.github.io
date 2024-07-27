window.onload = function() {
    document.getElementById('user-input').focus();
    document.getElementById('new-chat-btn').addEventListener('click', createNewChat);
    document.getElementById('password-submit').addEventListener('click', checkPassword);
    document.getElementById('password-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkPassword();
        }
    });
    document.getElementById('send-btn').addEventListener('click', handleSendButtonClick);
    document.getElementById('user-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('send-btn').click();
        }
    });
};

let currentThreadId = null;
let chatLogs = [];
let isCurrentChatSaved = false;

function checkPassword() {
    const passwordInput = document.getElementById('password-input').value;
    if (passwordInput === 'Foden28') {
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('main-container').classList.add('active');
    } else {
        document.getElementById('password-error').style.display = 'block';
    }
}

function createNewChat() {
    if (currentThreadId && !isCurrentChatSaved) {
        saveCurrentChat();
    }
    startNewChat();
}

function startNewChat() {
    fetch('/create_thread')
    .then(response => response.json())
    .then(data => {
        if (data.thread_id) {
            currentThreadId = data.thread_id;
            isCurrentChatSaved = false;
            document.getElementById('user-input').value = '';
            document.getElementById('logs').innerText = '';
            document.getElementById('messages-container').innerHTML = '';
        } else {
            document.getElementById('logs').innerText = 'Error creating thread';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('logs').innerText = 'Error creating thread';
    });
}

function saveCurrentChat() {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer.children.length === 0) {
        return;
    }
    const messages = messagesContainer.innerHTML;
    const chatLog = {
        id: chatLogs.length,
        messages: messages
    };
    chatLogs.push(chatLog);
    const button = document.createElement('button');
    button.classList.add('chat-log-button');
    button.innerText = `Chat ${chatLogs.length}`;
    button.addEventListener('click', () => loadChatLog(chatLog.id));
    document.getElementById('chat-history-log').appendChild(button);
    isCurrentChatSaved = true;
}

function loadChatLog(id) {
    const chatLog = chatLogs.find(log => log.id === id);
    if (chatLog) {
        document.getElementById('messages-container').innerHTML = chatLog.messages;
        isCurrentChatSaved = true;
    }
}

function handleSendButtonClick() {
    const userInputField = document.getElementById('user-input');
    const userInput = userInputField.value.trim();
    if (!userInput) {
        return;
    }

    if (!currentThreadId) {
        startNewChatAndSendMessage(userInput);
    } else {
        sendUserInput(currentThreadId, userInput);
    }
    userInputField.value = '';
}

function startNewChatAndSendMessage(userInput) {
    fetch('/create_thread')
    .then(response => response.json())
    .then(data => {
        if (data.thread_id) {
            currentThreadId = data.thread_id;
            sendUserInput(currentThreadId, userInput);
        } else {
            document.getElementById('logs').innerText = 'Error creating thread';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('logs').innerText = 'Error creating thread';
    });
}

function showLoadingOnButton() {
    const sendButton = document.getElementById('send-btn');
    sendButton.innerHTML = '<div class="loader"></div>';
    sendButton.disabled = true;
}

function hideLoadingOnButton() {
    const sendButton = document.getElementById('send-btn');
    sendButton.innerHTML = 'Send';
    sendButton.disabled = false;
}

function sendUserInput(threadId, userInput, files = []) {
    showLoadingOnButton();
    addToChatHistory('User', userInput);

    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput, thread_id: threadId, file_ids: files }),
    })
    .then(response => response.json())
    .then(data => {
        hideLoadingOnButton();
        addToChatHistory('Assistant', data);
        isCurrentChatSaved = false;
    })
    .catch((error) => {
        hideLoadingOnButton();
        console.error('Error:', error);
        document.getElementById('logs').innerText = 'Error sending message.';
    });
}

function formatMessage(message) {
    return message.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
}

function addToChatHistory(role, message) {
    const messagesContainer = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    if (role === 'Assistant') {
        message = formatAssistantResponse(message);
    } else if (role === 'User') {
        message = formatMessage(message);
    }
    let roleClass = role === 'User' ? 'User' : 'Assistant';
    messageDiv.innerHTML = `<strong class="${roleClass}">${role}</strong>: ${message}`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatAssistantResponse(responseText) {
    let formattedText = responseText.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
    formattedText = formattedText.replace(/`([^`]+)`/g, '<code>$1</code>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    return formattedText;
}
