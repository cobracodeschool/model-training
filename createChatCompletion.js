require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const inputData = require("./data/sample.json");

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
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "you're an a AI assistant that replies to all my questions in markdown format.",
        },
        { role: "user", content: "hi" },
        { role: "assistant", content: "Hi! How can I help you?" },
        { role: "user", content: `${prompt}?` },
      ],
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    });

    const answer = response.data.choices[0].message.content;
    console.log(answer);
    return answer;
  }
}

// Example usage
getAnswer("capital of Fran");
getAnswer("color of the sky?");
getAnswer("What is the highest mountain in the world?");
getAnswer("what is world fastest car");
