import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Header from "@/components/Header";
import Billboard from "@/components/Billboard";
import MoviesList from "@/components/MoviesList";
import useMoviesList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModel from "@/components/InfoModel";
import useInfoModalStore from "@/hooks/useInfoModel";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMoviesList();
  const { data: favouriteMovies = [] } = useFavourites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <div>
      <Header />
      <Billboard />
      <InfoModel visible={isOpen} onClose={closeModal} />

      <div className="pb-40 mx-3">
        <MoviesList title="Trending Now" data={movies} />
        <MoviesList title="My Favourites" data={favouriteMovies} />
      </div>
    </div>
  );
}
