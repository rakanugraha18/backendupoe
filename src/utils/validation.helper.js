export function validateWordData({
  word,
  translated_word,
  example_sentence,
  translated_sentence,
  topic,
}) {
  const errors = [];

  if (!word || !word.trim()) errors.push("Word is required.");
  if (!translated_word || !translated_word.trim())
    errors.push("Translated word is required.");
  if (!example_sentence || !example_sentence.trim())
    errors.push("Example sentence is required.");
  if (!translated_sentence || !translated_sentence.trim())
    errors.push("Translated sentence is required.");
  if (!topic) errors.push("Topic is required.");

  if (errors.length) {
    const errorMessage = errors.join(" ");
    throw new Error(`Word data validation failed: ${errorMessage}`);
  }
}
