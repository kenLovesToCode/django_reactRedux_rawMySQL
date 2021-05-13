from django.contrib import admin

from .models import Department, Course, Student, Purpose, Attendance

admin.site.register(Department)
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Purpose)
admin.site.register(Attendance)
