require("dotenv").config();

function config() {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined ");
    // Since this runs outside of Express, the global 'uncaughtException' handler will catch it.
  }
}

module.exports = config;

// Since we call config.js in index.js, which loads the environment variables,
// they become available globally through process.env,
// so there’s no need to import or load dotenv again in other files.
