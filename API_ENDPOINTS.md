# API Endpoints

## CORS Configuration
- Origins: `http://localhost:3000`, `https://your-frontend-domain.com`
- Credentials: `true`
- Methods: `GET, POST, PUT, DELETE, OPTIONS`

## User Endpoints
- `POST /api/users` - สร้างผู้ใช้
  ```json
  {
    "username": "string",
    "email": "string",
    "phone": "string", 
    "password": "string",
    "firstName": "string",
    "lastName": "string"
  }
  ```

- `GET /api/users` - ดึงรายการผู้ใช้
- `GET /api/users/:id` - ดึงผู้ใช้ตาม ID

## Charity Endpoints
- `POST /api/charities` - สร้างการกุศล
  ```json
  {
    "name": "string",
    "description": "string",
    "targetAmount": "number",
    "status": "active|completed|cancelled"
  }
  ```

- `GET /api/charities` - ดึงรายการการกุศล
- `GET /api/charities/:id` - ดึงการกุศลตาม ID

## Donation Endpoints
- `POST /api/donations` - สร้างการบริจาค
  ```json
  {
    "userId": "string",
    "charityId": "string", 
    "amount": "number",
    "message": "string"
  }
  ```

- `GET /api/donations` - ดึงรายการการบริจาค
- `GET /api/donations/user/:userId` - ดึงการบริจาคของผู้ใช้

## Response Format
```json
{
  "success": true|false,
  "data": {},
  "error": "string"
}
```