import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
function TeacherCourses(){
    const [courseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher-courses/'+teacherId)
            .then((res)=>{
                setCourseData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    const handleDeleteClick = (course_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this course and its chapters?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseUrl + '/course/' + course_id)
                        .then((res) => {
                            Swal.fire("Course and its chapters have been deleted.")
                            .then(()=>{
                                window.location.href = '/teacher-courses';
                            })
                        });
                } catch (error) {
                    Swal.fire('Error', 'Course and its chapters have not been deleted.');
                }
            } else {
                Swal.fire('Info', 'Course and its chapters have not been deleted.');
            }
        });
    };

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Teacher Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course,index) => 
                                    <tr>
                                        <td><Link to={'/all-chapters/'+course.id}>{course.title}</Link></td>
                                        <td><img src={course.featured_img} width="80" className='rounded' alt={course.title}></img></td>
                                        <td><Link to="/">{course.total_enrolled_students}</Link></td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(course.id)}>Delete</button>
                                            <Link class="btn btn-success btn-sm ms-2" to={'/add-chapter/'+course.id}>Add Chapters</Link>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    );
}

export default TeacherCourses;
