const InstitutionTeamMember = require("../models/InstitutionTeamMember");

// =========================
// ⭐ GET ALL TEAM MEMBERS
// =========================
exports.getTeamMembers = async (req, res) => {
  try {
    const institutionId = req.user?.institutionProfileId;

    if (!institutionId) {
      return res.status(403).json({
        success: false,
        message: "Institution profile not found",
      });
    }

    const members = await InstitutionTeamMember.find({ institutionId }).lean();

    return res.status(200).json({
      success: true,
      count: members.length,
      members,
    });

  } catch (error) {
    console.error("❌ Error fetching team members:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch team members. Please try again.",
    });
  }
};

// =========================
// ⭐ ADD TEAM MEMBER
// =========================
exports.addTeamMember = async (req, res) => {
  try {
    const institutionId = req.user?.institutionProfileId;

    if (!institutionId) {
      return res.status(403).json({
        success: false,
        message: "Institution profile not found",
      });
    }

    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const emailRegex = /^[\w-.]+@[\w-]+(\.[\w-]+)+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const existing = await InstitutionTeamMember.findOne({
      institutionId,
      email,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A team member with this email already exists",
      });
    }

    const validRoles = ["Admin", "Recruiter", "Viewer"];
    const cleanRole = validRoles.includes(role) ? role : "Recruiter";

    const newMember = new InstitutionTeamMember({
      institutionId,
      name: name.trim(),
      email: email.trim(),
      role: cleanRole,
    });

    await newMember.save();

    return res.status(201).json({
      success: true,
      message: "Team member added successfully",
      member: newMember,
    });

  } catch (error) {
    console.error("❌ Error adding team member:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add team member. Please try again.",
    });
  }
};

// =========================
// ⭐ UPDATE TEAM MEMBER
// =========================
exports.updateTeamMember = async (req, res) => {
  try {
    const institutionId = req.user?.institutionProfileId;
    const memberId = req.params.id;

    if (!institutionId) {
      return res.status(403).json({
        success: false,
        message: "Institution profile not found",
      });
    }

    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const member = await InstitutionTeamMember.findOne({
      _id: memberId,
      institutionId,
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    if (email !== member.email) {
      const exists = await InstitutionTeamMember.findOne({
        institutionId,
        email,
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Another member with this email already exists",
        });
      }
    }

    const validRoles = ["Admin", "Recruiter", "Viewer"];

    member.name = name.trim();
    member.email = email.trim();
    member.role = validRoles.includes(role) ? role : member.role;

    await member.save();

    return res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      member,
    });

  } catch (error) {
    console.error("❌ Error updating team member:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update team member. Please try again.",
    });
  }
};

// =========================
// ⭐ DELETE TEAM MEMBER
// =========================
exports.removeTeamMember = async (req, res) => {
  try {
    const institutionId = req.user?.institutionProfileId;
    const memberId = req.params.id;

    if (!institutionId) {
      return res.status(403).json({
        success: false,
        message: "Institution profile not found",
      });
    }

    const deleted = await InstitutionTeamMember.findOneAndDelete({
      _id: memberId,
      institutionId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Team member removed successfully",
    });

  } catch (error) {
    console.error("❌ Error removing team member:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove team member. Please try again.",
    });
  }
};
