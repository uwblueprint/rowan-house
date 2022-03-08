if [[ "$1" = "belint" ]]
then
    docker exec -it RHS-backend /bin/bash -c "yarn lint --fix"
elif [[ "$1" = "felint" ]]
then
    docker exec -it RHS-frontend /bin/bash -c "yarn lint --fix"
fi
