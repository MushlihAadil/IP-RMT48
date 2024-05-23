import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/styleHome.css";
import { ServerAPI } from "../utils/ServerAPI";

export const FavouriteCard = ({ favourite }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleOnClickDelete = async () => {
    try {
      console.log(id)
      const { data } = await ServerAPI({
        method: "DELETE",
        url: `/favourites/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Success Delete!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/");

    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Delete Favourite Failed!",
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
          src={favourite.Book.imageUrl}
          className="card-img-top"
          alt="..."
          style={{ height: "20rem" }}
        />
        <div className="card-body d-flex justify-content-center gap-4 flex-column">
          <h5 className="card-title"> Title : {favourite.Book.title} </h5>
          <h5 className="card-title"> Quantity : {favourite.quantity} </h5>
          <h5 className="card-title">
            {" "}
            Book Price : Rp. {favourite.totalPrice}{" "}
          </h5>
          <div className="d-flex gap-3 justify-content-center">
            <button className="btn-buy">Buy</button>
            <Link
              className="btn btn-update"
              to={`/update/${favourite.Book.id}`}
            >
              Update
            </Link>
            <button
              className="btn-delete"
              onClick={() => {
                handleOnClickDelete(favourite.bookId);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
