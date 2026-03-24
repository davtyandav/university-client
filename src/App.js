import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import StudentList from "./components/student/StudentList";
import LessonList from "./components/lesson/LessonList";
import MentorList from "./components/mentor/MentorList";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import './styles/list.css'

const App = () => {
//   const navClasses = ({ isActive }) =>
//     isActive
//       ? "px-3 py-2 rounded-md bg-blue-500 text-white font-semibold"
//       : "px-3 py-2 rounded-md hover:bg-blue-200";

  return (
    <div className="panel" >
      <nav className="navbar">
       <div className="logo"> <img src="/logo.png" alt="" /></div>
        <NavLink to="/students" >Students</NavLink>
        <NavLink to="/lessons" >Lessons</NavLink>
        <NavLink to="/mentors" >Mentors</NavLink>
        <NavLink to="/login" >Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/students" />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/lessons" element={<LessonList />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;