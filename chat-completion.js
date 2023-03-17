const openai = require("openai");
const prompt = "age of John Smith is ?";
const inputData = require("./data/sample.json");

async function run() {
  // Set up OpenAI API credentials
  openai.apiKey = "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";

  // Prompt the user for a question
  const question = prompt;

  // Get a response from OpenAI
  const response = await openai.createChatCompletion({
    prompt: question,
    model: "gpt-3.5-turbo",
    maxTokens: 1024,
    n: 1,
    stop: "\n",
    temperature: 0.5,
    presencePenalty: 0.5,
    frequencyPenalty: 0.5,
  });

  // Parse the response and find the corresponding answer in the input data
  const answer = inputData.find(
    (item) => item.question === response.choices[0].text.trim()
  ).answer;

  // Output the answer to the console
  console.log(answer);
}

run();
