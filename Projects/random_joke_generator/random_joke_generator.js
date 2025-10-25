/*
 * Project Name: Random Joke Generator 😂
 * Description:
 *   Displays a random programming joke every time the script runs.
 *
 * Example Output:
 *   💻 Why do programmers prefer dark mode?
 *   Because light attracts bugs!
 *
 * Usage:
 *   node random_joke_generator.js
 */

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "How many programmers does it take to change a light bulb? None – it’s a hardware problem!",
  "I told my computer I needed a break, and it said 'No problem — I’ll go to sleep.'",
  "There are 10 types of people in the world: those who understand binary and those who don’t.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'"
];

function getRandomJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

console.log("😂 Random Programming Joke:");
console.log(getRandomJoke());
