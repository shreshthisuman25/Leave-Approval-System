const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

// Load API key - tries config file first, then environment variable
let API_KEY, MODEL_NAME;

// Available Gemini Models (choose based on your needs):
// - "gemini-1.5-flash"        → Fast, cost-effective, great for simple chat (RECOMMENDED)
// - "gemini-2.0-flash-exp"    → Latest experimental, faster than 1.5-flash
// - "gemini-1.5-pro"          → More capable, better for complex tasks, slower
// - "gemini-2.5-flash-lite"   → Optimized for speed and cost (if available)
// - "gemini-1.5-pro-latest"   → Latest pro version

try {
    // Option 2: Try environment variable
    API_KEY = process.env.GEMINI_API_KEY ;
    MODEL_NAME = process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash";

    if (API_KEY) {
        console.log("✓ Loaded API key from environment variable");
    } else {
        console.error("\n❌ ERROR: No Gemini API key found!\n");
        console.error("Please create a configAPI.json file with your Gemini API key.");
        console.error("\nTo get a Gemini API key:");
        console.error("1. Visit: https://aistudio.google.com/app/apikey");
        console.error("2. Sign in with your Google account");
        console.error("3. Click 'Create API Key'");
        console.error("4. Copy the key (it starts with 'AIza')\n");
        console.error("Then create configAPI.json with this content:");
        console.error('{');
        console.error('  "API_KEY": "your-gemini-api-key-here",');
        console.error('  "MODEL_NAME": "gemini-1.5-flash"');
        console.error('}\n');
        process.exit(1);
    }

} catch (error) {
    console.error("Error loading API key:", error.message);
    process.exit(1);
}

// Validate API key format
if (API_KEY && !API_KEY.startsWith("AIza")) {
    console.error("\n⚠️  WARNING: API key format doesn't look correct!");
    console.error("Gemini API keys should start with 'AIza'");
    console.error("Your key appears to be: " + (API_KEY.startsWith("sk-") ? "OpenAI key" : "unknown format"));
    console.error("Please get a Gemini API key from: https://aistudio.google.com/app/apikey\n");
}

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Simple function to chat with Gemini
 * @param {string} prompt - The user's prompt/question
 * @returns {Promise<string>} - The AI's response
 */
async function chatWithGemini(prompt) {
    try {
        // Get the generative model
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error.message);
        if (error.message.includes("API key not valid")) {
            console.error("\n💡 Tip: Make sure your API key is valid and starts with 'AIza'");
            console.error("Get a new key from: https://aistudio.google.com/app/apikey");
        }
        throw error;
    }
}

// Main function to run the chat
async function main() {
    // Get prompt from command line arguments or use default
    const prompt = process.argv.slice(2).join(" ") || "How's the weather today?";

    console.log("You:", prompt);
    console.log("\nGemini:");

    try {
        const response = await chatWithGemini(prompt);
        console.log(response);
    } catch (error) {
        console.error("Failed to get response:", error.message);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

// Export for use in other files
module.exports = chatWithGemini;
