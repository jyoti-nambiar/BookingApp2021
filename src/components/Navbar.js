import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

function Navbar() {

    const [jwt, setJwt] = useState();
    const[role, setRole]=useState("");
    const token = localStorage.getItem("jwt");
   const [bookingCount,setCount]= useState(0);
    


useEffect(()=>{
 const count=localStorage.getItem("numberOfBooking");
    setCount(count);
 
},[]);




    useEffect(() => {

        setJwt(token);
      const roleOfUser=localStorage.getItem("designation");
        setRole(roleOfUser);
 
    }, [jwt]);


    
    function clearStorage() {

        localStorage.clear();
        window.location.reload();
    }


    return (

        <nav className="flex justify-between items-center bg-white text-black relative shadow-sm h-20 font-serif">
            <Link className="pl-8 text-3xl font-bold text-black-500" to="/">Spik&Span <i className="fas fa-spray-can"></i></Link>


            < div className="pr-8">
                <Link className="p-4" to="/">Home</Link>
                <Link className="p-4" to="/services">Our Services</Link>
                <Link className="p-4" to="/about">About Us</Link>
                <Link className="p-4" to="/myBooking">My Booking
                <span className="p-1">({bookingCount})</span>
                </Link>
                {/*Person with role admin can see Add new service */}
{(role==="admin")&&<Link className="p-4" to="/addService">Add Service</Link> }

               
                {jwt ? (
                    <Link onClick={clearStorage} className="p-4" to="/login">Logout</Link>) : (<><Link className="p-4" to="/Register">Register</Link>
                        <Link className="p-4" to="/login">Login</Link></>)}





            </div>
        </nav >

    )
}

export default Navbar