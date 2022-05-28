var words = ["APPLE", "BANANA", "CARROT", "MANGO"];

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export { randomWord };
