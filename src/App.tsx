import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import CarouselHome from "./components/CarouselHome/CarouselHome";
import AboutUs from "./components/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter as Router} from 'react-router-dom';
import {Suspense} from 'react';
import Loader from "./components/Loader/Loader";



function App() {
  

  return (
    <>
      <Router>
            <Header/>
            <CarouselHome/>
            <AboutUs/>
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
