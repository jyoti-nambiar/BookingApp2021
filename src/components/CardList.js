import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card'


function CardList() {
    const [products, setProduct] = useState([]);
    const [loadMore, setLoadMore] = useState(6);
    const [cardDelete, setcardDelete]=useState(false);
    const token=localStorage.getItem("jwt");
    const userId=localStorage.getItem("userId");
    useEffect(() => {
        console.log(process.env.URL);
        const fetchProduct = async () => {
            const response = await axios.get(`process.env.URL/products?_limit=${loadMore}`);
        console.log(response.data);
            setProduct(response.data);

        }
        fetchProduct();

    }, [loadMore]);

    function loadMoreService() {
        let dynamicAdd = loadMore + 3;
        setLoadMore(dynamicAdd);


    }

    function loadLessService() {
        let dynamicReduce = loadMore - 6;
        setLoadMore(dynamicReduce);


    }


function deleteItem(id) {
//console.log("This is serviceId",id);
axios.delete(`http://localhost:1337/products/${id}?users_permissions_user.id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    }}).then(res=>{console.log(res);
      //setcardDelete(true);
 

     });
    
    }





    return (
        <div className="grid grid-cols-3 gap-10 content-evenly m-10   ">


            {products.map((service) => {
                //console.log(service.image.formats.small.url);
                
                return (<Card key={service.id} serviceId={service.id} image={`http://localhost:1337${service.image.formats.thumbnail.url}`} description={service.description} name={service.name} price={service.price} btnName="Book" onDelete={deleteItem} />)


            })
            }

            {(products.length >= loadMore) ? (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={loadMoreService}>More Service</button>) :
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={loadLessService}>Show less </button>

            }


        </div>

    )
}

export default CardList
