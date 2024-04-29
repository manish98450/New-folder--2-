import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function AllCourses() {
    const [courseData, setCourseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/course/?page=${currentPage}&limit=6`)
                .then((res) => {
                    setCourseData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [currentPage]);

    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-4">Latest Courses</h3>
            <div className="row">
                {courseData.map((course) =>
                    <div className="col-md-3 mb-4" key={course.id}>
                        <div className="card">
                            <Link to={`/detail/${course.id}`}>
                                <img src={course.featured_img} className="card-img-top" alt={course.title} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Pagination start */}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    <li className="page-item"><span className="page-link">{currentPage}</span></li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
            {/* Pagination end */}
        </div>
    );
}

export default AllCourses;
