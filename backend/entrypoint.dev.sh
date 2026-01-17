#!/bin/sh

# Wait for database
if [ -n "$DATABASE_URL" ]
then
    echo "Waiting for postgres..."

    while ! nc -z db 5432; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start server
exec python manage.py runserver 0.0.0.0:8000
