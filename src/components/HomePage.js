import React from 'react'
import background from "../images/CleanHome.jpg";
import HomeDiv from './HomeDiv'
import CustomerCardList from './CustomerCardList'

function HomePage() {
    return (
        <>
            <div style={{
                backgroundImage: url("https://res.cloudinary.com/spik-span/image/upload/v1624387322/bookingapp/jdvi46fslkho3g76twlk.jpg"),

                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '70vh'


            }
            }>


            </div>
            <div className="flex flex-row p-20 justify-center align-center">
                <HomeDiv />

            </div>
            <div className="flex flex-col p-20 justify-center items-center   bg-gray-200">
                <h2 className="font-bold py-4 text-2xl">100% satisfaction guarantee</h2>
                <p className="text-center">After 400,000 cleanings from both private individuals and companies, our cleaning company has an average rating of 4.7 / 5. If you are not satisfied with your cleaning, we will make sure to correct it. Our customer service is open 5 days a week and there you always get help!</p>
                <CustomerCardList />


            </div>



        </>
    )
}

export default HomePage
