import React, { useState, useEffect } from 'react';
import apiRequest from './api';
import { useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';

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

function MessagesPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  // Load conversations
  useEffect(() => {
    if (demoMode) {
      setConversations(DEMO_CONVERSATIONS);
      setSelectedUserId(DEMO_CONVERSATIONS[0]?.userId || null);
      setError('');
      return;
    }
    apiRequest('/wiadomosci/latesttimestamps')
      .then(data => setConversations(data?.conversations || []))
      .catch(err => setError('Błąd pobierania konwersacji: ' + err.message));
  }, [demoMode]);

  // Load messages for selected user
  useEffect(() => {
    if (!selectedUserId) return;
    if (demoMode) {
      setMessages([...DEMO_MESSAGES[selectedUserId] || []]);
      setError('');
      return;
    }
    apiRequest(`/wiadomosci/getmessages/${selectedUserId}`)
      .then(data => setMessages(data?.messages || []))
      .catch(err => setError('Błąd pobierania wiadomości: ' + err.message));
  }, [selectedUserId, demoMode]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;
    if (demoMode) {
      setMessages(msgs => [
        ...msgs,
        { senderId: 'me', senderName: 'Me', content: newMessage, timestamp: new Date().toLocaleString() }
      ]);
      setNewMessage('');
      toast('Message sent (demo).', 'success');
      return;
    }
    try {
      await apiRequest('/wiadomosci/sendmessage', {
        method: 'POST',
        body: { recipientId: selectedUserId, content: newMessage }
      });
      setNewMessage('');
      // Odśwież wiadomości
      const data = await apiRequest(`/wiadomosci/getmessages/${selectedUserId}`);
      setMessages(data?.messages || []);
    } catch (err) {
      setError('Błąd wysyłania wiadomości: ' + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Messages</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-4">
          <h5>Conversations</h5>
          <ul className="list-group">
            {conversations.map(conv => (
              <li key={conv.userId} className={`list-group-item ${selectedUserId === conv.userId ? 'active' : ''}`}
                  onClick={() => setSelectedUserId(conv.userId)} style={{ cursor: 'pointer' }}>
                {conv.username || conv.userId}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <h5>Chat</h5>
          <div className="border rounded p-3 mb-3" style={{ minHeight: 200, background: '#f9f9f9' }}>
            {messages.length === 0 ? <div className="text-muted">No messages</div> :
              messages.map((msg, idx) => (
                <div key={idx} className="mb-2">
                  <strong>{msg.senderName || msg.senderId}:</strong> {msg.content}
                  <span className="text-muted small ms-2">{msg.timestamp}</span>
                </div>
              ))}
          </div>
          {selectedUserId && (
            <form onSubmit={handleSend} className="d-flex">
              <input type="text" className="form-control me-2" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." />
              <button className="btn btn-primary" type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesPage; 