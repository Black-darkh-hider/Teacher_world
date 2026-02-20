// Test script to verify application context feature in messaging
const mongoose = require("mongoose")
const Message = require("./src/models/Message")
const User = require("./src/models/User")
const Job = require("./src/models/Job")
const Application = require("./src/models/Application")
const InstitutionProfile = require("./src/models/InstitutionProfile")
require("dotenv").config()

async function testApplicationContext() {
  console.log("\n🧪 Testing Application Context Feature...\n")

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/job-portal", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("✅ Connected to MongoDB")

    // Check if we have test data
    const messagesCount = await Message.countDocuments()
    const applicationsCount = await Application.countDocuments()

    console.log(`📊 Database Status:`)
    console.log(`   Messages: ${messagesCount}`)
    console.log(`   Applications: ${applicationsCount}`)

    if (messagesCount === 0) {
      console.log("\n⚠️  No messages found. Creating test data...")

      // Get some existing users, jobs, and applications
      const users = await User.find().limit(2)
      const jobs = await Job.find().limit(1)
      const applications = await Application.find().limit(1)

      if (users.length >= 2 && jobs.length > 0 && applications.length > 0) {
        // Create a test message with application context
        const testMessage = new Message({
          senderId: users[0]._id,
          receiverId: users[1]._id,
          content: "Hello! I'm interested in this position.",
          applicationId: applications[0]._id,
        })

        await testMessage.save()
        console.log("✅ Created test message with application context")
      } else {
        console.log("❌ Insufficient test data. Need at least 2 users, 1 job, and 1 application")
      }
    }

    // Test the getConversation function logic
    console.log("\n🔍 Testing conversation retrieval with application context...")

    const messages = await Message.find()
      .populate("senderId", "name email")
      .populate("receiverId", "name email")
      .populate({
        path: "applicationId",
        populate: [
          {
            path: "jobId",
            select: "title subject city state salaryType salaryMin salaryMax",
          },
          {
            path: "institutionId",
            select: "institutionName",
          },
        ],
      })
      .sort({ createdAt: 1 })

    if (messages.length > 0) {
      console.log("✅ Messages retrieved successfully")

      // Check if any messages have application context
      const messagesWithContext = messages.filter(msg => msg.applicationId)

      if (messagesWithContext.length > 0) {
        console.log(`✅ Found ${messagesWithContext.length} message(s) with application context`)

        messagesWithContext.forEach((msg, index) => {
          console.log(`\n📋 Message ${index + 1}:`)
          console.log(`   Content: "${msg.content}"`)
          console.log(`   From: ${msg.senderId.name} (${msg.senderId.email})`)
          console.log(`   To: ${msg.receiverId.name} (${msg.receiverId.email})`)

          if (msg.applicationId) {
            const { jobId, institutionId } = msg.applicationId
            console.log(`   💼 Application Context:`)
            console.log(`      Job: ${jobId?.title}`)
            console.log(`      Institution: ${institutionId?.institutionName}`)
            console.log(`      Location: ${jobId?.city}, ${jobId?.state}`)
          }
        })
      } else {
        console.log("⚠️  No messages with application context found")
      }
    } else {
      console.log("⚠️  No messages found in database")
    }

    // Test conversations aggregation
    console.log("\n🔍 Testing conversations aggregation...")

    const conversations = await Message.aggregate([
      {
        $group: {
          _id: null,
          totalMessages: { $sum: 1 },
          messagesWithContext: {
            $sum: { $cond: [{ $ne: ["$applicationId", null] }, 1, 0] }
          }
        }
      }
    ])

    if (conversations.length > 0) {
      const stats = conversations[0]
      console.log(`📊 Conversation Stats:`)
      console.log(`   Total Messages: ${stats.totalMessages}`)
      console.log(`   Messages with Application Context: ${stats.messagesWithContext}`)
      console.log(`   Percentage: ${((stats.messagesWithContext / stats.totalMessages) * 100).toFixed(1)}%`)
    }

    console.log("\n✅ Application Context Feature Test Complete!\n")

  } catch (error) {
    console.error("❌ Test failed:", error.message)
  } finally {
    await mongoose.disconnect()
  }
}

testApplicationContext()
