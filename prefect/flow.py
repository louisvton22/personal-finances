from prefect import task, flow, get_run_logger
from prefect_docker.images import pull_docker_image
from prefect_docker.containers import (
    create_docker_container,
    start_docker_container,
    stop_docker_container,
    remove_docker_container,
    get_docker_container_logs,
)



# docker_container_block = DockerContainer.load("dbt-finances")
# create dbt iamge to create aggergate tables in database
# @task
# def run_dbt():
#     docker_container_block = DockerContainer.load("dbt-finances")

@flow(log_prints=True)
def run_dbt_flow():
    logger = get_run_logger()
    pull_docker_image(
        "ghcr.io/dbt-labs/dbt-postgres:1.8.1"
    )
    container = create_docker_container(
        image="ghcr.io/dbt-labs/dbt-postgres:1.8.1",
        command=["echo 'hello world! && sleep 60"]
    )
    start_docker_container(container_id=container.id)
    logs = get_docker_container_logs(container_id=container.id)
    logger.info(logs)
    stop_docker_container(container_id=container.id)
    remove_docker_container(container_id=container.id)
    return container
    


if __name__ == "__main__":
    run_dbt_flow.serve(name="dbt_finances_deployment",
                        tags=["dbt"],
                        )