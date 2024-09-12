FROM python:3.9

RUN pip install prefect

WORKDIR /app

COPY ./flow.py /app/flow.py

CMD ["prefect", "server", "start"]