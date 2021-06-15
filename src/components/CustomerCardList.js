import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CustomerCard from './CustomerCard'



function CustomerCardList() {

    const [customer, setCustomer] = useState([]);

    useEffect(() => {

        const fetchCustomer = async () => {
            const response = await axios.get("http://localhost:1337/customers");

           // console.log(response.data);
            setCustomer(response.data);

        }

        fetchCustomer();
    }


        , []);


    return (

        <div className="flex flex-row p-20 justify-center align-center ">
            {customer.map((customer) => {
                //console.log(customer.image.formats.thumbnail.url)
                return (<CustomerCard key={customer.id} image={`http://localhost:1337${customer.image.formats.thumbnail.url}`} customerName={customer.name} content={customer.comment} />)


            })
            }
        </div>
    )
}

export default CustomerCardList
