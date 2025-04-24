# Airia Landing Agent

This is the landing page for Airia Technologies Private Limited, built with Astro.js and React.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/your-username/landing-agent.git
cd landing-agent
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables (optional)**

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=4000
```

4. **Start the development server**

```bash
npm run dev
```

This will start the development server at [http://localhost:4321](http://localhost:4321) (or the port specified in your .env file).

### Building for Production

1. **Build the project**

```bash
npm run build
```

2. **Preview the production build**

```bash
npm run preview
```

or

```bash
node dist/server/entry.mjs
```

## 🐳 Docker Deployment

### Using Docker

1. **Build the Docker image**

```bash
docker build -t airia-landing-agent .
```

2. **Run the container**

```bash
docker run -p 4000:4000 -e PORT=4000 airia-landing-agent
```

The application will be available at [http://localhost:4000](http://localhost:4000).

### Using Docker Compose

1. **Create a docker-compose.yml file**

```yaml
version: "3"
services:
  web:
    build: .
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
```

2. **Start the services**

```bash
docker-compose up
```

## 📁 Project Structure

- `src/` - Source code
  - `components/` - React components
  - `layouts/` - Layout components
  - `pages/` - Astro pages
- `public/` - Static assets
- `dist/` - Build output (generated)

## 🛠️ Technologies Used

- [Astro](https://astro.build/) - Web Framework
- [React](https://reactjs.org/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

## 📝 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## 📞 Contact

For any questions or support, please contact us at [privacy@airia.in](mailto:privacy@airia.in).
