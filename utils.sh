if [[ "$1" = "lint" ]]
then
    docker exec -it RHS-backend /bin/bash -c "yarn lint --fix"
fi
