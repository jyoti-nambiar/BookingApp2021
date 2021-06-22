import axios from 'axios';
import React, { useState } from 'react'

function AddNewService() {

    const initialValues = {

        serviceName: "",
        description: "",
        price: 0

    }

    const [formValues, setFormValues] = useState(initialValues);
    const [uploadImage, setUploadImage] = useState();
const userId=localStorage.getItem("userId");
const token=localStorage.getItem("jwt");
    function handleOnChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })

    }
    function handleUploadImage(e) {
const cloudName="spik-span";
 var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  var fd = new FormData();
  fd.append("upload_preset", "bookingapp");
  fd.append("file", e.target.files[0]);
  const config = {
    headers: { "X-Requested-With": "XMLHttpRequest" },
  };
  axios.post(url, fd, config)
     .then(function (res) {
     console.log(res);
    setUploadImage(res.data.secure_url);

}).catch(function (err) {console.log(err)});

    
    }


    function handleOnSubmit(e) {
        e.preventDefault();
        axios.post(`https://pik-span-strapi.herokuapp.com/products?users_permissions_user.id=${userId}`, {
            name: formValues.serviceName,
            description: formValues.description,
            price: formValues.price,
            image:uploadImage
        },{
    headers: {
      Authorization: `Bearer ${token}`,
      
    }}).then((response) => {
            //console.log(response.data)
            
        }).catch((err) => console.log(err));


    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h2 className="font-bold text-center my-4 text-xl" >Add new Service </h2>
            <form className="w-full max-w-sm" onSubmit={handleOnSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Service Name
      </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" name="serviceName"
                            value={formValues.serviceName}
                            onChange={handleOnChange} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="description">
                            Description
      </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="textfield" name="description"
                            value={formValues.description}
                            onChange={handleOnChange}

                        ></textarea>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Price
      </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number"
                            name="price"
                            value={formValues.price}
                            onChange={handleOnChange} />
                    </div>

                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-2/3">
                        <input type="file" name="file" onChange={handleUploadImage} />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                            Add Service
      </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNewService
