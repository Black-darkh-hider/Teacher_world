// Compatibility alias: some controllers expect a model named `Institution`.
// Re-export the existing `InstitutionProfile` model to avoid changing many files.
module.exports = require("./InstitutionProfile");
