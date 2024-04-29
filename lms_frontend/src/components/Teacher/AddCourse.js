import { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import { useParams } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddCourse({}) {
    const teacher_id = localStorage.getItem('teacherId');
    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '', 
        title: '',
        description: '',
        f_img: '',
        techs: '',
    });
    // Fetch categories when page loads
    useEffect(() => {
        try {
            axios.get(baseUrl + '/category')
                .then((res) => {
                    setCats(res.data);
                    if (res.data.length > 0) {
                        setCourseData({
                            ...courseData,
                            category: res.data[0].id
                        });
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    };

    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append("category", courseData.category);
        _formData.append("teacher", teacher_id);
        _formData.append("title", courseData.title);
        _formData.append("description", courseData.description);
        _formData.append("featured_img", courseData.f_img, courseData.f_img.name);
        _formData.append("techs", courseData.techs);

        axios.post(baseUrl + '/course/', _formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((res) => {
                window.location.href = '/teacher-courses';
            })
            .catch((error) => {
                console.log('Error submitting course:', error);
                // Handle error here, show a message to the user or log it for debugging
            });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Category</label>
                                    <select name="category" className="form-control" value={courseData.category} onChange={handleChange}>
                                        {cats.map((category, index) => (
                                            <option key={index} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name='title' id="title" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" onChange={handleChange} name='description' id="description" rows="3"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="video" className="form-label">Featured Image</label>
                                    <input className="form-control" onChange={handleFileChange} name='f_img' id="video" type="file" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="techs" className="form-label">Technologies</label>
                                    <textarea className="form-control" onChange={handleChange} name='techs' placeholder="Php, Python, Javascript, etc." id="techs" rows="3"></textarea>
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

export default AddCourse;
