import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddChapter(){
    const [chapterData,setChapterData] = useState({
        title:'',
        description:'',
        video:'',
        remarks:'',
    });

    const handleChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }

    const {course_id} = useParams();

    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append("course",course_id);
        _formData.append("title",chapterData.title);
        _formData.append("description",chapterData.description);
        _formData.append("video",chapterData.video,chapterData.video.name);
        _formData.append("remarks",chapterData.remarks);
        try{
            axios.post(baseUrl+'/chapter/',_formData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                window.location.href = '/all-chapters/'+course_id;
            });
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input onChange={handleChange} name='title' type="text" className="form-control" id="title"/>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} name='description' className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div>
                                <label for="video" className="form-label">Video</label>
                                <input onChange={handleFileChange} name='video' className="form-control" id="video" type="file"/>
                            </div>
                            <div className="mb-3">
                                <label for="remarks" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} name='remarks' className="form-control" placeholder="This video is focused on basic introduction." id="reamrks"></textarea>
                            </div>
                            <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    );
}

export default AddChapter;