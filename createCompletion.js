require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const inputData = require("./data/sample.json");

const model = "text-davinci-003";

async function getAnswer(prompt) {
  // Search for the question in the input data
  const question = inputData.find((item) =>
    item.question.toLowerCase().includes(prompt.toLowerCase())
  );

  if (question) {
    // If the question is found, output the corresponding answer
    console.log(question.answer);
    return question.answer;
  } else {
    // If the question is not found, use OpenAI to generate an answer
    const response = await openai.createCompletion({
      model,
      prompt: prompt,
    });

    const answer = response.data.choices[0].text.trim();
    console.log(answer);
    return answer;
  }
}

// Example usage
getAnswer("capital of Fran");
getAnswer("color of the sky?");
getAnswer("What is the highest mountain in the world?");
getAnswer("capital of india");
