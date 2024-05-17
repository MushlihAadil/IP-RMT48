import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/styleHome.css";

export const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const [favourite, setFavourite] = useState([]);

    const handleAddFavourite = async (title, ) => {

    }

  return (
    <>
        <div className="card">
          <img
            src={book.imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "20rem" }}
          />
          <div className="card-body d-flex justify-content-center gap-4 flex-column">
            <h5 className="card-title"> Title : {book.title} </h5>
            <h5 className="card-title"> Author : {book.author} </h5>
            <h5 className="card-title"> Release : {book.releaseDate} </h5>
            <h5 className="card-title"> Total Pages : {book.pages} </h5>
            <h6 className="card-title"> Description : {book.description} </h6>
            <h5 className="card-title"> Book Price : Rp. {book.price} </h5>
            <button className="btn" onClick="">Fav</button>
          </div>
        </div>
    </>
  );
};
