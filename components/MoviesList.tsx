import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MoviesListProps {
  data: Record<string, any>[];
  title: string;
}

const MoviesList: React.FC<MoviesListProps> = ({ data, title }) => {
  if (isEmpty(data)) return null;

  return (
    <div className="py-4 md:px-12 mt-4 space-y-8">
      <div className="">
        <p className="text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
          {data.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
