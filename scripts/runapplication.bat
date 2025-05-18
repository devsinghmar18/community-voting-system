@echo off
echo === Starting Application ===

echo 1. Starting FastAPI backend...
start cmd /k "call env\Scripts\activate && uvicorn app.main:app --reload"

echo 2. Starting React frontend...
start cmd /k "cd frontend && npm start"

echo === Application Running ===
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:3000
echo - API Docs: http://localhost:8000/docs
pause