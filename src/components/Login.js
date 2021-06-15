import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
function Login() {


    const initialValues = {

        username: "",

        password: ""


    }

    const [formValues, setFormValues] = useState(initialValues)
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
const [jwt, setJwt] = useState("")
    const history = useHistory();


useEffect(()=>{

const JWT=localStorage.getItem("jwt");
setJwt(JWT);

},[])



    //function call for submit
    function onHandleSubmit(e) {

        e.preventDefault();


        // ska skickas till database via api /Api endpoint
        axios
            .post('http://localhost:1337/auth/local', {
                identifier: formValues.username,
                password: formValues.password
            })
            .then(response => {
                // Handle success.

                //setting token in localstorage
                const token = response.data.jwt;

                localStorage.setItem("jwt", token);
                //setting userid,username, designation(admin or not) in local storage
                localStorage.setItem("userId", response.data.user.id);
                 localStorage.setItem("username", response.data.user.username);
                 localStorage.setItem("designation",response.data.user.designation);
                
                setLoggedIn(true);
                setUsername(response.data.user.username);
                history.push("/services");
               window.location.reload();
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                setError(error.response.data.message[0].messages[0].message);

            });







    }


    //function called for input fields onchange
    function onHandleChange(e) {

        setFormValues({ ...formValues, [e.target.name]: e.target.value })

    }


    return (
        <>

            <div className="h-screen flex justify-center items-center">
                {(loggedIn||jwt) ? (<h2>Welcome {username}</h2>) : (


                    <div className="w-full max-w-xs">
                        <h1 className="text-2xl font-black my-4">Sign in to your account</h1>
                        <small className="text-red-600 my-4">{error}</small>
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onHandleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
      </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Password"
                                    name="username"
                                    value={formValues.username}
                                    onChange={onHandleChange}

                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
      </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={onHandleChange}
                                />

                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Sign In
      </button>
                                <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forgot-password">
                                    Forgot Password?
      </Link>
                            </div>
                        </form>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2021 Spik&Span Corp. All rights reserved.
  </p>
                    </div >
                )}
            </div >
        </>
    )
}

export default Login
