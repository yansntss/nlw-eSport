import express from 'express';
import { PrismaClient } from '@prisma/client';



const app = express();
const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });

  return res.json(games);

})

app.get('/games/:id/ids', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hourEnd: true,
    },
    where: {
      gameId
    }
  })
  return res.json(ads);


}) 

app.listen(3333)