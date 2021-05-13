from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Department(models.Model):
    course_code = models.SmallIntegerField()
    title = models.CharField(max_length=255)

    # def save(self, *args, **kwargs):
    #     if not self.id:
    #         self.created = timezone.now()
    #     self.updated = timezone.now()
    #     return super(Department, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Course(models.Model):
    title = models.CharField(max_length=150)
    department = models.ForeignKey('Department', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title}-{self.department.course_code}'


class Student(models.Model):
    id_number = models.IntegerField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.first_name}_{self.last_name}@{self.id_number}'


class Purpose(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title


class Attendance(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    purpose = models.ForeignKey('Purpose', on_delete=models.CASCADE)
    time_in = models.CharField(max_length=200)
    time_out = models.CharField(max_length=200, default='USING')

    def __str__(self):
        return f'{self.student.id_number}_{self.purpose} [{self.time_in}-{self.time_out}]'
