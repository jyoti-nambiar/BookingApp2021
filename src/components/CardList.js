import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card'


function CardList() {
    const [products, setProduct] = useState([]);
    const [loadMore, setLoadMore] = useState(6);
    const [cardUpdate, setcardUpdate]=useState(true);
    const [loading, setLoading]=useState(true);
    const token=localStorage.getItem("jwt");
    const userId=localStorage.getItem("userId");
    useEffect(() => {
if(cardUpdate){

        const fetchProduct = async () => {
            
            const response = await axios.get(`https://pik-span-strapi.herokuapp.com/products?_limit=${loadMore}`);
            
        if(response){
            
        setProduct(response.data);
        setLoading(true);
        }
        }
        fetchProduct();

    }
setcardUpdate(false);

}, [loadMore, cardUpdate]);

    function loadMoreService() {
        let dynamicAdd = loadMore + 3;
        setLoadMore(dynamicAdd);


    }

    function loadLessService() {
        let dynamicReduce = loadMore - 3;
        setLoadMore(dynamicReduce);


    }


function deleteItem(id) {
//console.log("This is serviceId",id);
axios.delete(`https://pik-span-strapi.herokuapp.com/products/${id}?users_permissions_user.id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    }}).then(res=>{console.log(res);
      //setcardDelete(true);
 

     });
    
    }
    
if(products.length==0){
       
        <p>loading....</p>
    }
    

    return (
        <div className="grid grid-cols-3 gap-10 content-evenly m-10   ">

            {products.map((service) => {

                return (<Card key={service.id} serviceId={service.id} image={service.image} description={service.description} name={service.name} price={service.price} btnName="Book" stateChange={setcardUpdate} deleteService={deleteItem} />)


            })
            }

            {(products.length >= loadMore) ? (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={loadMoreService}>More Service</button>) :
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={loadLessService}>Show less </button>

            }


        </div>

    )
}

export default CardList
