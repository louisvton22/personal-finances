import datetime
from airflow import DAG
from docker.types import Mount
import platform
from airflow.providers.docker.operators.docker import DockerOperator

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False
}

dag = DAG(
    'dbt',
    default_args=default_args,
    description='dbt DAG',
    start_date= datetime.datetime.now(),
    catchup=False
)

t1 = DockerOperator(
    task_id='dbt_run',
    image='ghcr.io/dbt-labs/dbt-postgres:1.8.1',
    command=[
        'run',
        '--profiles-dir',
        '/root',
        '--project-dir',
        '/dbt',
        '--full-refresh'
    ],
    auto_remove=True,
    docker_url='unix://var/run/docker.sock',
    network_mode='bridge',
    mounts=[
        Mount(source='/Users/louiston/personal-finances/dbt_finances', target='/dbt', type='bind'),
        Mount(source='/Users/louiston/personal-finances/.dbt', target='/root', type='bind')
    ],
    #     Mount(source='c/Users/tonsa/Personal Finances/personal-finances/dbt_finances', target='/dbt', type='bind'),
    #     Mount(source='c/Users/tonsa/Personal Finances/personal-finances/.dbt', target='/root', type='bind')
    # ],
    dag=dag
)
