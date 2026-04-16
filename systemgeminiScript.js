/**
 * ============================================================================
 * Simple System Prompt Example with Google Gemini API
 * ============================================================================
 * 
 * This script demonstrates how system prompts work with Google Gemini AI.
 * 
 * WHAT IS A SYSTEM PROMPT?
 * - A system prompt is the instruction you give to an AI model
 * - It tells the AI what role to play and how to respond
 * - It's the key to getting good results from AI
 * 
 * HOW TO USE:
 * 1. Set your Gemini API key in the GEMINI_API_KEY constant below
 * 2. Run: node systemgeminiScript.js
 * 
 * ============================================================================
 */

const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
// ============================================================================
// CONFIGURATION
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";
const GEMINI_MODEL_NAME = "gemini-2.0-flash-exp";

const client = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  headers: { "Content-Type": "application/json" },
});

// ============================================================================
// SYSTEM PROMPT EXAMPLES
// ============================================================================

/**
 * EXAMPLE 1: Simple System Prompt
 * 
 * This is a basic system prompt. It tells the AI:
 * - What role to play (helpful assistant)
 * - How to respond (be concise and clear)
 */
const SIMPLE_PROMPT = `You are a helpful assistant. Answer questions clearly and concisely.`;

/**
 * EXAMPLE 2: Customized System Prompt
 * 
 * You can customize prompts by using variables.
 * Variables are replaced with actual values before sending to AI.
 */
function createPrompt(role, style) {
  return `You are a ${role}. Respond in a ${style} manner.`;
}

/**
 * EXAMPLE 3: Task-Specific System Prompt
 * 
 * This prompt tells the AI to perform a specific task with specific requirements.
 */
const TASK_PROMPT = `You are a content creator. Create a short story about a topic.
Requirements:
- Keep it under 200 words
- Make it engaging
- Include a moral lesson`;

// ============================================================================
// MAIN FUNCTION: How System Prompts Work
// ============================================================================

/**
 * Sends a message to Gemini AI with a system prompt
 * 
 * @param {string} systemPrompt - The system prompt (instructions for AI)
 * @param {string} userMessage - The user's message/content
 * @returns {Promise<string>} AI's response
 */
async function callGemini(systemPrompt, userMessage) {
  try {
    // Validate API key
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
      throw new Error("Please set your GEMINI_API_KEY in the script or as an environment variable");
    }

    // Call Gemini API
    // The system prompt tells the AI HOW to respond
    // The user message is WHAT the user is asking
    const response = await client.post(
      `/models/${GEMINI_MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
          contents: [
            {
              role: "user",
            parts: [
              { text: systemPrompt },      // System prompt = instructions
              { text: userMessage }        // User message = content/question
              ],
            },
          ],
          generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
}

// ============================================================================
// EXAMPLES: How to Use Different System Prompts
// ============================================================================

async function examples() {
  console.log("=".repeat(60));
  console.log("SYSTEM PROMPT EXAMPLES");
  console.log("=".repeat(60));

  // Example 1: Simple prompt
  console.log("\n1. Simple Prompt:");
  console.log("Prompt:", SIMPLE_PROMPT);
  console.log("User:", "What is JavaScript?");
  try {
    const response1 = await callGemini(SIMPLE_PROMPT, "What is JavaScript?");
    console.log("AI Response:", response1.substring(0, 100) + "...");
  } catch (error) {
    console.error("Error:", error.message);
  }

  // Example 2: Customized prompt
  console.log("\n2. Customized Prompt:");
  const customPrompt = createPrompt("friendly teacher", "encouraging");
  console.log("Prompt:", customPrompt);
  console.log("User:", "Explain variables in programming");
  try {
    const response2 = await callGemini(customPrompt, "Explain variables in programming");
    console.log("AI Response:", response2.substring(0, 100) + "...");
  } catch (error) {
    console.error("Error:", error.message);
  }

  // Example 3: Task-specific prompt
  console.log("\n3. Task-Specific Prompt:");
  console.log("Prompt:", TASK_PROMPT);
  console.log("User:", "A robot learning to paint");
  try {
    const response3 = await callGemini(TASK_PROMPT, "A robot learning to paint");
    console.log("AI Response:", response3);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// ============================================================================
// HOW TO CUSTOMIZE SYSTEM PROMPTS
// ============================================================================

/**
 * TIPS FOR CREATING GOOD SYSTEM PROMPTS:
 * 
 * 1. BE SPECIFIC:
 *    ✅ Good: "You are a Python tutor. Explain concepts with code examples."
 *    ❌ Bad: "You are helpful."
 * 
 * 2. SET CONSTRAINTS:
 *    ✅ Good: "Keep responses under 100 words."
 *    ❌ Bad: "Be brief."
 * 
 * 3. DEFINE THE ROLE:
 *    ✅ Good: "You are a technical writer specializing in API documentation."
 *    ❌ Bad: "You write stuff."
 * 
 * 4. PROVIDE EXAMPLES:
 *    ✅ Good: "Format responses as: Question: ... Answer: ..."
 *    ❌ Bad: "Format it nicely."
 * 
 * 5. SET THE TONE:
 *    ✅ Good: "Use professional, friendly language for business professionals."
 *    ❌ Bad: "Be nice."
 */

// ============================================================================
// EXPORT FOR USE IN OTHER MODULES
// ============================================================================

module.exports = {
  callGemini,
  createPrompt,
  SIMPLE_PROMPT,
  TASK_PROMPT
};

// ============================================================================
// RUN EXAMPLES (if executed directly)
// ============================================================================

if (require.main === module) {
  examples().catch(console.error);
}
