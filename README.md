# Community Digital Voting System

![Proposal List View](output_images/1.ai.png)

A full-stack application for creating and voting on community proposals, featuring a FastAPI backend and React frontend.

## Features

### Backend (FastAPI)
- Create proposals with deadlines
- Vote on active proposals (Yes/No/Abstain)
- Revoke votes while proposals are active
- Automatic proposal expiration
- Manual proposal closure
- SQLite database with Alembic migrations
- OpenAPI 3.0 compliance

### Frontend (React)
- View active/closed/expired proposals  
  ![Proposal List View](output_images/1.ai.png)
- Create new proposals  
  ![Create Proposal Interface](output_images/5.ai.png)
- Vote and revote functionality  
  ![Voting Interface](output_images/2.ai.png)
- Real-time proposal status updates  
  ![Vote Results - Yes](output_images/3.ai.png)  
  ![Vote Results - No](output_images/4.ai.png)
- Proposal detail view with votes

## UI Demonstration

### Proposal Management
1. **Create new proposals**  
   ![Proposal Creation](output_images/5.ai.png)

2. **View active proposals**  
   ![Proposal List](output_images/1.ai.png)

### Voting Process
1. **Cast your vote**  
   ![Voting Options](output_images/2.ai.png)

2. **See results after voting**  
   - When voting "Yes":  
     ![Yes Vote](output_images/3.ai.png)
   - When voting "No":  
     ![No Vote](output_images/4.ai.png)

## Technologies

- **Backend**: Python, FastAPI, SQLAlchemy, SQLite
- **Frontend**: React, Axios
- **Tools**: Alembic, OpenAPI Generator, Pytest

## Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/<your-username>/community-voting-system.git
   cd community-voting-system

2. **Backend setup**
    python -m venv env
    source env/bin/activate  # Linux/MacOS
    env\Scripts\activate  # Windows
    pip install -r requirements.txt
    alembic upgrade head

3. **Frontend setup**
    cd frontend
    npm install
    cd ..

### Usage

1. **Start backend**
    uvicorn app.main:app --reload

2. **Start frontend**
    cd frontend
    npm start

3. **Access application at http://localhost:3000**

### API Endpoints

| Method  | Endpoint                  | Description                  |
|---------|---------------------------|------------------------------|
| POST    | `/proposals/`             | Create new proposal          |
| GET     | `/proposals/`             | List all proposals           |
| GET     | `/proposals/{id}`         | Get proposal details         |
| POST    | `/proposals/{id}/vote`    | Submit vote                  |
| DELETE  | `/votes/{id}`             | Revoke vote                  |
| PATCH   | `/proposals/{id}/close`   | Close proposal manually      |
| DELETE  | `/proposals/{id}`         | Delete proposal              |
