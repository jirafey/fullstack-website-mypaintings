import React, { useState, useEffect } from 'react';
import apiRequest from './api';

function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  // Pobierz listę konwersacji (np. ostatnie kontakty)
  useEffect(() => {
    apiRequest('/wiadomosci/latesttimestamps')
      .then(data => setConversations(data?.conversations || []))
      .catch(err => setError('Błąd pobierania konwersacji: ' + err.message));
  }, []);

  // Pobierz wiadomości po wybraniu użytkownika
  useEffect(() => {
    if (!selectedUserId) return;
    apiRequest(`/wiadomosci/getmessages/${selectedUserId}`)
      .then(data => setMessages(data?.messages || []))
      .catch(err => setError('Błąd pobierania wiadomości: ' + err.message));
  }, [selectedUserId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;
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