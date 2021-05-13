from django.http import JsonResponse
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.utils import timezone
from datetime import datetime
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .models import Department, Course, Student, Purpose, Attendance


def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


def get_list(request, query):
    with connection.cursor() as cursor:
        cursor.execute(query)
        data = dictfetchall(cursor)
    return JsonResponse(data, safe=False)


def post_get_list(request, query, lst):
    with connection.cursor() as cursor:
        if len(lst) != 0:
            data = cursor.execute(query, lst)
        else:
            cursor.execute(query)
    return HttpResponse(status=201)


def delete_data(request, query, lst):
    with connection.cursor() as cursor:
        cursor.execute(query, lst)
    return JsonResponse({'message': 'Successfully deleted'}, status=status.HTTP_204_NO_CONTENT)


def update_data(request, query, lst, data):
    with connection.cursor() as cursor:
        cursor.execute(query, lst)
    return JsonResponse(data, safe=False)


def delete_data(request, query, lst):
    with connection.cursor() as cursor:
        cursor.execute(query, lst)
    return JsonResponse({'message': 'Records successfully deleted!'}, safe=False)


def get_detail(request, query, lst, fields):
    with connection.cursor() as cursor:
        cursor.execute(query, lst)
        result = cursor.fetchone()
        data = dict()
        if result:
            for x in range(len(fields)):
                data[fields[x]] = result[x]
        return JsonResponse(data, safe=False)
    return JsonResponse({'status': 'Bad Request'}, safe=False)


def search_student_timeout(request, query, lst, data):
    with connection.cursor() as cursor:
        cursor.execute(query, lst)
    if cursor.rowcount == 1:
        data['status'] = 200
    else:
        data['status'] = 401
    return data


@api_view(['GET', 'POST'])
def department_list(request):
    if request.method == 'GET':
        query = """SELECT id, course_code, title FROM logsheet_department"""
        return get_list(request, query)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        query = """INSERT INTO logsheet_department (course_code, title) VALUES (%b, %s)"""
        return post_get_list(request, query, [int(data['course_code']), str(data['title'])])


@api_view(['GET', 'PUT', 'DELETE'])
def department_detail(request, pk):
    if request.method == 'GET':
        query = """SELECT id, course_code, title from logsheet_department WHERE logsheet_department.id = %b"""
        fields = ["id", "course_code", "title"]
        return get_detail(request, query, [pk, ], fields)
    elif request.method == 'DELETE':
        query = """DELETE FROM logsheet_department WHERE id=%b"""
        return delete_data(request, query, [pk])
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        query = """UPDATE logsheet_department SET title=%s WHERE id=%b"""
        return update_data(request, query, [str(data['title']), pk], data)


@api_view(['GET', 'POST'])
def course_list(request):
    if request.method == 'GET':
        query = """SELECT logsheet_course.id,
                logsheet_course.title as course_title,
                logsheet_department.title as department_title
                FROM logsheet_course INNER JOIN logsheet_department
                ON logsheet_course.department_id=logsheet_department.id
                ORDER BY logsheet_department.title"""
        return get_list(request, query)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        title = data['course_title']
        department = data['department_title']
        query = """INSERT INTO logsheet_course (title, department_id) 
                VALUES(%s, (SELECT id FROM logsheet_department WHERE title=%s))"""
        return post_get_list(request, query, [title, department])


@api_view(['GET', 'PUT'])
def course_detail(request, pk):
    if request.method == 'GET':
        query = """SELECT logsheet_course.id,
                    logsheet_course.title,
                    logsheet_department.title
                    FROM logsheet_course INNER JOIN logsheet_department
                    ON logsheet_course.department_id=logsheet_department.id
                    WHERE logsheet_course.id = %b"""
        fields = ["id", "course_title", "department_title"]
        return get_detail(request, query, [pk], fields)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        course = data['course_title']
        department = data['department_title']
        query = """UPDATE logsheet_course SET title=%s, 
                department_id=(SELECT id FROM logsheet_department WHERE title=%s)
                WHERE id=%b"""
        return update_data(request, query, [course, department, pk], data)


