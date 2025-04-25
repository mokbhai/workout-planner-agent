# Airia - AI-Powered Workout Planning

Airia is a personal AI workout coach that adapts to your fitness journey, powered by your fitness data from smart watches, Strava, and more.

## Features

- Personalized workout plans based on your fitness data
- Integration with Strava for activity tracking
- Modern, responsive UI built with Astro, React, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Strava API account

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/airia-landing-agent.git
   cd airia-landing-agent
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   # Server configuration
   PORT=3000
   NODE_ENV=development

   # Strava OAuth configuration
   STRAVA_CLIENT_ID=your_strava_client_id
   STRAVA_CLIENT_SECRET=your_strava_client_secret
   STRAVA_CALLBACK_URL=http://localhost:3000/auth/strava/callback

   # Session configuration
   SESSION_SECRET=airia-secret-key-change-in-production
   ```

### Setting up Strava OAuth

1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Create a new application with the following details:
   - Application Name: Airia
   - Website: http://localhost:3000
   - Authorization Callback Domain: localhost
3. After creating the application, you'll receive a Client ID and Client Secret
4. Update your `.env` file with these credentials

### Running the Application

1. Start the development server:

   ```
   npm run dev
   ```

2. Start the authentication server:

   ```
   npm run server
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Authentication Flow

The application uses Passport.js with the Strava OAuth2 strategy for authentication. The flow is as follows:

1. User clicks "Sign in with Strava" or "Sign up with Strava"
2. User is redirected to Strava's authorization page
3. After authorizing, Strava redirects back to the application
4. The application creates or updates the user account and logs them in
5. User is redirected to the dashboard

## Project Structure

- `src/components/` - React components
- `src/pages/` - Astro pages
- `src/layouts/` - Astro layouts
- `src/server/` - Express server and Passport configuration
- `src/assets/` - Static assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.
