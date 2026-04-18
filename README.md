# Welcome to your Expo app 👋
Right now we are using a hybrid protocol where we are using Supabase for authentication and to save our transcations and category data we are using the local storage(AsyncStorage). Making our Hybrid Application.

# Wallet Watcher - Authentication Integration

This project integrates Supabase Authentication into our Expo React Native application. It features protected routing, session persistence, and client-side form validation using React Hook Form and Zod.

## Team Members
* Aryan Saini (Lead Developer - Backend Engine & Routing)
* Alex (UI/UX - Zod Form Validation)
* Sargam (Infrastructure & Documentation)

## Setup Instructions
1. Clone this repository to your local machine.
2. Run `npm install` to install all dependencies.
3. (Imp) Create a `.env` file in the root directory and add the Supabase API keys provided directly by the development team in D2L.
4. Run `npm start` to start the development server.

## Supabase Notes
* We are using Supabase Auth for our user management system.
* Email confirmations have been disabled in our Supabase project settings to allow for instant testing.
* Session persistence is handled securely via `@react-native-async-storage/async-storage`.

## Test Account
To test the protected routing and session persistence without creating a new account, you may use the following credentials:
* **Email:** aryan@test.com
* **Password:** password123
