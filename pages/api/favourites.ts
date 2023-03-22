import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req);

    const favoriteMovies = await prisma.movie.findMany({
      where: { id: { in: currentUser.favoriteIds } },
    });

    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default handler;
