import React from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="rounded-md py-1 md:py-2 px-2 md:px-4 bg-white flex items-center w-auto text-black text-xs lg:text-lg font-semibold flex-row gap-1 hover:bg-neutral-300 transition"
    >
      <TbPlayerPlayFilled /> Play
    </button>
  );
};

export default PlayButton;
