from django.contrib import admin
from .models import Teacher,Student,CourseCategory,Course,Chapter,StudentCourseEnrollment

# Register your models here.
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(CourseCategory)
admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(StudentCourseEnrollment)