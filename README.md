# Shop Manager

A modern shop management dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Dashboard with analytics
- Inventory management
- Order tracking
- Customer management
- Firebase integration
- Responsive design
- AI-powered insights with Genkit

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Firebase configuration values.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and configurations
- `src/firebase/` - Firebase configuration and services
- `src/hooks/` - Custom React hooks
- `src/ai/` - AI integration with Genkit

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI
- Firebase
- Lucide React
- Recharts
- Genkit AI

## Code Quality

This project includes:
- ESLint configuration for code quality
- Prettier for consistent formatting
- TypeScript strict mode
- Pre-commit hooks with Husky
- Automated linting and formatting on commit
