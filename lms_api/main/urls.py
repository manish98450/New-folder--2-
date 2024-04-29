from django.urls import path
from . import views


urlpatterns = [
    #Teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login',views.teacher_login),

    #Student
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
    path('student-login',views.student_login),
    path('student-enroll-course/', views.StudentEnrolledCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),

    #Category
    path('category/', views.CategoryList.as_view()),

    #Course
    path('course/', views.CourseList.as_view()),
    path('course/<int:pk>/', views.CourseDetailView.as_view()),

    #Chapter
    path('chapter/', views.ChapterList.as_view()),

    #Specific Course Chapters
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),

    #Specific Chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),

    #Teacher Courses
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    
    #Course Detail
    path('teacher-courses-detail/0<int:pk>', views.TeacherCourseDetail.as_view()),


]
