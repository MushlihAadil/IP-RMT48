import "../style/styleHome.css";

export const BookCard = ({ book }) => {
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
            <h5 className="card-title"> Book Price : Rp. {book.price} </h5>
            <button className="btn btn-success">Fav</button>
          </div>
        </div>
    </>
  );
};
