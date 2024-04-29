import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
const placeholderImage = 'logo512.png'; // Placeholder image

function Home() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        try {
            axios.get(baseUrl + '/course/?result=4')
                .then((res) => {
                    setCourseData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        document.title = 'Home';
    });

    return (
        <div className="container mt-4">
            <h3 className="pb-1 mb-4">Latest Courses<Link to="/all-courses" className="float-end">See ALL</Link></h3>
            <div className="row mb-4">
                {courseData.slice(0, 4).map((course, index) =>
                    <div className="col-md-3" key={index}>
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
            {/* End Latest Courses */}

            {/* Popular Courses - Placeholder */}
            <h3 className="pb-1 mb-4 mt-5">Popular Courses<Link to="/popular-courses" className="float-end">See ALL</Link></h3>
            <div className="row mb-4">
                {[1, 2, 3, 4].map((index) =>
                    <div className="col-md-3" key={index}>
                        <div className="card">
                            <img src={placeholderImage} className="card-img-top" alt="Placeholder" />
                            <div className="card-body">
                                <h5 className="card-title">Course Title</h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* End Popular Courses - Placeholder */}

            {/* Featured Teachers - Placeholder */}
            <h3 className="pb-1 mb-4 mt-5">Popular Teachers<Link to="/popular-teachers" className="float-end">See ALL</Link></h3>
            <div className="row mb-4">
                {[1, 2, 3, 4].map((index) =>
                    <div className="col-md-3" key={index}>
                        <div className="card">
                            <img src={placeholderImage} className="card-img-top" alt="Placeholder" />
                            <div className="card-body">
                                <h5 className="card-title">Teacher Name</h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* End Featured Teachers - Placeholder */}

            {/* Student Testimonials - Placeholder */}
            <h3 className="pb-1 mb-4 mt-5">Student Testimonials</h3>
            <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {/* Carousel indicators */}
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>
                    {/* Add more carousel items as needed */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* End Student Testimonials - Placeholder */}
        </div>
    );
}

export default Home;
