const { verifyAccessToken } = require("../config/jwt");
const InstitutionProfile = require("../models/InstitutionProfile");

const authenticateToken = async (req, res, next) => {
  try {
    // Support multiple token locations to be forgiving for clients:
    // 1) Authorization header: 'Bearer <token>'
    // 2) Body: { accessToken }
    // 3) Query: ?accessToken=...
    // 4) Cookie: accessToken
    const authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];
    let tokenSource = 'header'

    if (!token && req.body && req.body.accessToken) {
      token = req.body.accessToken
      tokenSource = 'body'
    }
    if (!token && req.query && req.query.accessToken) {
      token = req.query.accessToken
      tokenSource = 'query'
    }
    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken
      tokenSource = 'cookie'
    }

    if (!token) {
      console.log("No token found (checked header, body, query, cookies)");
      return res.status(401).json({ message: "Access token required" });
    }

    // Normalize token to handle common client-side storage/encoding issues
    try {
      token = String(token).trim()
      // Strip surrounding single or double quotes
      token = token.replace(/^"|"$/g, "")
      token = token.replace(/^'|'$/g, "")
      // If token appears URL-encoded, decode it
      try {
        const decodedTokenCandidate = decodeURIComponent(token)
        if (decodedTokenCandidate && decodedTokenCandidate !== token) {
          token = decodedTokenCandidate
        }
      } catch (e) {
        // ignore decode errors
      }
    } catch (e) {
      // fallback: leave token as-is
    }

    let decoded = verifyAccessToken(token);

    // As a last attempt, try trimming again or removing stray prefix
    if (!decoded) {
      try {
        let alt = token.replace(/\s+/g, '')
        alt = alt.replace(/^Bearer/i, '')
        alt = alt.replace(/^"|"$/g, "").replace(/^'|'$/g, "")
        decoded = verifyAccessToken(alt)
      } catch (e) {
        decoded = null
      }
    }

    if (!decoded) {
      // Log a masked version of the token for debugging (do not log full token)
      try {
        const raw = String(req.headers["authorization"] || token || '')
        let tok = raw.split(/\s+/).pop() || ''
        let masked = tok
        if (tok.length > 12) masked = `${tok.slice(0,6)}...${tok.slice(-6)} (len:${tok.length})`
        console.log("Invalid or expired token (source:", tokenSource, ") masked:", masked)
      } catch (e) {
        console.log("Invalid or expired token (source:", tokenSource, ")")
      }
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    console.log("Decoded token:", decoded);

    // If the logged-in user is an institution, fetch institution profile
    if (decoded.role === "institution") {
      try {
        const profile = await InstitutionProfile.findOne({ userId: decoded.userId });

        if (!profile) {
          console.log("No institution profile found for userId:", decoded.userId);
          return res.status(403).json({ message: "Institution profile not found" });
        }

        req.user.institutionProfileId = profile._id.toString();
        console.log("institutionProfileId added:", req.user.institutionProfileId);
      } catch (err) {
        console.error("Error fetching institution profile:", err);
        return res
          .status(500)
          .json({ message: "Error verifying institution profile" });
      }
    }

    next();
  } catch (err) {
    console.error("Authentication middleware error:", err);
    return res
      .status(500)
      .json({ message: "Internal server error in authentication" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
