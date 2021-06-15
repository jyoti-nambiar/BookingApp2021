import axios from 'axios';
import React, { useState} from 'react'
import Modal from 'react-modal';
import ButtonRed from './ButtonRed';
import ButtonGreen from './ButtonGreen';
function Card({ serviceId, image, name, price, btnName, description, onDelete}) {
const initialValues = {

        serviceName: "",
        date: "",
        time: "",
        mobileNum: 0


    }

    //initial value for updating
const initialValuesForUpdate = {

        serviceName: name,
        description: description,
        price: price

    }


const [modalIsOpen, setIsOpen] = useState(false);
const [deletemodalIsOpen, setdeleteIsOpen] = useState(false);
const [updatemodalIsOpen, setUpdateIsOpen] = useState(false);
const [formValues, setFormValues] = useState(initialValues);
const [formValuesUpdate, setFormValuesUpdate] = useState(initialValuesForUpdate);
const [uploadImage, setUploadImage] = useState();
const url=image;
const username=localStorage.getItem("username");
const token=localStorage.getItem("jwt");
const userId = localStorage.getItem("userId");

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };


    
//booking modal

    function openModal() {
       setIsOpen(true)
       
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleOnChange(e) {

        setFormValues({ ...formValues, [e.target.name]: e.target.value });

    }


function handleOnChangeUpdate(e) {
        setFormValuesUpdate({ ...formValuesUpdate, [e.target.name]: e.target.value })

    }
    function handleUploadImage(e) {
console.log("This is the uploaded image",e.target.files[0]);
        setUploadImage(e.target.files[0])


    }


    //updating strapi user-bookings with data
    function handleOnSubmit(e) {
        e.preventDefault();
        closeModal();
        
        //load data in user-bookings in strapi
        
        axios.post("https://localhost:1337/user-bookings", {
            name: username,
            date: formValues.date,
            time: formValues.time,
            price:price,
            mobileNum: formValues.mobileNum,
            img:url,
            product: serviceId,
            users_permissions_user: userId
        },{
    headers: {
      Authorization: `Bearer ${token}`,
      
    }}).then((res) => {
            console.log("this is the reponse after upload",res);

        }).catch((err) => {

            console.log(err)
        });



    }

    //delete modal
function openModalDelete() {
       setdeleteIsOpen(true)
       
    }

    function closeModalDelete() {
        setdeleteIsOpen(false);
    }


//delete function
 const deleteItem = () => onDelete(serviceId);


//Update Function
function openModalUpdate() {
       setUpdateIsOpen(true)
       
    }

    function closeModalUpdate() {
        setUpdateIsOpen(false);
    }


function updateItem(){

axios.put(`https://localhost:1337/products/${serviceId}?users_permissions_user.id=${userId}`,{
            name: formValuesUpdate.serviceName,
            description: formValuesUpdate.description,
            price: formValuesUpdate.price
        },{
    headers: {
      Authorization: `Bearer ${token}`,
      
    }}).then(res=>{console.log(res);
      const data = new FormData();

            data.append("files", uploadImage);

            data.append("ref", "product") // collection it belongs in db, here its product
            data.append("refId", res.data.id)//which data it refers to 
            data.append("field", "image")// which field it refers to in the db

            axios.post("https://localhost:1337/upload", data
            ).then((res) => { console.log(res) }).catch((err) => { console.log(err) })


        }).catch((err) => console.log(err));


     };

    return (
        <>
            <div className="max-w-sm rounded overflow-hidden transition duration-500 ease-in-out bg-white-600 hover:bg-white-600 transform hover:-translate-y-1 hover:scale-110  ">
                <div>

                    <img src={image}  alt="" className="object-fill  w-full h-48" />

                    <div className="relative px-4 -mt-5  ">
                        <div className="bg-white p-6 rounded-lg shadow-lg">


                            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{name}</h4>

                            <div className="mt-1">
                                {price}
                                <span className="text-gray-600 text-sm">   kr</span>
                            </div>
                            <div className="mt-4">
                                {description}
                            </div>
                            <div className="mt-4">
                                <span className="text-teal-600 text-md font-semibold">4/5 ratings </span>
                                <span className="text-sm text-gray-600">(based on 234 ratings)</span>
                            </div>
                            <div className="mt-4">
                                {/*If logged in show modal or redirect to login */}
                                <button className="transition duration-500 ease-in-out bg-blue-600 hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110 px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={token?(openModal):(()=>  window.location.href='/login')}>{btnName}</button>
                                {/*Modal for booking a service */}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    ariaHideApp={false}
                                >
                                    <button onClick={closeModal}><i className="far fa-times-circle text-right"></i></button>
                                    <div>Booking Information</div>
                                    <form onSubmit={handleOnSubmit}>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2" type="text" name="serviceName" value={username} onChange={handleOnChange} />
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2" type="date" name="date" value={formValues.date} onChange={handleOnChange} />
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Preferred Time</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2" type="time" name="time"  min="09:00" max="18:00" required value={formValues.time} onChange={handleOnChange} />
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telenumber">Telephone Number</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2" type="number" name="mobileNum" value={formValues.mobileNum} onChange={handleOnChange} />
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Submit</button>

                                    </form>
                                </Modal>{(username==="admin")&&<>
                                    <ButtonRed btnValue="Delete" onClickFunc={openModalDelete} />
                                    <ButtonGreen btnValue="Update"  onClickFunc={openModalUpdate}/>
                           
                                        </>
                                }
                                {/*Delete modal */}
                                <Modal
                                    isOpen={deletemodalIsOpen}
                                    onRequestClose={closeModalDelete}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    ariaHideApp={false}
                                >

                                  
                                    <button onClick={closeModalDelete}><i className="far fa-times-circle text-right"></i></button>
                                    <div>Delete Service?</div>
                                    <form onSubmit={deleteItem}>
                                        
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1" type="button" onClick={closeModalDelete}>No</button>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow- m-1" type="submit" >Yes</button>
                                         </form>
                                </Modal>


                                    <Modal
                                    isOpen={updatemodalIsOpen}
                                    onRequestClose={closeModalUpdate}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    ariaHideApp={false}
                                >

                                  
                                    <button onClick={closeModalUpdate}><i className="far fa-times-circle text-right"></i></button>

<h2 className="font-bold text-center my-4 text-xl" >Update Service </h2>
            <form className="w-full max-w-sm" onSubmit={updateItem}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Service Name
      </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" name="serviceName"
                            value={formValuesUpdate.serviceName}
                            onChange={handleOnChangeUpdate} />
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
                            value={formValuesUpdate.description}
                            onChange={handleOnChangeUpdate}

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
                            value={formValuesUpdate.price}
                            onChange={handleOnChangeUpdate} />
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
                            Update Service
      </button>
                    </div>
                </div>
            </form>


</Modal>

                                 </div>    
                        </div>
                    </div>

                </div>
            </div>

        </>








    )
}

export default Card;
