import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useBillboard from "@/hooks/useBillboard";
import PlayButton from "./PlayButton";
import useInfoModalStore from "@/hooks/useInfoModel";
import Loader from "./Loader";

const Billboard = () => {
  const { data, isLoading } = useBillboard();
  const { openModal } = useInfoModalStore();

  const handleOpenModel = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative h-[56.25vw]">
          <video
            className="w-full h-[56.25vw] object-cover brightness-[60%]"
            autoPlay
            muted
            loop
            poster={data?.thumbnailUrl}
            src={data?.videoUrl}
          />

          <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
            <p className="text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
              {data?.title}
            </p>

            <p className="text-[11px] md:text-lg mt-3 md:mt-8 md:w-[80%] w-[90%] lg:w-[50%] drop-shadow-xl">
              {data?.description}
            </p>

            <div className="flex items-center mt-3 md:mt-4 gap-3">
              <PlayButton movieId={data?.id} />
              <button
                onClick={handleOpenModel}
                className="bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center flex-row gap-1 hover:bg-opacity-20 transition"
              >
                <AiOutlineInfoCircle className="mb-[1.5px]" /> More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Billboard;
