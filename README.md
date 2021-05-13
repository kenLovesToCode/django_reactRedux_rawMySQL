# django_reactredux_rawMySQL

Django backend, React with Redux frontend, raw mySQL database

> git clone https://github.com/kenLovesToCode/django_reactRedux_rawMySQL.git

> cd django_reactRedux_rawMySQL

> cd frontend

> yarn

> yarn build

> cd ..

> cd backend

> pip install virtualenv

> virtualenv venv

> source venv/bin/activate

> pip install -r requirements.txt

###### create new database in mysql and name it as logsheetdb

###### but if you have different name or password, then set it also @ backend/settings.py

###### and open settings.py then change the name and password inside DATABASES = {

###### 'USER': 'your_user',

###### 'PASSWORD': 'your_password',

###### }

###### if not then proceed to this

> python manage.py migrate

###### create a superuser and just fill in the required details

> python manage.py createsuperuser

> python manage.py runserver

### open browser at http://localhost:8000

HAPPY CODING!
