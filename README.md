AIleana Backend Mini Assessment
Overview

This project is a simplified backend service demonstrating how AIleana could handle:

User authentication

Wallet funding & payment flow

Call initiation and call session tracking

Payments and calls are mocked to focus on architecture, API design, and security.

Setup Instructions

```
git clone <repo-url>
cd aileana-backend
npm install
npm run dev
```

API Endpoints

Auth
| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | /api/auth/register | Register user   |
| POST   | /api/auth/login    | Login & get JWT |

Wallet
| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| GET    | /api/wallet         | Get wallet balance        |
| POST   | /api/wallet/fund    | Initiate wallet funding   |
| POST   | /api/wallet/webhook | Mock payment confirmation |

Calls
| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| POST   | /api/calls/start   | Start a call |
| POST   | /api/calls/end/:id | End a call   |
| GET    | /api/calls         | Call history |
