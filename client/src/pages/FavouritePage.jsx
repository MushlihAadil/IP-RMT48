import { useEffect, useState } from "react";
import { FavouriteCard } from "../components/FavouriteCard";
import { ServerAPI } from "../utils/ServerAPI";
import "../style/styleHome.css";

export const FavouritePage = () => {
  const [favourites, setFavourite] = useState([]);
  const fetchFavourites = async () => {
    try {
      const { data } = await ServerAPI({
        method: "GET",
        url: "/favourites",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setFavourite(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);
  return (
    <>
      <div className="container-home">
        <h2 className="mt-4 mb-2 ms-2" style={{ textAlign: "center" }}>
          Your Favourite Books
        </h2>

        <div className="card-container">
          {favourites.map((favourite) => {
            return <FavouriteCard favourite={favourite} key={favourite.bookId} />;
          })}
        </div>
      </div>
    </>
  );
};
