import { Container, ToastContainer } from "react-bootstrap";
import Header from "./components/Header/Header";
import CarouselHome from "./components/CarouselHome/CarouselHome";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter as Router} from 'react-router-dom';
import {Suspense} from 'react';
import Loader from "./components/Loader/Loader";

import 'react-toastify/dist/ReactToastify.css';



function App() {
  

  return (
    <>
      <ToastContainer/>
      <Router>
            <Header/>
            <CarouselHome/>
            <Container style={{minHeight: '100vh', minWidth:'100%', padding:'0'}}>
            <Suspense fallback= {<Loader/>}>
               <AppRoutes/>
            </Suspense>  
            </Container>
            <Footer/>
      </Router>
    </>
  )
}

export default App
