import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
// Konfigurasi API
const AI_API_URL = "https://api.groq.com/openai/v1/chat/completions"; // Groq API
const AI_API_KEY = process.env.AI_API_KEY; // API Key dari environment variables

// 🔹 Fungsi untuk menerjemahkan kata ke Bahasa Indonesia
export const translateWithAI = async (word) => {
  try {
    const response = await axios.post(
      AI_API_URL,
      {
        model: "deepseek-r1-distill-llama-70b",
        messages: [
          {
            role: "system",
            content:
              "You are a translation AI. Translate the following English word to Indonesian.",
          },
          {
            role: "user",
            content: `Translate this word to Indonesian: ${word}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 50,
      },
      {
        headers: { Authorization: `Bearer ${AI_API_KEY}` },
      }
    );

    return { translation: response.data.choices[0].message.content.trim() };
  } catch (error) {
    console.error("Translation Error:", error);
    return { translation: "Translation not available" };
  }
};

// 🔹 Fungsi untuk membuat contoh kalimat + terjemahannya
export const generateExampleSentence = async (word) => {
  try {
    const response = await axios.post(
      AI_API_URL,
      {
        model: "deepseek-r1-distill-llama-70b",
        messages: [
          {
            role: "system",
            content:
              "You are an AI that generates example sentences in English and translates them to Indonesian.",
          },
          {
            role: "user",
            content: `Give an example sentence using the word "${word}" in English and translate it to Indonesian.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: { Authorization: `Bearer ${AI_API_KEY}` },
      }
    );

    const responseText = response.data.choices[0].message.content.trim();
    const parts = responseText.split("\n"); // Pisahkan contoh kalimat & terjemahan

    return {
      sentence: parts[0] || "Example sentence not available",
      translation: parts[1] || "Terjemahan tidak tersedia",
    };
  } catch (error) {
    console.error("Example Sentence Error:", error);
    return {
      sentence: "Example sentence not available",
      translation: "Terjemahan tidak tersedia",
    };
  }
};
