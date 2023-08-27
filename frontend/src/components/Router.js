import Header from './Header'
import Footer from './Footer'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Attempt2 from '../pages/Attempt2';
import GptSchedule from '../pages/gpt';


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
                        <Route path="/admin" element={<Attempt2/>} />
                        <Route path="/gpt" element={<GptSchedule/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
    
    return (
        <BrowserRoutes/>
    )
}