import React, { useState } from 'react'
import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
function Register() {
    const initialValues = {

        username: "",
        email: "",
        password: "",
        role:""


    }


    const [formValues, setFormValues] = useState(initialValues)
    const [isRegistered, setifRegistered] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();
    //function called for input fields onchange
    function onHandleChange(e) {

        setFormValues({ ...formValues, [e.target.name]: e.target.value })

    }
    //function call for submit
    function onHandleSubmit(e) {

        e.preventDefault();

        console.log("username:", formValues.username, "password:", formValues.password,"role", formValues.role );



        // ska skickas till database via api /Api endpoint
        axios.post('http://localhost:1337/auth/local/register', {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            designation:formValues.role
        }).then((e) => {
            //history.push("/login");
        console.log(e.data)
            setifRegistered(true);
        }).catch((error) => {
            console.log('An error occurred:', error.response);
            setError(error.response.data.message[0].messages[0].message);
        })

    }

    return (

        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-black my-4">Register Here!</h1>
            { isRegistered ? (

                <h2> You are now registered, Please Login to continue </h2 >

            ) : (

                <div className="w-full max-w-xs">
                    <div className="text-red-600 my-4">{error}</div>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onHandleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
  </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                                name="username"
                                value={formValues.username}
                                onChange={onHandleChange}

                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email
  </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email"
                                name="email"
                                value={formValues.email}
                                onChange={onHandleChange}

                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
  </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"
                                placeholder="Username"
                                name="password"
                                value={formValues.password}
                                onChange={onHandleChange}
                            />

                        </div>

                            <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Choose a role
                            </label>
                            <select name="role" id="role" value={formValues.role} onChange={onHandleChange}>
  <option name="role" >user</option>
  <option name="role" >admin</option>
  </select>
                        </div>






                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Register
  </button>
                            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 m-4" to="/login">
                                Already Registered? Login
  </Link>
                        </div>
                    </form >
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2021 Spik&Span Corp. All rights reserved.
</p>
                </div >
            )
            }
        </div >








    )
}

export default Register
