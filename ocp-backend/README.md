# OCP Backend API

Express + TypeScript + SQLite3 backend for OCP website.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Start production server:

```bash
npm start
```

## Database

The application uses SQLite3 for data storage. The database file (`database.sqlite`) is automatically created on first run.

### Tables

- **users**: User authentication and information
- **production**: Production data by site and product type
- **stocks**: Inventory management

## API Endpoints

### Health Check

- `GET /health` - Check server status

### Authentication

- `POST /api/auth/register` - Register new user
  - Body: `{ email, password, phone? }`
  - Returns: User data + JWT token in cookie
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: User data + JWT token in cookie
- `POST /api/auth/logout` - Logout user (clears cookie)
- `GET /api/auth/me` - Get current logged-in user (protected)
  - Requires: Valid JWT token in cookie or Authorization header

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
  - Body: `{ email, phone?, password }`
- `PUT /api/users/:id` - Update user
  - Body: `{ email, phone }`
- `DELETE /api/users/:id` - Delete user

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_PATH=./database.sqlite
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
```

## Project Structure

```
ocp-backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── database/        # Database configuration
│   ├── routes/          # API routes
│   └── index.ts         # Entry point
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Testing API

You can test the API using curl or any API client:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ocp.com","password":"secret123","phone":"0612345678"}' \
  -c cookies.txt

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ocp.com","password":"secret123"}' \
  -c cookies.txt

# Get current user (protected route)
curl http://localhost:5000/api/auth/me \
  -b cookies.txt

# Logout
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt

# Get all users
curl http://localhost:5000/api/users

# Get specific user
curl http://localhost:5000/api/users/1
```

## Authentication Flow

1. **Register/Login**: User submits credentials to `/api/auth/register` or `/api/auth/login`
2. **Token Generation**: Server validates credentials, generates JWT token
3. **Cookie Storage**: Server sends JWT token in httpOnly cookie
4. **Protected Routes**: Subsequent requests include cookie automatically
5. **Token Verification**: Middleware validates token on protected routes
6. **Logout**: Clear cookie to invalidate session
