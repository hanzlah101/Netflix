import React from "react";
import { useRouter } from "next/router";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import FavouriteButton from "./FavouriteButton";
import useInfoModalStore from "@/hooks/useInfoModel";

interface MovieCardProps {
  movie: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  return (
    <div className="group bg-zinc-900 col-span relative">
      <img
        className="cursor-pointer object-cover transition rounded-md duration shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 dela w-full h-[160px]"
        src={movie?.thumbnailUrl}
        alt={movie?.title}
      />

      <div className="opacity-0 absolute top-0 transition duration-500 z-10 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          onClick={() => router.push(`/watch/${movie?.id}`)}
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[160px]"
          src={movie?.thumbnailUrl}
          alt={movie?.title}
        />

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 text-black lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => router.push(`/watch/${movie?.id}`)}
            >
              <TbPlayerPlayFilled className="md:text-2xl text-xl" />
            </div>

            <FavouriteButton movieId={movie?.id} />

            <div
              onClick={() => openModal(movie?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-2 rounded-full flex items-center justify-center border-white transition hover:border-neutral-300"
            >
              <FiChevronDown className="group-hover/item:text-neutral-300" />
            </div>
          </div>

          <p className="font-semibold mt-4 text[1rem] text-green-400">
            New <span className="text-white">{new Date().getFullYear()}</span>
          </p>

          <div className="flex flex-row mt-1 gap-2 items-center">
            <p className="text-[10px] text-sm">{movie?.duration}</p>
          </div>

          <div className="flex flex-row mt-1 gap-2 items-center">
            <p className="text-[10px] text-sm">{movie?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;