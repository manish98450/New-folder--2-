import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/teacher/';

function TeacherRegister(){
    const [teacherData, setteacherData] = useState({
        'full_name':'',
        'detail':'',
        'email':'',
        'password':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status':'',
    });

    //Change Elements values
    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }
    
    const submitForm=()=>{
        const teacherFormData = new FormData();
        teacherFormData.append("full_name",teacherData.full_name)
        teacherFormData.append("detail",teacherData.detail)
        teacherFormData.append("email",teacherData.email)
        teacherFormData.append("password",teacherData.password)
        teacherFormData.append("qualification",teacherData.qualification)
        teacherFormData.append("mobile_no",teacherData.mobile_no)
        teacherFormData.append("skills",teacherData.skills)

        try{
            axios.post(baseUrl,teacherFormData).then((response)=>{
                setteacherData({
                    'full_name':'',
                    'bio':'',
                    'email':'',
                    'password':'',
                    'qualification':'',
                    'mobile_no':'',
                    'skills':'',
                    'status':'success',
                });
            });
        }catch(error){
            console.log(error);
            setteacherData({'status':'error'})
        }
    };

    useEffect(()=>{
        document.title = 'Teacher Register'
    });

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true'){
        window.location.href='/teacher-dashboard';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {teacherData.status=='success' && <p class="text-success">Registered Successfully</p>}
                    {teacherData.status=='error' && <p class="text-danger">There was some error!!</p>}
                    <div className="card">
                        <h5 className="card-header">Teacher Register</h5>
                        <div className="card-body">
                        <form>
                                <div className="mb-3">
                                    <label for="full_name" className="form-label">Full Name</label>
                                    <input value={teacherData.full_name} onChange={handleChange} id="full_name" name="full_name" type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="detail" className="form-label">Bio</label>
                                    <textarea value={teacherData.detail} onChange={handleChange} id="detail" name="detail" className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input value={teacherData.email} onChange={handleChange} id="email" name="email" type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password</label>
                                    <input value={teacherData.password} onChange={handleChange} id="password" name="password" type="password" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="qualification" className="form-label">Qualification</label>
                                    <input value={teacherData.qualification} onChange={handleChange} id="qualification" name="qualification" type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="mobilenumber" className="form-label">Mobile Number</label>
                                    <input value={teacherData.mobile_no} onChange={handleChange} id="mobile_no" name="mobile_no" type="number" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="skills" className="form-label">Skills</label>
                                    <textarea value={teacherData.skills} onChange={handleChange} id="skills" name="skills" className="form-control"></textarea>
                                    <div id="emailHelp" class="form-text">Php, Python, Javascript, etc</div>
                                </div>
                                <button onClick={submitForm} type="button" className="btn btn-primary">Register</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegister;