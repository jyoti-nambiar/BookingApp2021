import axios from 'axios';
import React, { useState, useEffect } from 'react'
import BookingCard from './BookingCard';


function MyBooking() {

const [bookings, setBookings] = useState([]);
const[deleteCard, setDeleteCard]=useState(false);
const[bookingcardCount, setbookingcardCount]=useState(0);
const userId=localStorage.getItem("userId");
const token=localStorage.getItem("jwt");

//fetch data from strapi
  useEffect(()=>{
const fetchData= async ()=>{

const response=await axios.get(`https://pik-span-strapi.herokuapp.com/user-bookings?users_permissions_user.id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});

//console.log("data it is",response.data);

let count= (response.data).length;
setbookingcardCount(count);
localStorage.setItem("numberOfBooking", count);
setBookings(response.data);

}

fetchData();

    }, [deleteCard]);


    return (

    <div className="grid grid-cols-3 gap-10 content-evenly m-10 min-h-screen">
       
{bookings.map( (booking)=>{
    console.log(booking);
 return(<><BookingCard key={booking.id} cardId={booking.id} image={booking.img }product={booking.product.name} date={booking.date} time={booking.time} price={booking.price} changeState={(cardDelete)=>{setDeleteCard(cardDelete)}} />

</>
   ); 
})
}
      </div>     
    )

}



export default MyBooking