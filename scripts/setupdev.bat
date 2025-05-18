@echo off
echo === Setting Up Development Environment ===

echo 1. Setting up Python backend...
python -m venv env
call env\Scripts\activate
pip install -r backend\requirements.txt
alembic -c backend\alembic.ini upgrade head
sqlite3 backend\voting.db < backend\seed_data.sql

echo 2. Generating Python SDK...
npm install -g @openapitools/openapi-generator-cli
openapi-generator-cli generate -i http://localhost:8000/openapi.json -g python -o voting_sdk
pip install -e voting_sdk

echo 3. Setting up React frontend...
cd frontend
npm install
cd ..

echo === Setup Complete ===
echo Run the application using: runapplication.bat
pause