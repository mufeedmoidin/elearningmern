import React,{useState,useEffect} from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../Components/pages/Home'
import Navbar from '../Components/Header/Navbar'
import '../css/style.css'
import Course from '../Components/pages/Course'
import ViewCourse from '../Components/pages/ViewCourse'
import CourseDescription from '../Components/pages/CourseDescription'
import Login from '../Components/pages/Login'
import Register from '../Components/pages/Register'
import CourseStatus from '../Components/pages/CourseStatus'
import CategoryCourse from '../Components/pages/CategoryCourse'
import Certificate from '../Components/pages/Certificate'
import Footer from '../Components/Footer/Footer'

export default function UserRouter() {
    const location = useLocation();
    const [token, setToken] = useState(true);
    const [count, setCount] = useState(false);


    const currentRoute = location.pathname;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('userToken')) == null) {
            setToken(false);
        } else {
            setToken(true);
        }


    }, [count])

    return (
        <div>
            {currentRoute.includes('/login') || currentRoute.includes('/register') ?
             <Routes>
                <Route exact path="/login" element={<Login count={count} setCount={setCount}/>} />
                <Route exact path="/register" element={<Register />} />
             </Routes>

             :
                <Navbar token={token} count={count} setCount={setCount}/>
            }

            <Routes>

                <Route exact path="/" element={<Home />} />
                <Route exact path="/all-course" element={<Course />} />
                <Route exact path="/view-course/:id" element={<ViewCourse />} />
                <Route exact path="/course-description/:id" element={<CourseDescription />} />
                <Route exact path="/course-status" element={<CourseStatus />} />
                <Route exact path="/category-course/:cat" element={<CategoryCourse />} />
                <Route exact path="/certificate/:id" element={<Certificate />} />




            </Routes>
            <Footer />
        </div>
    )
}
