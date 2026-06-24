import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Using API Key:", apiKey ? apiKey.substring(0, 10) + "..." : "undefined");
  if (!apiKey) {
    console.error("No API key found in environment!");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-pro', 'gemini-1.0-pro', 'gemini-1.5-flash-latest'];

  for (const modelName of models) {
    try {
      console.log(`Sending message to model "${modelName}"...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello! Response in one short sentence.");
      console.log(`✅ Success for "${modelName}":`, result.response.text());
      return;
    } catch (err: any) {
      console.warn(`❌ Failed for "${modelName}":`, err.message || err);
    }
  }
}

test();
