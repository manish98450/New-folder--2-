from django.db import models

class Teacher(models.Model):
    full_name = models.CharField(max_length = 100)
    detail = models.TextField(null=True)
    email = models.CharField(max_length = 100)
    password = models.CharField(max_length = 50)
    qualification = models.CharField(max_length = 100)
    mobile_no = models.CharField(max_length = 100)
    skills = models.CharField(max_length = 15)

    class Meta:
        verbose_name_plural = "Teacher"

class CourseCategory(models.Model):
    title = models.CharField(max_length = 150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "Course Category"

    def __str__(self):
        return self.title

class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete = models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete = models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length = 150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField(null=True)

    def __str__(self):
        return self.title
    
    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course = self).count()
        return total_enrolled_students

    class Meta:
        verbose_name_plural = "Course"

class Student(models.Model):
    full_name = models.CharField(max_length = 100)
    email = models.CharField(max_length = 100)
    password = models.CharField(max_length = 50)
    username = models.CharField(max_length = 100)
    mobile_no = models.CharField(max_length = 100)
    address = models.TextField()
    interested_categories = models.TextField()

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name_plural = "Student"

class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length = 150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "Chapter"

#Student Course Enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course,on_delete = models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student,on_delete = models.CASCADE, related_name='enrolled_students')
    enrolled_time = models.DateTimeField(auto_now_add = True)

    class Meta:
        verbose_name_plural = "Enrolled Courses"

    def __str__(self):
        return f"{self.course}-{self.student}"