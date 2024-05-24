import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/styleHome.css";
import { ServerAPI } from "../utils/ServerAPI";

export const FavouriteCard = ({ favourite }) => {
  const navigate = useNavigate();
  
  const handleOnDelete = async () => {
    try {
      console.log(favourite)
      const { data } = await ServerAPI({
        method: "DELETE",
        url: `/favourites/${favourite.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Swal.fire({
        title: "Delete Favourite Success!",
        text: "Favourite Successfully Deleted!",
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
              id={favourite.Book.id}
            >
              Update
            </Link>
            <button className="btn-delete" onClick={handleOnDelete} id={favourite.Book.id}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
