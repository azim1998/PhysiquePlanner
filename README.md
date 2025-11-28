# PhysiquePlanner

PhysiquePlanner is a web app for fitness enthusiasts to create, track, and modify workouts easily.

## Features
- User authentication with JWT token validation
- Create, edit, and delete workouts
- Track personalized routines
- Responsive, clean React frontend

## Tech Stack
- **Backend:** C# (.NET 8) Web API
- **Frontend:** React
- **Database:** SQL Server
- **Authentication:** JWT tokens

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/PhysiquePlanner.git
   cd PhysiquePlanner

2. Initialize user secrets for JWT token validation:
dotnet user-secrets init
dotnet user-secrets set "JWT:SigningKey" "Add_Your_Key_Here"

3. Run backend
dotnet restore
dotnet run

4. Start frontend
yarn install
yarn start

