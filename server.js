import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI no está definida. ¡Asegúrate de configurarla en Render!");
    process.exit(1);
}

// try connet MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conexión a MongoDB Atlas exitosa.'))
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  });


// struct MongoDB
const phraseSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true }); 

const Phrase = mongoose.model('Phrase', phraseSchema);

const mapPhraseToClient = (phrase) => {
  const obj = phrase.toJSON ? phrase.toJSON() : phrase; 
  if (obj._id) {
      obj.id = obj._id;
      delete obj._id;
  }
  delete obj.__v;
  return obj;
};

// get phrases
app.get('/phrases', async (req, res) => {
  try {
    const phrases = await Phrase.find({});
    const formattedPhrases = phrases.map(mapPhraseToClient);
    res.json(formattedPhrases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener frases de la base de datos.' });
  };
});

// add phrase
app.post('/phrases', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });
  
  try {
    const newPhrase = new Phrase({ text });
    await newPhrase.save();
    res.status(201).json(mapPhraseToClient(newPhrase)); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la frase en la base de datos.' });
  }
});

// delete phrase
app.delete('/phrases/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await Phrase.findByIdAndDelete(id);
    
    if (!result) {
        return res.status(404).json({ error: 'Frase no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la frase.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));