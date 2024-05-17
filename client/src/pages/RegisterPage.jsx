import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import "../style/style.css"
import startImage from "../assets/login-register-image.png"

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleOnSubmit = async (event) => {
      event.preventDefault();
      console.log({ username, email, password, phoneNumber });
      try {
        await axios({
            method: "POST",
            url: "https://harrypotterserver.mushlihaadil.my.id" + `/register`,
            data: {
                username,
                email,
                password,
                phoneNumber    
            }
        });

        Swal.fire({
            title: "Register Success!",
            text: "Account Successfully Registered!",
            icon: "success"
        });
        
        navigate("/login");
      } catch (err) {
        console.log(err);
        Swal.fire({
            title: "Register Failed!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Ok"
        });
      }
    };
    return (
        <div className="register-container">
            <img className="regis-login-img" src={startImage}/>
            <form className="register-form d-flex justify-content-center align-items-center gap-3" onSubmit={handleOnSubmit}>
                <div className="register-items mb-3">
                    <label className="form-label">Username</label>
                    <input 
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}  
                    className="form-control" 
                    id="exampleInputUsername1"
                    placeholder="Your Username" 
                    />
                </div>
                <div className="register-items mb-3">
                    <label className="form-label">Email address</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder="Your Email Address" 
                    />
                </div>
                <div className="register-items mb-3">
                    <label className="form-label">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Your Password"
                    />
                </div>
                <div className="register-items mb-3">
                    <label className="form-label">Phone Number</label>
                    <input 
                    type="text"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)} 
                    className="form-control" 
                    id="exampleInputPhoneNumber1" 
                    placeholder="Your Phone Number"
                    />
                </div>
                <div className="register-items mb-3">
                    <button type="submit" className="btn btn-primary">
                    Register
                    </button>
                    <div className="text-light">
                        <p> 
                            You have an account?<Link to='/login'> Login now </Link>
                        </p>  
                    </div>
                </div>
            </form>
        </div>
    )
};