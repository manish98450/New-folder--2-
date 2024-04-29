import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function CourseChapters(){
    const [chapterData, setChapterData] = useState([]);
    const {course_id} = useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course-chapters/'+course_id)
            .then((res)=>{
                setChapterData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[course_id]);

    
    const handleDeleteClick=(chapter_id)=>{
        const Swal = require('sweetalert2');
        Swal.fire({
            title:'Confirm',
            text:'Are you sure you want to delete this chapter?',
            icon:'info',
            confirmButtonText:'Continue',
            showCancelButton:true,
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                    .then((res)=>{
                        Swal.fire("Data has been deleted.");
                        try{
                            axios.get(baseUrl+'/course-chapters/'+course_id)
                            .then((res)=>{
                                setChapterData(res.data);
                            });        
                        }catch(error){
                            console.log(error);
                        }
                    });
                }catch(error){
                    Swal.fire('Error','Data has not been deleted.');
                }
            }else{
                Swal.fire('Info','Data has not been deleted.');
            }
        });
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Chapters</h5>
                        <div className="card-body">
                        <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter,index) => 
                                    <tr>
                                        <td>{chapter.title}</td>
                                        <td>
                                            <video controls width="250">
                                            <source src={chapter.video.url} type="video/webm" />

                                            <source src={chapter.video.url} type="video/mp4" />
                                            </video>
                                        </td>
                                        <td>{chapter.remarks}</td>
                                        <td>
                                            <Link to={'/edit-chapter/'+chapter.id} className="btn btn-info">Edit</Link>
                                            <button onClick={()=>handleDeleteClick(chapter.id)} className="btn btn-danger ms-1">Delete</button>
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
    )
}

export default CourseChapters;