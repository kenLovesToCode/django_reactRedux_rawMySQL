from django.urls import path
from .views import department_detail, department_list, course_list, course_detail, attendance_list, attendance_detail, purpose_list, purpose_detail, student_detail, student_list, user_login, attendance_using

urlpatterns = [
    path('departments/', department_list, name='department_list'),
    path('departments/<int:pk>/', department_detail, name='department_detail'),
    path('courses/', course_list, name='course_list'),
    path('courses/<int:pk>/', course_detail, name='course_detail'),
    path('attendances/', attendance_list, name='attendance_list'),
    path('attendances/using/', attendance_using, name='attendance_using'),
    path('attendances/<int:pk>/', attendance_detail, name='attendance_detail'),
    path('purposes/', purpose_list, name='purpose_list'),
    path('purposes/<int:pk>/', purpose_detail, name='purpose_detail'),
    path('students/', student_list, name='student_list'),
    path('students/<int:pk>/', student_detail, name='student_detail'),
    path('user-login/', user_login, name='user-login'),
]
