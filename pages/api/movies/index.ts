import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await serverAuth(req);
    const movies = await prisma.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default handler;
