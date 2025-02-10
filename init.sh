#!/bin/bash

set -e

cd backend

python3 -m venv .venv

if [[ $SHELL == */bash ]]; then
    source .venv/bin/activate
elif [[ $SHELL == */zsh ]]; then
    source .venv/bin/activate
elif [[ $SHELL == */fish ]]; then
    source .venv/bin/activate.fish
else
    echo "Unsupported shell. Please activate the virtual environment manually."
    exit 1
fi


pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py makemigrations api
python manage.py migrate
python manage.py createsuperuser

cd ../frontend
npm i

echo "DONE"
cd ..
