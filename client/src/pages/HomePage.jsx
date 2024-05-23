import { useState, useEffect } from "react";
import { BookCard } from "../components/BookCard";
import axios from "axios";
import "../style/styleHome.css"
import { ServerAPI } from "../utils/ServerAPI";

export const HomePage = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const { data } = await ServerAPI({
                method: "GET",
                url: "/books",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                }
            })

            setBooks(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [])

  return (
    <>
      <div className="container-home">
        <h2 className="mt-4 mb-2 ms-2" style={{textAlign:"center"}}>All Harry Potter Books</h2>

        <div className="card-container">
          {books.map((book) => {
            return <BookCard book={book} key={book.id} />;
          })}
        </div>
      </div>
    </>
  );
};
