import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function EditChapter(){
    const [chapterData,setChapterData] = useState({
        course:'',
        title:'',
        description:'',
        prev_video:'',
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

    const {chapter_id} = useParams();

    const formSubmit=()=>{
        const _formData = new FormData();
        _formData.append("course",chapterData.course);
        _formData.append("title",chapterData.title);
        _formData.append("description",chapterData.description);
        if(chapterData.video!=''){
            _formData.append("video",chapterData.video,chapterData.video.name);
        }
        _formData.append("remarks",chapterData.remarks);
        try{
            axios.put(baseUrl+'/chapter/'+chapter_id,_formData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200){
                    Swal.fire({
                        title:'Data has been updated',
                        icon:'success',
                        toast:true,
                        timer:2000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false,
                    })
                    .then(() => {
                        window.location.href = `/all-chapters/${chapterData.course}`;
                    });
                }
            });
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/chapter/'+chapter_id)
            .then((res)=>{
                setChapterData({
                    course:res.data.course,
                    title:res.data.title,
                    description:res.data.description,
                    prev_video:res.data.prev_video,
                    remarks:res.data.remarks,
                    video:'',
                });
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Update Chapter</h5>
                        <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label for="title" className="form-label">Title</label>
                                <input onChange={handleChange} value={chapterData.title} name='title' type="text" className="form-control" id="title"/>
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} value={chapterData.description} name='description' className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div>
                                <label for="video" className="form-label">Video</label>
                                <input onChange={handleFileChange}  name='video' className="form-control" id="video" type="file"/>
                                {chapterData.prev_video &&
                                <video controls width="100%" classname="mt-2">
                                    <source src={chapterData.prev_video} type="video/webm" />
                                    <source src={chapterData.prev_video} type="video/mp4" />
                                </video>
                                }
                            </div>
                            <div className="mb-3">
                                <label for="remarks" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} value={chapterData.remarks} name='remarks' className="form-control" placeholder="This video is focused on basic introduction." id="reamrks"></textarea>
                            </div>
                            <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    )
}
export default EditChapter;