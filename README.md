# Aryan Saini Dynamic Portfolio

Professional full-stack portfolio with a React/Vite frontend and an Express/MongoDB Atlas backend.

## Folder Structure

```text
root/
├── frontend/
├── backend/
└── README.md
```

## Environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
FRONTEND_URL=http://localhost:5173
```

For deployment, set `VITE_API_URL` to your Render/VPS backend URL and set `FRONTEND_URL` to your Vercel frontend URL.

## Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Admin

Open `http://localhost:5173/admin` and log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

The dashboard supports:

- Add project
- Upload project image
- Edit project
- Delete project

## API Routes

- `GET /api/health`
- `POST /api/admin/login`
- `GET /api/projects`
- `POST /api/projects/add`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

Uploaded images are stored in `backend/uploads/projects` and served from `/uploads/projects/<filename>`.
