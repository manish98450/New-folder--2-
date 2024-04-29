import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function CourseDetail() {
    const [courseData, setCourseData] = useState({});
    const [teacherData, setTeacherData] = useState({});
    const [chapters, setChapters] = useState([]);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [userLoginStatus, setUserLoginStatus] = useState([]);
    const [enrollStatus, setEnrollStatus] = useState([]);
    const { course_id } = useParams();
    const studentId = localStorage.getItem('studentId');

    const fetchData = async () => {
        try {
            // Fetch current course data
            const courseRes = await axios.get(`${baseUrl}/course/${course_id}`);
            setCourseData(courseRes.data);

            // Fetch teacher data
            const teacherRes = await axios.get(`${baseUrl}/teacher/${courseRes.data.teacher}`);
            setTeacherData(teacherRes.data);

            // Fetch chapters data
            const chaptersRes = await axios.get(`${baseUrl}/chapter/?course=${course_id}`);
            setChapters(chaptersRes.data);

            // Fetch related courses based on category excluding the current course
            const relatedCoursesRes = await axios.get(`${baseUrl}/course/?category=${courseRes.data.category}`);
            setRelatedCourses(relatedCoursesRes.data.filter(course => course.category === courseData.category && course.id !== parseInt(course_id)));

        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch current course data
                const courseRes = await axios.get(`${baseUrl}/course/${course_id}`);
                setCourseData(courseRes.data);
    
                // Fetch teacher data
                const teacherRes = await axios.get(`${baseUrl}/teacher/${courseRes.data.teacher}`);
                setTeacherData(teacherRes.data);
    
                // Fetch chapters data
                const chaptersRes = await axios.get(`${baseUrl}/chapter/?course=${course_id}`);
                setChapters(chaptersRes.data);
    
                // Fetch related courses based on category excluding the current course
                const relatedCoursesRes = await axios.get(`${baseUrl}/course/?category=${courseRes.data.category}`);
                setRelatedCourses(relatedCoursesRes.data.filter(course => course.category === courseData.category && course.id !== parseInt(course_id)));
    
            } catch (error) {
                console.error("Error:", error);
            }
        };
    
        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if(studentLoginStatus==='true'){
            setUserLoginStatus('success')
        }
    
        try {
            axios.get(baseUrl+'/fetch-enroll-status/'+studentId+'/'+course_id)
            .then((res)=>{
                if(res.data.bool===true){
                    setEnrollStatus('success');
                }
            })
        } catch (error) {
            console.error("Error:", error);
        }
    
        fetchData();
    
        // Cleanup function to reset enrollStatus
        return () => {
            setEnrollStatus([]);
        };
    }, [course_id, courseData.category, studentId]);
    

    const enrollCourse = async () => {
        const formData = new FormData();
        formData.append('course', course_id);
        formData.append('student', studentId);
        
        try {
            const res = await axios.post(`${baseUrl}/student-enroll-course/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if(res.status === 200 || res.status === 201){
                Swal.fire({
                    title: 'Course enrolled successfully',
                    icon: 'success',
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
                setEnrollStatus('success');
                
                // Fetch related courses after enrollment
                const relatedCoursesRes = await axios.get(`${baseUrl}/course/?category=${courseData.category}`);
                setRelatedCourses(relatedCoursesRes.data.filter(course => course.category === courseData.category && course.id !== parseInt(course_id)));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src={courseData.featured_img} className="img-thumbnail" alt="..." />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                    <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                    <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Students</p>
                    <p className="fw-bold">Rating: 4.5/5</p>
                    { enrollStatus === 'success' && userLoginStatus==='success' && 
                        <p><button type="button" className="btn btn-success">Enrolled</button></p>
                    }
                    { userLoginStatus==='success' && enrollStatus !== 'success' &&
                        <p><button onClick={enrollCourse} type="button" className="btn btn-success">Enroll Course</button></p>
                    }
                    { (userLoginStatus !== 'success') &&
                        <p><Link to="/user-login/" className="btn btn-success">Please login to enroll in this course.</Link></p>
                    }
            
                </div>
            </div>

            <div className="card mt-4">
                <h5 className="card-header">
                    Course Videos
                </h5>
                <ul className="list-group list-group-flush">
                    {chapters.map((chapter) => (
                        <li className="list-group-item" key={chapter.id}>
                            {chapter.title}
                            <span className="float-end">
                                <span className="me-5">Duration: {chapter.duration}</span>
                                <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={`#videoModal${chapter.id}`}><i className="bi-youtube"></i></button>
                            </span>
                            <div className="modal fade" id={`videoModal${chapter.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">{chapter.title}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="ratio ratio-16x9">
                                                <video controls>
                                                    <source src={chapter.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
            <div className="row mb-4">
                {relatedCourses.map((relatedCourse) => (
                    <div className="col-md-3" key={relatedCourse.id}>
                        <div className="card">
                            <Link to={`/detail/${relatedCourse.id}`}>
                                <img src={relatedCourse.featured_img} className="card-img-top" alt="..." />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/detail/${relatedCourse.id}`}>{relatedCourse.title}</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseDetail;
