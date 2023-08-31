import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Schedule from "../pages/Schedule";
import AdminDashboard from "../pages/AdminDasboard/AdminDashboard";
import CourseForm from "../pages/forms/course/CourseForm";
import RoomForm from "../pages/forms/room/RoomForm";
import StudentForm from "../pages/forms/student/StudentForm";
import TeacherForm from "../pages/forms/teacher/TeacherForm";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const BrowserRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {" "}
            {/* parent route; pages with header and footer*/}
            <Route path="/home" element={<Home />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/schedule" element={<Schedule />} />
            <Route path="/admin/course-form" element={<CourseForm />} />
            <Route path="/admin/room-form" element={<RoomForm />} />
            <Route path="/admin/student-form" element={<StudentForm />} />
            <Route path="/admin/teacher-form" element={<TeacherForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };

  return <BrowserRoutes />;
}
