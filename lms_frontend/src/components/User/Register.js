import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/student/';

function Register(){
    const [studentData, setStudentData] = useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'mobile_no':'',
        'address':'',
        'interested_categories':'',
    });

    const handleChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData = new FormData();
        studentFormData.append("full_name",studentData.full_name)
        studentFormData.append("email",studentData.email)
        studentFormData.append("password",studentData.password)
        studentFormData.append("username",studentData.username)
        studentFormData.append("mobile_no",studentData.mobile_no)
        studentFormData.append("address",studentData.skills)
        studentFormData.append("interested_categories",studentData.interested_categories)


        try{
            axios.post(baseUrl,studentFormData).then((response)=>{
                setStudentData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'username':'',
                    'mobile_no':'',
                    'address':'',
                    'interested_categories':'',
                    'status':'success',
                });
            });
        }catch(error){
            console.log(error);
            setStudentData({'status':'error'})
        }
    };

    useEffect(()=>{
        document.title = 'User Register'
    });

    const userLoginStatus = localStorage.getItem('userLoginStatus')
    if(userLoginStatus==='true'){
        window.location.href='/user-dashboard';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {studentData.status=='success' && <p class="text-success">Registered Successfully</p>}
                    {studentData.status=='error' && <p class="text-danger">There was some error!!</p>}
                    <div className="card">
                        <h5 className="card-header">User Register</h5>
                        <div className="card-body">
                        <form>
                        <div className="mb-3">
                                    <label for="full_name" className="form-label">Full Name</label>
                                    <input value={studentData.full_name} onChange={handleChange} id="full_name" name="full_name" type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input value={studentData.email} onChange={handleChange} id="email" name="email" type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password</label>
                                    <input value={studentData.password} onChange={handleChange} id="password" name="password" type="password" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input value={studentData.username} onChange={handleChange} id="username" name="username" type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="mobilenumber" className="form-label">Mobile Number</label>
                                    <input value={studentData.mobile_no} onChange={handleChange} id="mobile_no" name="mobile_no" type="number" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="address" className="form-label">Address</label>
                                    <textarea value={studentData.address} onChange={handleChange} id="address" name="address" className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="interested_categories" className="form-label">Interested Categories</label>
                                    <textarea value={studentData.interested_categories} onChange={handleChange} id="interested_categories" name="interested_categories" className="form-control"></textarea>
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

export default Register;