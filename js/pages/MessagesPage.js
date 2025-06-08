import { api } from '../utils/api.js';
import { auth } from '../utils/auth.js';
import { toaster } from '../utils/toaster.js';

// Demo conversations and messages
const DEMO_CONVERSATIONS = [
    { userId: 101, username: 'John Doe' },
    { userId: 102, username: 'Jane Smith' },
    { userId: 103, username: 'Alex Brown' },
    { userId: 104, username: 'Emily White' },
    { userId: 105, username: 'Chris Green' },
    { userId: 106, username: 'Pat Lee' },
];

const DEMO_MESSAGES = {
    101: [
        { senderId: 101, senderName: 'John Doe', content: 'Hi! Is your artwork available?', timestamp: '2024-05-01 10:00' },
        { senderId: 'me', senderName: 'Me', content: 'Yes, it is!', timestamp: '2024-05-01 10:01' },
        { senderId: 101, senderName: 'John Doe', content: 'Great, I am interested.', timestamp: '2024-05-01 10:02' },
    ],
    102: [
        { senderId: 102, senderName: 'Jane Smith', content: 'Can you ship to Warsaw?', timestamp: '2024-05-02 09:30' },
        { senderId: 'me', senderName: 'Me', content: 'Yes, shipping is possible.', timestamp: '2024-05-02 09:31' },
    ],
    103: [
        { senderId: 103, senderName: 'Alex Brown', content: 'I love your style!', timestamp: '2024-05-03 14:20' },
        { senderId: 'me', senderName: 'Me', content: 'Thank you so much!', timestamp: '2024-05-03 14:21' },
    ],
    104: [
        { senderId: 104, senderName: 'Emily White', content: 'Is the painting framed?', timestamp: '2024-05-04 11:10' },
        { senderId: 'me', senderName: 'Me', content: 'Yes, it comes framed.', timestamp: '2024-05-04 11:11' },
    ],
    105: [
        { senderId: 105, senderName: 'Chris Green', content: 'Can I see more photos?', timestamp: '2024-05-05 16:00' },
        { senderId: 'me', senderName: 'Me', content: 'Sure, I will send them.', timestamp: '2024-05-05 16:01' },
    ],
    106: [
        { senderId: 106, senderName: 'Pat Lee', content: 'What is the size?', timestamp: '2024-05-06 13:45' },
        { senderId: 'me', senderName: 'Me', content: 'It is 60x80cm.', timestamp: '2024-05-06 13:46' },
    ],
};

export class MessagesPage {
    constructor(container) {
        this.container = container;
        this.conversations = [];
        this.selectedUserId = null;
        this.messages = [];
        this.newMessage = '';
        this.error = '';
        this.demoMode = true; // For testing purposes

        this.loadConversations();
        this.render();
    }

    async loadConversations() {
        if (this.demoMode) {
            this.conversations = DEMO_CONVERSATIONS;
            this.selectedUserId = DEMO_CONVERSATIONS[0]?.userId || null;
            this.error = '';
            this.loadMessages();
            this.render();
            return;
        }

        try {
            const data = await api.get('/wiadomosci/latesttimestamps');
            this.conversations = data?.conversations || [];
            this.selectedUserId = this.conversations[0]?.userId || null;
            this.error = '';
            this.loadMessages();
        } catch (error) {
            this.error = 'Error loading conversations: ' + error.message;
        }
        this.render();
    }

    async loadMessages() {
        if (!this.selectedUserId) return;

        if (this.demoMode) {
            this.messages = [...DEMO_MESSAGES[this.selectedUserId] || []];
            this.error = '';
            this.render();
            return;
        }

        try {
            const data = await api.get(`/wiadomosci/getmessages/${this.selectedUserId}`);
            this.messages = data?.messages || [];
            this.error = '';
        } catch (error) {
            this.error = 'Error loading messages: ' + error.message;
        }
        this.render();
    }

    async handleSend(event) {
        event.preventDefault();
        if (!this.newMessage.trim() || !this.selectedUserId) return;

        if (this.demoMode) {
            this.messages = [
                ...this.messages,
                {
                    senderId: 'me',
                    senderName: 'Me',
                    content: this.newMessage,
                    timestamp: new Date().toLocaleString()
                }
            ];
            this.newMessage = '';
            toaster.success('Message sent (demo).');
            this.render();
            return;
        }

        try {
            await api.post('/wiadomosci/sendmessage', {
                recipientId: this.selectedUserId,
                content: this.newMessage
            });
            this.newMessage = '';
            await this.loadMessages();
        } catch (error) {
            this.error = 'Error sending message: ' + error.message;
            this.render();
        }
    }

    handleConversationSelect(userId) {
        this.selectedUserId = userId;
        this.loadMessages();
    }

    handleNewMessageChange(event) {
        this.newMessage = event.target.value;
    }

    attachEventListeners() {
        // Attach event listeners to conversation list items
        this.container.querySelectorAll('.conversations-list .list-group-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = parseInt(item.dataset.userId);
                this.handleConversationSelect(userId);
            });
        });

        // Attach event listener to message form
        const form = this.container.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSend(e));
        }

        // Attach event listener to message input
        const input = this.container.querySelector('input[type="text"]');
        if (input) {
            input.addEventListener('input', (e) => this.handleNewMessageChange(e));
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="container py-4">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="card shadow-lg rounded-4 p-4 mb-4 messages-card">
                            <h2 class="mb-4 fw-bold">Messages</h2>
                            ${this.error ? `<div class="alert alert-danger">${this.error}</div>` : ''}
                            <div class="row g-4">
                                <div class="col-md-4">
                                    <h5 class="mb-3 fw-semibold">Conversations</h5>
                                    <ul class="list-group conversations-list">
                                        ${this.conversations.map(conv => `
                                            <li class="list-group-item rounded-4 mb-2 ${this.selectedUserId === conv.userId ? 'active' : ''}"
                                                data-user-id="${conv.userId}"
                                                style="cursor: pointer;">
                                                <div class="d-flex align-items-center">
                                                    <img src="https://randomuser.me/api/portraits/${conv.userId % 2 ? 'men' : 'women'}/${conv.userId % 70}.jpg"
                                                         alt="${conv.username}"
                                                         class="rounded-circle me-3"
                                                         width="40"
                                                         height="40" />
                                                    <div>
                                                        <div class="fw-semibold">${conv.username || conv.userId}</div>
                                                        <div class="text-muted small">Last message: ${conv.lastMessage || 'No messages'}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div class="col-md-8">
                                    <h5 class="mb-3 fw-semibold">Chat</h5>
                                    <div class="chat-box border rounded-4 p-3 mb-3" style="min-height: 300px; background: #f9f9f9;">
                                        ${this.messages.length === 0 ? `
                                            <div class="text-muted text-center py-5">No messages</div>
                                        ` : this.messages.map((msg, idx) => `
                                            <div class="message-bubble ${msg.senderId === 'me' ? 'sent' : 'received'} mb-3">
                                                <div class="message-content">
                                                    <div class="message-text">${msg.content}</div>
                                                    <div class="message-timestamp small text-muted">${msg.timestamp}</div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                    ${this.selectedUserId ? `
                                        <form class="d-flex">
                                            <input type="text"
                                                   class="form-control me-2 rounded-pill"
                                                   value="${this.newMessage}"
                                                   placeholder="Type a message..." />
                                            <button class="btn btn-primary rounded-pill" type="submit">Send</button>
                                        </form>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }
} 