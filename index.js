require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const fs = require("fs");

const fileName = "file-FJBMhFRhsbUKKrivLZn7yICy";

// Stop sequence added Modal davinci:ft-personal-2023-03-15-06-22-08   
// company curie:ft-personal-2023-03-16-07-26-15

// 01. Prepare List

/* const prepareData = openai.createFile(
  fs.createReadStream("./data/company.jsonl"),
  "fine-tune"
);

prepareData
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// 02. Create fine tune
/* const response = openai.createFineTune({
  model: "curie",
  training_file: fileName,
});

response
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  }); */

// 03. listFineTuneEvents

/* setInterval(() => {
  const models = openai.listFineTuneEvents(
    "ft-Uc8yywTCSIRGFhMyqlhUCR8e",
    false
  );

  models
    .then((data) => {
      console.log(data.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, 5000); */

// 04. List fine tunes

/* setInterval(() => {
  const models = openai.listFineTunes();

  models
    .then((data) => {
      console.log(data.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, 3000); */

// 05. Console the data in the trained data

const model = "curie:ft-personal-2023-03-16-07-26-15";

const response = openai.createCompletion({
  model,
  // prompt: "What is the attendance record for employee 001, Emily Wilson?",
  prompt: "Hi",
  max_tokens: 500,
  stop: ["END"],
});

response
  .then((data) => {
    console.log(data.data.choices[0].text);
  })
  .catch((err) => {
    console.log(err);
  });

// 06. Delete the trained data Model

/* const model = "davinci:ft-personal-2023-03-14-11-53-39";

const response = openai.deleteModel(model);

response
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */
