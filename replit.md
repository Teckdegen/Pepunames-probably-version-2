# PepuNS - Decentralized Domain Name Service

## Overview

PepuNS is a decentralized domain name service (DNS) built on the PEPU network, allowing users to register and manage `.pepu` domain names. The application features a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and blockchain integration for domain ownership verification.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state management
- **Routing**: React Router for client-side navigation
- **Animations**: Framer Motion for smooth page transitions and UI animations
- **Wallet Integration**: RainbowKit with wagmi for Web3 wallet connections

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Development**: Hot reload with Vite integration

### Blockchain Integration
- **Network**: PEPU V2 (Pepe Unchained V2) - Custom Arbitrum-based chain
- **Wallet Support**: MetaMask, WalletConnect, and other popular wallets via RainbowKit
- **Transaction Handling**: Ethers.js for blockchain interactions

## Key Components

### Domain Management System
- **Domain Search**: Real-time availability checking with validation
- **Domain Registration**: Blockchain-based ownership with payment processing
- **Domain Validation**: Character restrictions, length limits, and format checking

### User Interface Components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: shadcn/ui for consistent, accessible UI components
- **Terminal Theme**: Unique terminal-inspired design elements
- **Loading States**: Comprehensive loading and error state management

### Payment Processing
- **Registration Fee**: 10 USDC for first-year registration
- **Treasury Wallet**: Centralized payment collection
- **Transaction Monitoring**: Real-time transaction status tracking

### External Integrations
- **Telegram Notifications**: Automated alerts for new registrations
- **Block Explorer**: Integration with PEPU network explorer
- **Supabase**: Cloud database services (referenced but may be replaced with local PostgreSQL)

## Data Flow

1. **Domain Search Flow**:
   - User enters domain name → Frontend validation → Backend availability check → Database query → Result display

2. **Registration Flow**:
   - Domain selection → Wallet connection → Network validation → Payment transaction → Transaction monitoring → Database registration → Success confirmation

3. **Blockchain Interaction**:
   - Wallet connection → Network switching (if needed) → Transaction signing → Block confirmation → Registration completion

## External Dependencies

### Core Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **@tanstack/react-query**: Server state management
- **@rainbow-me/rainbowkit**: Wallet connection interface
- **wagmi**: React hooks for Ethereum
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **framer-motion**: Animation library
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety
- **drizzle-kit**: Database migration tool
- **esbuild**: JavaScript bundler for production

### Blockchain Libraries
- **ethers**: Ethereum library for blockchain interactions
- **viem**: TypeScript interface for Ethereum

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite build process generating optimized static assets
- **Backend**: esbuild compilation to ESM format
- **Deployment**: Node.js server serving both API and static files
- **Database Migrations**: Drizzle migrations for schema management

### Configuration
- **Port**: Configurable via environment variables
- **Database**: PostgreSQL with Drizzle ORM schema
- **Static Assets**: Served from dist/public directory
- **API Routes**: Prefixed with /api for clear separation

## Changelog
- June 28, 2025: Initial setup
- June 28, 2025: Complete UI redesign to modern decentralized naming service
- June 28, 2025: Implemented USDC payment system on Pepe Unchained V2
- June 28, 2025: Added transaction verification before database operations

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Modern UI Redesign (June 28, 2025)
- Complete visual overhaul with dark theme and glassmorphism effects
- Modern gradient backgrounds and animated elements
- Improved mobile responsiveness and accessibility
- Enhanced user experience with smooth transitions

### Payment System Updates (June 28, 2025)
- Switched from ETH to USDC payments (10 USDC registration fee)
- Integrated USDC contract (0xC565AE272c15D1aCaFc25C3A92a56D33Fa280f01)
- Added real-time USDC balance checking
- Implemented transaction verification before database operations
- Added proper error handling for failed transactions

### Security Improvements (June 28, 2025)
- Only processes domain registration after successful blockchain transaction
- Verifies transaction receipt status before database operations
- Prevents partial registrations from failed payments
- No Telegram notifications sent for failed transactions