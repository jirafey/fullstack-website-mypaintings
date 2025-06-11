import React, { useState, useEffect } from 'react';
import apiRequest from './api';
import { useDemoMode } from './DemoModeContext';
import { useToast } from './Toaster';
import { useSession } from './hooks/useSession';
import './MessagesPage.css';

// DEMO dane dla HOTELI (oryginalne)
const DEMO_CONVERSATIONS_HOTEL = [
  { userId: 101, username: 'John Doe' },
  { userId: 102, username: 'Jane Smith' },
  { userId: 103, username: 'Alex Brown' },
  { userId: 104, username: 'Emily White' },
  { userId: 105, username: 'Chris Green' },
  { userId: 106, username: 'Pat Lee' },
];

const DEMO_MESSAGES_HOTEL = {
  101: [
    { senderId: 'me', senderName: 'Me', content: 'Hi! Is your artwork available?', timestamp: '2024-05-01 10:00' },
    { senderId: 101, senderName: 'John Doe', content: 'Yes, it is!', timestamp: '2024-05-01 10:01' },
    { type: 'system', content: 'Artist @DemoArtist accepted your reservation for “Abstract Dreams”!', timestamp: '2024-05-01 10:02' },
    { senderId: 'me', senderName: 'Me', content: 'Great, I am interested.', timestamp: '2024-05-01 10:30' },
    { type: 'system', content: 'You sent a payment request.', timestamp: '2024-05-01 10:32' },
    { senderId: '101', senderName: 'John Doe', content: 'Amazing!', timestamp: '2024-05-01 10:35' },
  ],
  102: [
    { senderId: 'me', senderName: 'Me', content: 'Can you ship to Warsaw?', timestamp: '2024-05-02 09:30' },
    { senderId: 102, senderName: 'Jane Smith', content: 'Yes, shipping is possible.', timestamp: '2024-05-02 09:31' },
  ]
};


// DEMO dane dla ARTYSTÓW (rozmowy z hotelami)
const DEMO_CONVERSATIONS_ARTYSTA = [
  { userId: 201, username: 'Hotel Bellevue' },
  { userId: 202, username: 'City Inn' },
];
const DEMO_MESSAGES_ARTYSTA = {
  201: [
    { senderId: 201, senderName: 'Hotel Bellevue', content: 'We are interested in exhibiting your artwork.', timestamp: '2024-05-10 12:00' },
    { senderId: 'me', senderName: 'Me', content: 'That sounds great! Which one?', timestamp: '2024-05-10 12:02' },
  ],
  202: [
    { senderId: 'me', senderName: 'Me', content: 'Would you like to feature my painting in your lobby?', timestamp: '2024-05-11 14:00' },
    { senderId: 202, senderName: 'City Inn', content: 'Yes, we are considering it.', timestamp: '2024-05-11 14:05' },
  ],
};

function MessagesPage() {
  const { demoMode } = useDemoMode();
  const toast = useToast();
  const { userType } = useSession();
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (demoMode) {

      if (userType === 'HOTEL') {
        const enriched = DEMO_CONVERSATIONS_HOTEL.map(conv => {
          const msgs = DEMO_MESSAGES_HOTEL[conv.userId] || [];
          const lastMsg = [...msgs].reverse().find(m => !m.type); // pomijamy systemowe
          return { ...conv, lastMessage: lastMsg?.content || null };
        });
        setConversations(enriched);
        setSelectedUserId(enriched[0]?.userId || null);
      } else if (userType === 'ARTYSTA') {
        const enriched = DEMO_CONVERSATIONS_ARTYSTA.map(conv => {
          const msgs = DEMO_MESSAGES_ARTYSTA[conv.userId] || [];
          const lastMsg = [...msgs].reverse().find(m => !m.type);
          return { ...conv, lastMessage: lastMsg?.content || null };
        });
        setConversations(enriched);
        setSelectedUserId(enriched[0]?.userId || null);
      }




      setError('');
      return;
    }

    apiRequest('/wiadomosci/latesttimestamps')
        .then(data => setConversations(data?.conversations || []))
        .catch(err => setError('Błąd pobierania konwersacji: ' + err.message));
  }, [demoMode, userType]);

  useEffect(() => {
    if (!selectedUserId) return;

    if (demoMode) {
      const messagesData =
          userType === 'HOTEL'
              ? DEMO_MESSAGES_HOTEL[selectedUserId] || []
              : DEMO_MESSAGES_ARTYSTA[selectedUserId] || [];
      setMessages([...messagesData]);
      setError('');
      return;
    }

    apiRequest(`/wiadomosci/getmessages/${selectedUserId}`)
        .then(data => setMessages(data?.messages || []))
        .catch(err => setError('Błąd pobierania wiadomości: ' + err.message));
  }, [selectedUserId, demoMode, userType]);

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
      const data = await apiRequest(`/wiadomosci/getmessages/${selectedUserId}`);
      setMessages(data?.messages || []);
    } catch (err) {
      setError('Błąd wysyłania wiadomości: ' + err.message);
    }
  };

  return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg rounded-4 p-4 mb-4 messages-card">
              <h2 className="mb-4 fw-bold">Messages</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="row g-4">
                <div className="col-md-4">
                  <h5 className="mb-3 fw-semibold">Conversations</h5>
                  <ul className="list-group conversations-list">
                    {conversations.map(conv => (
                        <li key={conv.userId} className={`list-group-item rounded-4 mb-2 ${selectedUserId === conv.userId ? 'active' : ''}`}
                            onClick={() => setSelectedUserId(conv.userId)} style={{ cursor: 'pointer' }}>
                          <div className="d-flex align-items-center">
                            <img src={`https://randomuser.me/api/portraits/${conv.userId % 2 ? 'men' : 'women'}/${conv.userId % 70}.jpg`} alt={conv.username} className="rounded-circle me-3" width={40} height={40} />
                            <div>
                              <div className="fw-semibold">{conv.username || conv.userId}</div>
                              <div className="text-muted small">Last message: {conv.lastMessage || 'No messages'}</div>
                            </div>
                          </div>
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-8">
                  <h5 className="mb-3 fw-semibold">Chat</h5>
                  <div className="chat-box border rounded-4 p-3 mb-3" style={{ minHeight: 300, background: '#f9f9f9' }}>
                    {messages.length === 0 ? <div className="text-muted text-center py-5">No messages</div> :

                        messages.map((msg, idx) => {
                          if (msg.type === 'system') {
                            return (
                                <div key={idx} className="text-center my-3">
                                  <div className="alert alert-info d-inline-block px-4 py-2 rounded-pill shadow-sm">
                                    <strong className="text-dark">{msg.content}</strong><br />
                                    <small className="text-muted">{msg.timestamp}</small>
                                  </div>
                                </div>
                            );
                          }

                          return (
                              <div key={idx} className={`message-bubble ${msg.senderId === 'me' ? 'sent' : 'received'} mb-3`}>
                                <div className="message-content">
                                  <div className="message-text">{msg.content}</div>
                                  <div className="message-timestamp small text-muted">{msg.timestamp}</div>
                                </div>
                              </div>
                          );
                        })






                    }
                  </div>
                  {selectedUserId && (
                      <form onSubmit={handleSend} className="d-flex">
                        <input type="text" className="form-control me-2 rounded-pill" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." />
                        <button className="btn btn-primary rounded-pill" type="submit">Send</button>
                      </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MessagesPage;
