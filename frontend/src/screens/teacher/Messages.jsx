import React, { useState, useEffect, useRef } from 'react'
import useSocket from '../../hooks/useSocket'
import { getAuthUser } from '../../lib/auth'

export default function TeacherMessages() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)
  const { user } = getAuthUser()
  const { isConnected, messages: socketMessages, typingUsers, sendMessage, sendTyping, clearMessages } = useSocket(user?._id)

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle socket messages
  useEffect(() => {
    if (socketMessages.length > 0) {
      setMessages(prev => [...prev, ...socketMessages])
      clearMessages()
    }
  }, [socketMessages, clearMessages])

  // Fetch conversations
  useEffect(() => {
    fetchConversations()
  }, [])

  // Fetch messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.user._id)
    }
  }, [selectedConversation])

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/messages/conversations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setConversations(data)
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (userId) => {
    try {
      const response = await fetch(`/api/messages/conversation/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation || sending) return

    setSending(true)
    try {
      const messageData = {
        senderId: user._id,
        receiverId: selectedConversation.user._id,
        content: newMessage.trim(),
        applicationId: selectedConversation.lastMessage?.applicationId
      }

      // Send via socket for real-time
      sendMessage(messageData)

      // Also send via API as fallback
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(messageData)
      })

      if (response.ok) {
        setNewMessage('')
        // Refresh conversations to update last message
        fetchConversations()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const handleTyping = () => {
    if (selectedConversation) {
      sendTyping({
        receiverId: selectedConversation.user._id,
        isTyping: newMessage.length > 0
      })
    }
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date) => {
    const messageDate = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return messageDate.toLocaleDateString()
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', background: 'var(--gray-50)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Loading messages...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', background: 'var(--gray-50)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 4rem)' }}>
          {/* Conversations List */}
          <div style={{
            flex: '0 0 300px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, color: '#1f2937' }}>Messages</h3>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
              </div>
            </div>
            <div style={{ height: 'calc(100% - 80px)', overflowY: 'auto' }}>
              {conversations.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  No conversations yet
                </div>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    onClick={() => setSelectedConversation(conversation)}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      background: selectedConversation?._id === conversation._id ? '#f3f4f6' : 'white',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>
                        {conversation.user.name}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div style={{
                          background: '#3b82f6',
                          color: 'white',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {conversation.lastMessage?.content?.substring(0, 50)}
                      {conversation.lastMessage?.content?.length > 50 && '...'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                      {formatTime(conversation.lastMessage?.createdAt)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div style={{
            flex: 1,
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#1f2937' }}>
                      {selectedConversation.user.name}
                    </h4>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {selectedConversation.user.email}
                    </div>
                  </div>
                  {typingUsers.has(selectedConversation.user._id) && (
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic' }}>
                      typing...
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div style={{
                  flex: 1,
                  padding: '1rem',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {messages.map((message, index) => {
                    const isOwnMessage = message.senderId === user._id
                    const showDate = index === 0 || formatDate(message.createdAt) !== formatDate(messages[index - 1].createdAt)

                    return (
                      <div key={message._id}>
                        {showDate && (
                          <div style={{
                            textAlign: 'center',
                            marginBottom: '1rem',
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            fontWeight: '500'
                          }}>
                            {formatDate(message.createdAt)}
                          </div>
                        )}
                        <div style={{
                          display: 'flex',
                          justifyContent: isOwnMessage ? 'flex-end' : 'flex-start'
                        }}>
                          <div style={{
                            maxWidth: '70%',
                            padding: '0.75rem 1rem',
                            borderRadius: '18px',
                            background: isOwnMessage ? '#3b82f6' : '#f3f4f6',
                            color: isOwnMessage ? 'white' : '#1f2937',
                            wordWrap: 'break-word'
                          }}>
                            <div>{message.content}</div>
                            <div style={{
                              fontSize: '0.75rem',
                              opacity: 0.7,
                              marginTop: '0.25rem',
                              textAlign: isOwnMessage ? 'right' : 'left'
                            }}>
                              {formatTime(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} style={{
                  padding: '1rem',
                  borderTop: '1px solid #e5e7eb',
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value)
                      handleTyping()
                    }}
                    placeholder="Type a message..."
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '24px',
                      outline: 'none',
                      fontSize: '0.875rem'
                    }}
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '24px',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      opacity: sending || !newMessage.trim() ? 0.5 : 1
                    }}
                  >
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}>
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
