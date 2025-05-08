// server.js
import express from 'express';
import { Groq } from 'groq-sdk';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/chat', async (req, res) => {
  const { userMessage } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'compound-beta',
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
    });

    const botReply = chatCompletion.choices[0].message.content;
    res.json({ botReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
