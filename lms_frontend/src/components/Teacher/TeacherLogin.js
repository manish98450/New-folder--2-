import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
function TeacherLogin(){
    const [teacherLoginData, setteacherLoginData] = useState({
        email:'',
        password:'',
    });

    const [errorMsg, seterrorMsg]=useState('');

    //Change Elements values
    const handleChange=(event)=>{
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData = new FormData();
        teacherFormData.append('email',teacherLoginData.email)
        teacherFormData.append('password',teacherLoginData.password)
        try{
            axios.post(baseUrl+'/teacher-login',teacherFormData)
            .then((res)=>{
                if(res.data.bool==true){
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacherId',res.data.teacher_id);
                    window.location.href = '/teacher-dashboard';
                }
                else{
                    seterrorMsg('Invalid Email or Password');
                }
            });
        }catch(error){
            console.log(error);
        }
    };

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus=='true'){
        window.location.href='/teacher-dashboard';
    }

    useEffect(()=>{
        document.tile = 'Teacher Login'
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Teacher Login</h5>
                        <div className="card-body">
                        <form>
                                {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="email" className="form-label">Username</label>
                                    <input id="email" name="email" value={teacherLoginData.email} onChange={handleChange} type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Password</label>
                                    <input id="password" name="password"value={teacherLoginData.password} onChange={handleChange} type="password" className="form-control"/>
                                </div>
                            
                                <button onClick={submitForm} type="button" className="btn btn-primary">Login</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin;