from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Teacher
        fields =['id','detail','full_name','email','password','qualification','mobile_no','skills','teacher_courses']
        depth=1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CourseCategory
        fields =['id','title','description']

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Chapter
        fields =['id','course','title','description','video','remarks']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Course
        fields =['id','category','teacher','title','description','featured_img','techs','course_chapters','total_enrolled_students']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'full_name', 'email', 'password', 'username', 'mobile_no', 'address', 'interested_categories']

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.StudentCourseEnrollment
        fields =['id','course','student','enrolled_time']