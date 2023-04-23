import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex gap-4 items-center bg-black bg-opacity-70">
        <IoIosArrowRoundBack
          className="cursor-pointer"
          onClick={() => router.push("/")}
          size={40}
        />
        <p className="text-xl lg:text-2xl font-bold flex items-center gap-4">
          <span className="font-light mb-1">Watching :</span>
          {data?.title}
        </p>
      </nav>

      <video autoPlay controls className="h-full w-full" src={data?.videoUrl} />
    </div>
  );
};

export default Watch;
