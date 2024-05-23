import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/styleHome.css";
import Swal from "sweetalert2";
import { ServerAPI } from "../utils/ServerAPI";

export const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const handleAddFavourite = async (
    bookId,
    title,
    price,
    quantity,
    totalPrice
  ) => {
    try {
      const { data } = await ServerAPI({
        method: "POST",
        url: `/favourites/${bookId}`,
        data: {
          title,
          price,
          quantity,
          totalPrice,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Success Add Book to Your Favorite!",
        icon: "success",
      });

      navigate("/favourites");
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Add to Favourite Failed!",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

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
          <div className="d-flex justify-content-center">
            <button
              className="btn"
              onClick={() => {
                handleAddFavourite(book.id, book.title, book.price);
              }}
            >
              Fav
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
