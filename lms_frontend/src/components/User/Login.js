import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Login(){
    const [studentLoginData, setStudentLoginData] = useState({
        email:'',
        password:'',
    });

    const [errorMsg, seterrorMsg]=useState('');

    //Change Elements values
    const handleChange=(event)=>{
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData = new FormData();
        studentFormData.append('email',studentLoginData.email)
        studentFormData.append('password',studentLoginData.password)
        try{
            axios.post(baseUrl+'/student-login',studentFormData)
            .then((res)=>{
                if(res.data.bool==true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',res.data.teacher_id);
                    window.location.href = '/user-dashboard';
                }
                else{
                    seterrorMsg('Invalid Email or Password');
                }
            });
        }catch(error){
            console.log(error);
        }
    };

    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus=='true'){
        window.location.href='/user-dashboard';
    }

    useEffect(()=>{
        document.tile = 'Student Login'
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                        <form>
                        {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="email" className="form-label">Username</label>
                                    <input id="email" name="email" value={studentLoginData.email} onChange={handleChange} type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Password</label>
                                    <input id="password" name="password"value={studentLoginData.password} onChange={handleChange} type="password" className="form-control"/>
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

export default Login;