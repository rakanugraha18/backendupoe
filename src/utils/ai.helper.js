// utils/ai.helper.js
import { llamaClient } from "./llamaClient.js";

export async function generateExampleWithTranslationAI(word) {
  const prompt = `
  Buat SATU kalimat pendek (maksimal 12 kata) dalam Bahasa Inggris yang menggunakan kata "${word}" secara natural dan sesuai konteks umum.
  
  Lalu, TERJEMAHKAN kalimat tersebut ke dalam Bahasa Indonesia.
  
  Tandai kata "${word}" di kalimat Bahasa Inggris dengan **bold**.
  
  Lalu, di versi Bahasa Indonesia, kata TERJEMAHAN dari kata "${word}" JUGA harus ditandai dengan **bold**.
  
  Contoh format:
  English: She was **brave** enough to speak the truth.  
  Indonesian: Dia cukup **berani** untuk mengatakan yang sebenarnya.
  
  ⚠️ Jangan tambahkan info atau penjelasan. Hanya dua baris itu.
    `;

  const aiResponse = await llamaClient(prompt);

  const englishMatch = aiResponse.match(/English:\s*(.+)/i);
  const indoMatch = aiResponse.match(/Indonesian:\s*(.+)/i);

  const example_sentence = englishMatch?.[1]?.trim() || "";
  const translated_sentence = indoMatch?.[1]?.trim() || "";

  // Ambil kata hasil terjemahan dari kalimat Bahasa Indonesia
  const translatedWordMatch = translated_sentence.match(/\*\*(.*?)\*\*/);
  const translated_word = translatedWordMatch?.[1]?.toLowerCase() || "";

  return {
    example_sentence,
    translated_sentence,
    translated_word,
  };
}
