import { Groq } from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function llamaClient(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant for language learning.",
      },
      { role: "user", content: prompt },
    ],
  });

  return completion.choices[0].message.content;
}