@api_view(['GET', 'POST'])
def student_list(request):
    if request.method == 'GET':
        query = """SELECT logsheet_student.id_number AS id,
        logsheet_student.first_name,
        logsheet_student.last_name,
        logsheet_course.title AS course
        FROM logsheet_student
        INNER JOIN logsheet_course ON logsheet_student.course_id=logsheet_course.id
        ORDER BY logsheet_student.last_name
        """
        return get_list(request, query)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        student_id = int(data['id'])
        first_name = data['first_name']
        last_name = data['last_name']
        course = data['course']
        query = """INSERT INTO logsheet_student (id_number, first_name, last_name, course_id) 
            VALUES(%b, %s, %s, (SELECT id FROM logsheet_course WHERE title=%s))
            """
        return post_get_list(request, query, [student_id, first_name, last_name, course])


@api_view(['GET', 'PUT'])
def student_detail(request, pk):
    if request.method == 'GET':
        query = """SELECT logsheet_student.id_number AS id,
        logsheet_student.first_name,
        logsheet_student.last_name,
        logsheet_course.title AS course
        FROM logsheet_student
        INNER JOIN logsheet_course ON logsheet_student.course_id=logsheet_course.id
        WHERE logsheet_student.id_number=%b"""
        fields = ["pk", "id", "first_name", "last_name", "course"]
        return get_detail(request, query, [pk], fields)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        student_id = int(data['id'])
        first_name = data['first_name']
        last_name = data['last_name']
        course = data['course']
        query = """UPDATE logsheet_student SET id_number=%b, first_name=%s, last_name=%s, 
                course_id=(SELECT logsheet_course.id FROM logsheet_course WHERE logsheet_course.title=%s)
                WHERE logsheet_student.id_number=%b"""
        return update_data(request, query, [student_id, first_name, last_name, course, student_id], data)


@api_view(['GET', 'POST'])
def purpose_list(request):
    if request.method == 'GET':
        query = """SELECT id, title, description FROM logsheet_purpose ORDER BY title"""
        return get_list(request, query)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        title = data['title']
        description = data['description']
        query = """INSERT INTO logsheet_purpose(title, description) 
            VALUES(%s, %s)"""
        return post_get_list(request, query, [title, description])


@api_view(['GET', 'PUT', 'DELETE'])
def purpose_detail(request, pk):
    if request.method == 'GET':
        query = """SELECT id, title, description FROM logsheet_purpose WHERE logsheet_purpose.id = %b"""
        fields = ["id", "title", "description"]
        return get_detail(request, query, [pk, ], fields)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        purpose_id = int(data['id'])
        title = data['title']
        description = data['description']
        query = """UPDATE logsheet_purpose SET title=%s, description=%s WHERE id=%b"""
        return update_data(request, query, [title, description, purpose_id], data)
    elif request.method == 'DELETE':
        query = """DELETE FROM logsheet_attendance WHERE purpose_id=%b;
                DELETE FROM logsheet_purpose WHERE id=%b;"""
        return delete_data(request, query, [pk, pk])


@api_view(['GET'])
def attendance_using(request):
    if request.method == 'GET':
        query = """SELECT logsheet_attendance.id,
                logsheet_attendance.time_in AS time_in,
                logsheet_attendance.time_out AS time_out,
                logsheet_purpose.title AS purpose,
                logsheet_student.id_number AS student_id,
                auth_user.username AS staff
                FROM logsheet_attendance INNER JOIN logsheet_purpose ON logsheet_attendance.purpose_id=logsheet_purpose.id
                INNER JOIN logsheet_student ON logsheet_attendance.student_id=logsheet_student.id
                INNER JOIN auth_user ON logsheet_attendance.user_id=auth_user.id
                WHERE logsheet_attendance.time_out='USING'
                ORDER BY logsheet_attendance.id DESC"""
        return get_list(request, query)


