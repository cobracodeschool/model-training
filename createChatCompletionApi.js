require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const inputData = require("./data/sample.json");
app.use(bodyParser.json());
app.post("/get-answer", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const question = inputData.find((item) =>
      item.question.toLowerCase().includes(prompt.toLowerCase())
    );
    if (question) {
      console.log(question.answer);
      res.status(200).json({ answer: question.answer });
    } else {
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
      res.status(200).json({ answer: answer });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(3000, () => console.log("API listening on port 3000"));
