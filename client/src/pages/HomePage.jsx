import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BookCard } from "../components/BookCard";
import { fetchBooks } from "../store/bookSlice";
import "../style/styleHome.css"

export const HomePage = () => {
    const books = useSelector((state) => {
      return state.books
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

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
