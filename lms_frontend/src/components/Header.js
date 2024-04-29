import { Link } from 'react-router-dom';
function Header() {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Learn Online</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/all-courses">Courses</Link>
            {teacherLoginStatus === 'true' && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownTeacher" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Teacher
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownTeacher">
                  <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                </ul>
              </li>
            )}
            {studentLoginStatus === 'true' && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownStudent" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownStudent">
                  <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                </ul>
              </li>
            )}
            {(teacherLoginStatus !== 'true' && studentLoginStatus !== 'true') && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownGuest" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Guest
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownGuest">
                  <li><Link className="dropdown-item" to="/teacher-login">Teacher Login</Link></li>
                  <li><Link className="dropdown-item" to="/teacher-register">Teacher Register</Link></li>
                  <li><Link className="dropdown-item" to="/user-login">User Login</Link></li>
                  <li><Link className="dropdown-item" to="/user-register">User Register</Link></li>
                </ul>
              </li>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
