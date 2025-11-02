import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = './phrases.json';

// Init
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// get phrases list
app.get('/phrases', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  res.json(data);
});

// add phrase
app.post('/phrases', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  const newPhrase = { id: crypto.randomUUID(), text };
  data.push(newPhrase);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json(newPhrase);
});

// delete phrase
app.delete('/phrases/:id', (req, res) => {
  const { id } = req.params;
  let data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  data = data.filter(p => p.id !== id);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.status(204).send();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
