import express from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/pogs', async (_, res) => {
  try {
    const allPogs = await prisma.pogs.findMany();

    if (allPogs.length === 0) {
      res.status(404).send('Not Found.');
    } else {
      res.status(200).json(allPogs);
    }
  } catch(e) {
    console.error(e)
    res.status(500).send('Internal Server Error.');
  }
})

app.get('/pogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const pogs = await prisma.pogs.findUnique({
      where: { id: Number(id) }
    });

    if (pogs === null) {
      res.status(404).send('Not Found.');
    } else {
      res.status(200).json(pogs);
    }
  } catch(e) {
    console.error(e);
    res.status(500).send('Internal Server Error.');
  }
})

app.post('/pogs', async (req, res) => {
  try {
    const { pogs_name, ticker_symbol, price, color } = req.body;

    const newPogs = await prisma.pogs.create({
      data: {
        pogs_name,
        ticker_symbol,
        price,
        color
      }
    });

    if (!pogs_name && !ticker_symbol && !price && !color) {
      res.status(422).send('Bad Request.');
    }
    else{
      res.status(201).json(newPogs);
    }
  } catch(e) {
    console.error(e);
    res.status(500).send('Internal Server Error.');
  }
})

app.put('/pogs/:id', async (req, res) => {
  try {
    const { pogs_name, ticker_symbol, price, color } = req.body;
    const id = req.params.id;

    if (!pogs_name || !ticker_symbol || !price || !color) {
      res.status(422).send('Bad Request.');
    } else {
      const updatedPogs = await prisma.pogs.update({
        where: { id: Number(id) },
        data: {
          pogs_name,
          ticker_symbol,
          price,
          color
        }
      });
      res.status(200).json(updatedPogs);
    }
  } catch(e) {
    console.error(e);
    res.status(500).send('Internal Server Error.');
  }
})

app.delete('/pogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPogs = await prisma.pogs.delete({
      where: { id: Number(id) }
    });
    res.status(200).json(deletedPogs);
  } catch(e) {
    console.error(e);
    res.status(404).send('Not found');
  }
})

function startServer() {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
}

if (process.env.NODE_ENV !== 'test') {
  startServer()
}