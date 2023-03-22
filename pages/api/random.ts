import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await serverAuth(req);

    const moviesCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default handler;
