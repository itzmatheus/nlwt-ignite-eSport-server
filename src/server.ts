import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

import { convertHourStringToMinutes }  from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString }  from './utils/convert-minute-to-hour-string';

const prisma = new PrismaClient({log: ['query']});

app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return response.status(200).json(games);
});

interface RequestCreateGame {
    gameId: string;
    name: string;
    yearsPlaying: number;
    discord: string;
    weekdays: Array<number>;
    hourStart: string;
    hourEnd: string;
    useVoiceChannel: boolean
}

app.post('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id;
    const body: RequestCreateGame = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekdays: body.weekdays.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    });

    return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id;
   
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekdays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    response.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekdays: ad.weekdays.split(","),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
});

app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })
    
    response.status(200).json({
        discord: ad.discord
    })
});

app.listen(3333);