import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Using the class notes provided, create a short quiz with multiple questions and answers to help study for an exam on the given material. 
Use multiple choice style questions. The possible answers should be relevant to the question.
The generated questions and options should be separated by new lines and start with Q for questions and a letter A,B,C,D for each option.
After each group of question and answer options, print a line of three asterisks
Then, print the correct answer letter AND the correct answer to the previous question, followed by another line of three asterisks.
Notes:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;