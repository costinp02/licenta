import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import AdminSchedule from '../pages/Schedules/AdminSchedule'
import StudentSchedule from "../pages/Schedules/StudentSchedule";
import TeacherSchedule from "../pages/Schedules/TeacherSchedule";
import AdminDashboard from "../pages/AdminDasboard/AdminDashboard";
import CourseForm from "../pages/forms/course/CourseForm";
import RoomForm from "../pages/forms/room/RoomForm";
import StudentForm from "../pages/forms/student/StudentForm";
import TeacherForm from "../pages/forms/teacher/TeacherForm";
import ViewALLRooms from "../pages/view/ViewAllRooms";
import ViewAllStudents from "../pages/view/VIewAllStudents";
import ViewAllTeachers from "../pages/view/ViewAllTeachers";
import ViewAllCourses from "../pages/view/ViewAllCourses";
import RoomEdit from "../pages/edit/EditRoom";
import StudentEdit from "../pages/edit/EditStudent";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('access_token') && localStorage.getItem('refresh_token');

  if (!isLoggedIn) {
    return <SignIn />;
  }

  return children;
}

export default function Router() {
  const Layout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );

  const BrowserRoutes = () => (
    <BrowserRouter>
      <Routes>
        {/*Parent Route */}
        <Route path="/" element={<Layout />}> 
          {/*Children Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/student" element={<ProtectedRoute>< StudentSchedule /></ProtectedRoute>} />
          <Route path="/teacher" element={<ProtectedRoute>< TeacherSchedule /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute>< AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/schedule" element={<ProtectedRoute>< AdminSchedule /></ProtectedRoute>} />
          <Route path="/admin/course-form" element={<ProtectedRoute>< CourseForm /></ProtectedRoute>} />
          <Route path="/admin/room-form" element={<ProtectedRoute>< RoomForm /></ProtectedRoute>} />
          <Route path="/admin/student-form" element={<ProtectedRoute>< StudentForm /></ProtectedRoute>} />
          <Route path="/admin/teacher-form" element={<ProtectedRoute>< TeacherForm /></ProtectedRoute>} />
          <Route path="/admin/rooms-view" element={<ProtectedRoute>< ViewALLRooms /></ProtectedRoute>} />
          <Route path="/admin/students-view" element={<ProtectedRoute>< ViewAllStudents /></ProtectedRoute>} />
          <Route path="/admin/teachers-view" element={<ProtectedRoute>< ViewAllTeachers /></ProtectedRoute>} />
          <Route path="/admin/courses-view" element={<ProtectedRoute>< ViewAllCourses /></ProtectedRoute>} />
          <Route path="/admin/room-form/edit/:id" element={<ProtectedRoute><RoomEdit /></ProtectedRoute>} />
          <Route path="/admin/student-form/edit/:id" element={<ProtectedRoute><StudentEdit /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  return <BrowserRoutes />;
}