@api_view(['GET', 'POST', 'PUT'])
def attendance_list(request):
    if request.method == 'GET':
        query = """SELECT logsheet_attendance.id,
                logsheet_attendance.time_in AS time_in,
                logsheet_attendance.time_out AS time_out,
                logsheet_purpose.title AS purpose,
                logsheet_student.id_number AS student_id,
                auth_user.username AS staff
                FROM logsheet_attendance INNER JOIN logsheet_purpose ON logsheet_attendance.purpose_id=logsheet_purpose.id
                INNER JOIN logsheet_student ON logsheet_attendance.student_id=logsheet_student.id
                INNER JOIN auth_user ON logsheet_attendance.user_id=auth_user.id
                ORDER BY logsheet_attendance.id DESC"""
        return get_list(request, query)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        time_in = datetime.strftime(timezone.now(), '%m/%d/%y @ %I:%M:%S %p')
        purpose = int(data['purpose'])

        test_student = int(data['student'])
        query = """SELECT id from logsheet_student WHERE id_number=%s"""
        fields = ["id"]
        student = get_user_detail(request, query, [test_student], fields)
        student_id = int(student['id'])
        user = int(data['user'])
        query = """INSERT INTO logsheet_attendance(time_in, time_out, purpose_id, student_id, user_id)
            VALUES(%s, 'USING', %b, %b, %b)"""
        return post_get_list(
            request, query, [time_in, purpose, student_id, user])
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        time_out = datetime.strftime(timezone.now(), '%m/%d/%y @ %I:%M:%S %p')
        student = int(data['student_id'])
        data['time_out'] = time_out
        query = """UPDATE logsheet_attendance SET time_out=%s
                WHERE time_out=%s AND student_id=(SELECT id FROM logsheet_student WHERE id_number=%b)"""
        return update_data(request, query, [time_out, 'USING', student], data)


# @api_view(['GET', 'POST'])
# def attendance_update(request):
#     if request.method == 'POST':
#         data = JSONParser().parse(request)
#         time_out = datetime.strftime(timezone.now(), '%m/%d/%y @ %I:%M:%S %p')
#         student = int(data['student_id'])

#         query = """SELECT * FROM logsheet_attendance
#                 INNER JOIN logsheet_student ON
#                 WHERE logsheet_attendance.time_out='USING'
#                 AND logsheet_student.student_id=%b"""
#         fields = ["id"]
#         res = get_user_detail(request, query, [student], fields)
#         print(f'mfaskflaksfjklasljkdf : {res}')
#         if res != None:
#             print(f'YESSSSSSS NAAAAAAAAAAAAAAAAA')
#         else:
#             print('WALAAAAAAAAAAAAAAAYS DATAAAA')

    # query = """UPDATE logsheet_attendance SET time_out=%s
    #         WHERE time_out='USING' AND student_id=%b"""
    # status = search_student_timeout(request, query, [time_out, student])
    # print(f'STAAAAAAAAATUTSUSS : {status}')
    # if status:
    #     return JsonResponse({'status': 'updated'}, safe=False)
    # return JsonResponse({'status': 'failed'}, safe=False)


@api_view(['GET'])
def attendance_detail(request, pk):
    if request.method == 'GET':
        query = """SELECT logsheet_attendance.id,
                    logsheet_attendance.time_in AS time_in,
                    logsheet_attendance.time_out AS time_out,
                    logsheet_purpose.title AS purpose,
                    logsheet_student.id_number AS student_id,
                    auth_user.username AS staff
                    FROM logsheet_attendance INNER JOIN logsheet_purpose ON logsheet_attendance.purpose_id=logsheet_purpose.id
                    INNER JOIN logsheet_student ON logsheet_attendance.student_id=logsheet_student.id
                    INNER JOIN auth_user ON logsheet_attendance.user_id=auth_user.id
                    WHERE logsheet_attendance.id=%b"""
        fields = ["id", "time_in", "time_out",
                  "purpose", "student_id", "staff"]
        return get_detail(request, query, [pk, ], fields)


def get_user_detail(request, query, lst, fields):
    with connection.cursor() as cursor:
        cursor.execute(query, lst)
        result = cursor.fetchone()
        data = dict()
        for x in range(len(fields)):
            data[fields[x]] = result[x]
        return data


@ api_view(['GET', 'POST'])
def user_login(request):
    try:
        if request.method == 'POST':
            data = JSONParser().parse(request)
            username = data['username']
            usr = User.objects.get(username=username)
            if not usr.check_password(data['password']):
                return JsonResponse({'response': 'Invalid credentials, try again!', 'status': 401}, safe=False)
                # return HttpResponse(status=403)

            query = """SELECT id, username FROM auth_user WHERE username=%s"""
            fields = ["id", "username"]
            initial = get_user_detail(request, query, [username], fields)

            query = """SELECT * FROM authtoken_token WHERE user_id=%b"""
            fields = ['token']
            initial1 = get_user_detail(request, query, [usr.id], fields)
            initial.update(initial1)
            initial.update({'status': 200})
            return JsonResponse(initial, safe=False)
    except:
        return JsonResponse({'response': 'Bad Request', 'status': 400})
