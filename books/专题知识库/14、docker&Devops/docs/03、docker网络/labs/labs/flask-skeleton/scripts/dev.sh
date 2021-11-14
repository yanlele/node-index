#!/usr/bin/env bash

export APP_SETTINGS="skeleton.server.config.ProductionConfig"
python manage.py create_db
python manage.py create_admin
python manage.py create_data
python manage.py runserver -h 0.0.0.0
