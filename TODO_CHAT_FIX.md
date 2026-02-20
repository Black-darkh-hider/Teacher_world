 # TODO: Fix Chat to be Per Application

## Backend Changes
- [x] Modify getConversations in messageController.js to group by applicationId instead of user
- [x] Ensure aggregation returns application context (job title, institution name, etc.)
- [x] Handle conversations with no messages yet

## Frontend Changes
- [x] Update TeacherMessages.jsx to display conversations per application
- [x] Change conversation selection to use applicationId
- [x] Update message sending to include applicationId
- [x] Update socket events to handle application-based chats

## Testing
- [ ] Test fetching conversations per application
- [ ] Test sending and receiving messages in application context
- [ ] Verify application context display in chat
