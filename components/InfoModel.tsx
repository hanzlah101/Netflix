import React, { useState, useCallback, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import useMovie from "@/hooks/useMovie";
import useInfoModalStore from "../hooks/useInfoModel";
import PlayButton from "./PlayButton";
import FavouriteButton from "./FavouriteButton";

interface InfoModelProps {
  visible?: boolean;
  onClose: any;
}

const InfoModel: React.FC<InfoModelProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;
  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto drop-shadow-md bg-zinc-900 `}
        >
          <div className="relative h-96">
            <video
              muted
              autoPlay
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              className="brightness-[60%] object-cover h-full w-full"
            />

            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 rounded-full bg-black w-10 bg-opacity-70 flex items-center justify-center"
            >
              <CgClose size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>

              <div className="flex gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavouriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8 text-lg">
            <p className="text-green-400 font-semibold">New</p>
            <p>{data?.duration}</p>
            <p>{data?.genre}</p>
            <p>{data?.decription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;
