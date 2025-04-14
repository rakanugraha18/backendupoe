// // utils/ai.helper.js
// import { llamaClient } from "./llamaClient.js";

// // Fungsi untuk generate kata dan terjemahan berdasarkan topik
// export async function generateWordsByTopicAI(topic, limit = 10) {
//   const prompt = `
//   Buatkan ${limit} kata bahasa Inggris yang umum dan relevan dengan topik "${topic}".
//   Terjemahkan ke dalam Bahasa Indonesia secara kasual dan mudah dimengerti.
//   Balas dalam format JSON array, seperti ini:

//   [
//     {"word": "travel", "translated_word": "perjalanan"},
//     {"word": "adventure", "translated_word": "petualangan"}
//   ]

//   Jangan beri penjelasan tambahan, hanya balas array JSON tersebut saja.
//   `;

//   const response = await llamaClient(prompt);

//   try {
//     const parsed = JSON.parse(response);
//     return parsed;
//   } catch (err) {
//     console.error("❌ Gagal parsing hasil AI:", err.message);
//     return [];
//   }
// }

// export async function generateExampleWithTranslationAI(word) {
//   const prompt = `
//   Buat SATU kalimat pendek (maksimal 12 kata) dalam Bahasa Inggris yang menggunakan kata "${word}" secara natural dan sesuai konteks umum.

//   Lalu, TERJEMAHKAN kalimat tersebut ke dalam Bahasa Indonesia.

//   Tandai kata "${word}" di kalimat Bahasa Inggris dengan **bold**.

//   Lalu, di versi Bahasa Indonesia, kata TERJEMAHAN dari kata "${word}" JUGA harus ditandai dengan **bold**.

//   Contoh format:
//   English: She was **brave** enough to speak the truth.
//   Indonesian: Dia cukup **berani** untuk mengatakan yang sebenarnya.

//   ⚠️ Jangan tambahkan info atau penjelasan. Hanya dua baris itu.
//     `;

//   const aiResponse = await llamaClient(prompt);

//   const englishMatch = aiResponse.match(/English:\s*(.+)/i);
//   const indoMatch = aiResponse.match(/Indonesian:\s*(.+)/i);

//   const example_sentence = englishMatch?.[1]?.trim() || "";
//   const translated_sentence = indoMatch?.[1]?.trim() || "";

//   // Ambil kata hasil terjemahan dari kalimat Bahasa Indonesia
//   const translatedWordMatch = translated_sentence.match(/\*\*(.*?)\*\*/);
//   const translated_word = translatedWordMatch?.[1]?.toLowerCase() || "";

//   return {
//     example_sentence,
//     translated_sentence,
//     translated_word,
//   };
// }

// utils/ai.helper.js
import { llamaClient } from "./llamaClient.js";

// Fungsi utama: generate kata + kalimat contoh + terjemahan
export async function generateWordsByTopicAI(topic, limit = 10) {
  const prompt = `
  Buatkan ${limit} kata bahasa Inggris yang umum dan relevan dengan topik "${topic}". 
  Terjemahkan ke dalam Bahasa Indonesia secara kasual dan mudah dimengerti.
  Balas dalam format JSON array, seperti ini:
  
  [
    {"word": "travel", "translated_word": "perjalanan"},
    {"word": "adventure", "translated_word": "petualangan"}
  ]
  
  Jangan beri penjelasan tambahan, hanya balas array JSON tersebut saja.
  `;

  const response = await llamaClient(prompt);

  try {
    const parsed = JSON.parse(response);

    // Tambahkan kalimat contoh dan terjemahan untuk tiap kata
    const enriched = await Promise.all(
      parsed.map(async ({ word, translated_word }) => {
        const exampleData = await generateExampleWithTranslationAI(word);

        return {
          word,
          translated_word: translated_word || exampleData.translated_word,
          example_sentence: exampleData.example_sentence,
          translated_sentence: exampleData.translated_sentence,
        };
      })
    );

    return enriched;
  } catch (err) {
    console.error("❌ Gagal parsing hasil AI:", err.message);
    return [];
  }
}

// Fungsi untuk generate 1 contoh kalimat
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

  const translatedWordMatch = translated_sentence.match(/\*\*(.*?)\*\*/);
  const translated_word = translatedWordMatch?.[1]?.toLowerCase() || "";

  return {
    example_sentence,
    translated_sentence,
    translated_word,
  };
}
