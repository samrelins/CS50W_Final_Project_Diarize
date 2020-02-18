# Use an official Python runtime as a parent image
FROM python:3

# Set the working directory 
WORKDIR /usr/src/app

# Add requirements.txt to directory
# and install any needed packages specified in requirements.txt
COPY requirements.txt /usr/src/app
RUN pip install -r requirements.txt

# Add the remaining app files to directory
COPY . /usr/src/app

# Load data into app database
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py shell < load_example_data.py

# Runn django runserver command when app launches
CMD python manage.py runserver 0.0.0.0:8000

# Make the docker image by typing:
#    $ docker build -t diarize .
# Then spin up a container by typing:
#    $ docker run -it -p 8000:0000 diarize
