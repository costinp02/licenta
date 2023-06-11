import Header from './Header'
import Footer from './Footer'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';


export default function Router() {
    const Layout = () => {
        return (
          <>
            <Header/>
            <Outlet/>
            <Footer/>
          </>
        )
      }

    const BrowserRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} >  {/* parent route; pages with header and footer*/}
                        <Route path="/home" element={<Home />} />
                        <Route path="/contact-us" element={<Contact/>} />
                        <Route path="/" element={<SignIn/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
    
    return (
        <BrowserRoutes/>
    )
}