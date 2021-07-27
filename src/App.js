import React from 'react';
import './App.css'
import AppRoute from './components/AppRoute'
import Navbar from './components/Navbar';
import Footer from './components/Footer'

function App() {
 const bookingCount= useRef(0);







useEffect(()=>{
 bookingCount.current=1;
    

})


  return (
    <>
      <Navbar count={bookingCount} />
      <AppRoute />
      <Footer />
    </>
  );
}

export default App;
