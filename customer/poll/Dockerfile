FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY requirements.txt requirements.txt
COPY manage.py manage.py
COPY poller.py poller.py

# Copy the Django project and all Django apps
COPY ../api/customer_project customer_project
COPY ../api/customer_rest customer_rest
COPY ../api/common common

RUN pip install -r requirements.txt
RUN python manage.py collectstatic --no-input
CMD python manage.py migrate && gunicorn django_project.wsgi --bind 0.0.0.0:$PORT --log-file -
