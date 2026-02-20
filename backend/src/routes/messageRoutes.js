const express = require("express")
const { sendMessage, getMessages, getConversations, markMessagesAsRead, getUnreadCount, deleteMessage } = require("../controllers/messageController")
const { authenticateToken } = require("../middleware/auth")

const router = express.Router()

router.get("/conversations", authenticateToken, getConversations)
router.get("/unread-count", authenticateToken, getUnreadCount)
router.get("/:applicationId", authenticateToken, getMessages)
router.post("/", authenticateToken, sendMessage)
router.put("/:applicationId/read", authenticateToken, markMessagesAsRead)
router.delete("/:messageId", authenticateToken, deleteMessage)

module.exports = router
