# 🧩 La Vie de Jordi

This repository contains the frontend and backend server for **La Vie de Jordi**, containerized using Docker and easily deployable with a script.

---

## 📋 Requirements

- Docker
- Docker Compose
- Node.js
- Luck? I don't know why the backend does not work locally and also why the frontend cannot be built and opened locally.

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/laviedejordi.git
cd laviedejordi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

```bash
cp .env.example .env
```

Edit the `.env` file to configure your environment variables.

### 4. Make the deploy script executable

```bash
chmod +x deploy.sh
```

### 5. Deploy the Application

```bash
./deploy.sh
```

This will:

- Build your frontend (in `dist/`)
- Build the Docker image
- Launch the container with `docker compose up -d --build`

## ✅ Verifying Deployment

Check that the backend server is running by viewing logs:

```bash
docker compose logs -f backend
```

## 🛠️ Development

### Running the Application Locally

To run the application locally without Docker, you can use the following commands:

```bash
npm run dev
```

This will start both the frontend and backend servers in development mode.
You can access the frontend at `http://localhost:5173` and the backend at `http://localhost:3000`.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
