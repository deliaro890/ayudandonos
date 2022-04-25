# pull official base image
FROM python:3.8.0-alpine
FROM google/cloud-sdk
RUN apk --update add openjdk7-jre
RUN gcloud components install app-engine-java kubectl

# set work directory
WORKDIR /usr/src/ayudandonosapp

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc g++ python3-dev musl-dev curl gnutls-c++


#RUN curl -sSL https://sdk.cloud.google.com
#ENV PATH $PATH:/root/google-cloud-sdk/bin

# install dependencies
RUN pip install --upgrade pip 
RUN pip install --upgrade setuptools
#RUN pip install grpcio
COPY ./requirements.txt /usr/src/ayudandonosapp/requirements.txt
RUN pip install -r requirements.txt
#RUN pip install google-cloud-bigquery
#RUN pip install google-cloud-storage

#RUN pip3 install grpcio
# copy entrypoint.sh
COPY ./entrypoint.sh /usr/src/ayudandonosapp/entrypoint.sh

# copy project
COPY . /usr/src/ayudandonosapp/

# run entrypoint.sh
ENTRYPOINT ["/usr/src/ayudandonosapp/entrypoint.sh"]
