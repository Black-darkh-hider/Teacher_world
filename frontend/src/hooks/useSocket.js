import { useEffect, useState, useCallback } from 'react'
import socketService from '../lib/socket'

const useSocket = (userId) => {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState(new Set())

  useEffect(() => {
    if (userId) {
      // Connect to socket
      socketService.connect(userId)

      // Set up connection status listener
      const checkConnection = () => {
        setIsConnected(socketService.getConnectionStatus())
      }

      // Check connection status periodically
      const interval = setInterval(checkConnection, 1000)

      // Set up message listener
      const unsubscribeMessage = socketService.onMessage((message) => {
        setMessages(prev => [...prev, message])
      })

      // Set up typing listener
      const unsubscribeTyping = socketService.onTyping((data) => {
        if (data.isTyping) {
          setTypingUsers(prev => new Set([...prev, data.senderId]))
        } else {
          setTypingUsers(prev => {
            const newSet = new Set(prev)
            newSet.delete(data.senderId)
            return newSet
          })
        }
      })

      return () => {
        clearInterval(interval)
        unsubscribeMessage()
        unsubscribeTyping()
        socketService.disconnect()
      }
    }
  }, [userId])

  const sendMessage = useCallback((data) => {
    socketService.sendMessage(data)
  }, [])

  const sendTyping = useCallback((data) => {
    socketService.sendTyping(data)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    isConnected,
    messages,
    typingUsers,
    sendMessage,
    sendTyping,
    clearMessages,
  }
}

export default useSocket
