FROM python:3.10

WORKDIR /app

COPY requirements.txt .

ENV DATABASE_PORT=3306
ENV DATABASE_NAME=clinic
ENV DATABASE_PASSWORD=Hana.2002
ENV DatabaseUrl=""

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD [ "bash", "-c" , "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]