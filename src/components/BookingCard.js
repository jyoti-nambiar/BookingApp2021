import React , {useState} from 'react'
import ButtonBlue from './ButtonBlue';
import ButtonWhite from './ButtonWhite';
import axios from 'axios';
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ix6U6CxfG0XwLzbuosrl518XDhmHQtZq2M6mq0ng4tR2SJDtPxQ0bHDMrNIDYA18RoQBfG7pfRV8fOcx06PQPfB00AZ7w0YgS');


function BookingCard({image,cardId, product, date, time, price, changeState}) {

//for reschedule
const initialValues = {

        date: "",
        time: "",
      
    }


const token=localStorage.getItem("jwt");
const [btnClicked, setBtnClicked]= useState(false);
const [modalIsOpen, setIsOpen] = useState(false);
const [formValues, setFormValues] = useState(initialValues);
 const [modalOpenReschedule, setIsOpenReschedule] = useState(false);

    function deleteFunc(){
      setBtnClicked(true);   
   
axios.delete(`http://localhost:1337/user-bookings/${cardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    }}).then(res=>{console.log(res);

//passing value from child to parent via props for re-rendering of parent elements
      setTimeout(() => {
     changeState(btnClicked)
    
    }, 5000)
 

     });
    
    }
//reschedule (update request)
function reschedule(e){
  e.preventDefault();
axios.put(`http://localhost:1337/user-bookings/${cardId}`, {
            date: formValues.date,
            time: formValues.time

    }).then((res)=>{console.log("response for reschedule", res);
  closeModalReschedule();
window.location.reload();})

}
//modal for reschedule
function openModalReschedule() {
       setIsOpenReschedule(true)
       
    }
    

    function closeModalReschedule() {
        setIsOpenReschedule(false);
    }


function handleOnChange(e) {

        setFormValues({ ...formValues, [e.target.name]: e.target.value });

    }


  //modal for cancel
function openModal() {
       setIsOpen(true)
       
    }
    
    function closeModal() {
        setIsOpen(false);
    }

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


    //passing data to stripe server
const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axios.post('http://localhost:4242/create-checkout-session', {product:product, price:price});
//console.log(response.data);
    const sessionId = response.data.id;
    

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId
    });
if (result.error) {
  result.error.message="Transaction failure";
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }

  };


    return (

 <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
  <img className="w-full h-48" src={image} alt="home-service"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{product}</div>
    <p className="text-grey-darker text-base">
     <span className="font-bold">Date:</span> {date}
    </p>
     <p className="text-grey-darker text-base">
      <span className="font-bold">Confirmed timing: </span><span>kl.</span>{time} 
    </p>
  </div>
  <div className="px-6 py-4">
    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"><ButtonBlue btnValue="Reschedule" onClickFunc={openModalReschedule}/></span>
<Modal
                                    isOpen={modalOpenReschedule}
                                    onRequestClose={closeModalReschedule}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    ariaHideApp={false}
                                >

                                    <button onClick={closeModalReschedule}><i className="far fa-times-circle text-right"></i></button>
                                    <div>Reschedule booking</div>
                                    <form onSubmit={reschedule} >
                                        
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2" type="date" name="date" value={formValues.date} onChange={handleOnChange} />
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Preferred Time</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2" type="time" name="time"  min="09:00" max="18:00" required value={formValues.time} onChange={handleOnChange} />
                                        
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Submit</button>

                                    </form>
                                </Modal>


    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"> <ButtonWhite btnValue="Cancel" onClickFunc={openModal}/></span>
                                  <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    ariaHideApp={false}
                                >

                                  
                                    <button onClick={closeModal}><i className="far fa-times-circle text-right"></i></button>
                                    <div>Confirm Cancellation</div>
                                    <form onSubmit={deleteFunc}>
                                        
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-1" type="button" onClick={closeModal}>No</button>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow- m-1" type="submit" >Yes</button>


                                    </form>
                                </Modal>

<button role="link" onClick={handleClick}>
      Checkout
    </button>

  </div>
</div>




       
    ) 
}

export default BookingCard
 
     