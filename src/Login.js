import React, { useState } from 'react'
import './Expense.css'
import toast, { Toaster } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const navigate= useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emailPattern = /^[\w.-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/i;
    const handleLogin = async (e) => {
        e.preventDefault()
        if (email === "") {
            toast.error("Please enter email");
            e.preventDefault()
        }
        else {
            if (!emailPattern.test(email)) {
                toast.error("Please enter valid email");
                e.preventDefault();
            }
        }

        if (password === "") {
            toast.error("Password cannot be empty");
            e.preventDefault()
        }
        else {
            if (password.length < 8) {
                toast.error("Password should be atleast 8 character long")
                e.preventDefault();
            }
        }


        if (email !== "" && password.length >= 8) {
            
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                    
                );
                const user = userCredential.user;
                
                if (user) {
                    navigate("/")
                }
            }
            catch (error) {

                toast.error(error.code)
            }


        }


    }
    return (
        <div >
    


            <div className="form-container">
                <small>EXPENSES-APP</small>
                <h2>Login</h2>



                <form onSubmit={(e) => handleLogin(e)}>
                    <div className="form-group row  w-75">
                        <label for="exampleInputEmail1" ><h5>Email Address</h5></label>
                        <input type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="form-info">
                            <small id="emailHelp" className="form-text text-muted"><b>We'll never share your email with anyone else.</b></small>
                        </div>
                    </div>

                    <div className="form-group row w-75" >
                        <label for="exampleInputPassword1"><h5>Password</h5></label>
                        <input type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-button">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;