import Header from './Header';
import Footer from './Footer';
import CourseDetail from './CourseDetail';
import Home from './Home';
import About from './About';
import TeacherDetail from './TeacherDetail';

//List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';


//users
import Login from './User/Login';
import Logout from './User/Logout';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import MyCourses from './User/MyCourses';
import FavouriteCourses from './User/FavouriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ChangePassword from './User/ChangePassword';

//Teachers
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherLogout from './Teacher/TeacherLogout';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherCourses from './Teacher/TeacherCourses';
import AddCourse from './Teacher/AddCourse';
import AddChapter from './Teacher/AddChapter';
import AllChapters from './Teacher/CourseChapters';
import EditChapter from './Teacher/EditChapter';
import UserList from './Teacher/UserList';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import TeacherChangePassword from './Teacher/TeacherChangePassword';




import {Routes as Switch ,Route} from 'react-router-dom';
import ProfileSetting from './User/ProfileSetting';

function Main() {
  return (
    <div className="App">
        <Header />
        <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:course_id" element={<CourseDetail />} />
            <Route path="/user-login" element={<Login />} />
            <Route path="/user-logout" element={<Logout />} />
            <Route path="/user-register" element={<Register/>} />
            <Route path="/user-dashboard" element={<Dashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/favourite-courses" element={<FavouriteCourses />} />
            <Route path="/recommended-courses" element={<RecommendedCourses />} />
            <Route path="/profile-setting" element={<ProfileSetting />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/teacher-login" element={<TeacherLogin />} />
            <Route path="/teacher-logout" element={<TeacherLogout />} />
            <Route path="/teacher-register" element={<TeacherRegister />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher-courses" element={<TeacherCourses />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/add-chapter/:course_id" element={<AddChapter />} />
            <Route path="/teacher-users" element={<UserList />} />
            <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
            <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
            <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/all-chapters/:course_id" element={<AllChapters />} />
            <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
            <Route path="/popular-courses" element={<PopularCourses />} />
            <Route path="/popular-teachers" element={<PopularTeachers />} />
            <Route path="/category/:category_slug" element={<CategoryCourses />} />
        </Switch>
        <Footer />
    </div>
  );
}

export default Main;
