import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import "../style/style.css"
import startImage from "../assets/login-register-image.png"

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            let {data } = await axios({
                method: "POST",
                url: "https://harrypotterserver.mushlihaadil.my.id" + `/login`,
                data: {
                    email: email,
                    password: password,
                }
            })

            Swal.fire({
                title: "Login Success!",
                text: "Account Successfully Login!",
                icon: "success"
            });
            localStorage.setItem("access_token", data.access_token);  
            navigate("/");
        } catch (err) {
            console.log(err);
                Swal.fire({
                title: "Login Failed!",
                text: err.response,
                icon: "error",
                confirmButtonText: "Ok"
            });  
        }
    }

    //GOOGLE LOGIN
    async function handleCredentialResponse(response) {
        // console.log("Encoded JWT ID token: " + response.credential);
        try {
        const { data } = await axios({
            method: "POST",
            url: "https://harrypotterserver.mushlihaadil.my.id" + `/google-login`,
            headers: {
            google_token: response.credential,
            },
        });
        
        Swal.fire({
            title: "Login Success!",
            text: "Account Successfully Login!",
            icon: "success"
        });
        
        localStorage.access_token = data.access_token;
        localStorage.email = data.email;
        navigate("/");
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Login Failed!",
                text: err.response,
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    function loadGoogleButton() {
        window.google.accounts.id.initialize({
            client_id: "416019115143-4oe8u57fomsbhsvaf2i4ttjad85b8voa.apps.googleusercontent.com",
            callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        window.google.accounts.id.prompt(); // also display the One Tap dialog 
    }

    useEffect(() => {
        loadGoogleButton();
      }, []);
      
    return (
        <>
        <div className="login-container">
            <img className="regis-login-img" src={startImage}/>
            <form className="login-form d-flex justify-content-center align-items-center gap-3" onSubmit={handleOnSubmit}>
                <div className="login-items mb-3">
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
                <div className="login-items mb-3">
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
                <div className="login-items mb-3">
                    <button type="submit" className="btn btn-primary">
                    Login
                    </button>
                    <div className="text-light">
                        <p> 
                            Dont't have an account?<Link to='/register'> Register</Link>
                        </p> 
                    </div>
                </div>
            </form>
            <div className="signIn-others">
                <p> Or Sign In With</p>
                <div id="buttonDiv"></div>
            </div>
        </div>
        
        
        </>
    )
};