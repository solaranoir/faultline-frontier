
# ⚡ Faultline Frontier

**Learn the systems. Break the systems. Build them better.**

Faultline Frontier is an interactive learning platform for Python backend engineering, distributed systems, concurrency, and reliability testing.

Developed under **Noir Forge**, the project combines short lessons, failure simulations, knowledge checks, and hands-on Python challenges.

## Features

### Phase 1: Learning Foundation

- Reusable lesson content schemas
- Interactive simulation definitions
- Quiz and assessment schemas
- Python coding challenge definitions
- Runtime content validation with Zod
- React + TypeScript frontend
- Automated testing with Vitest

### Planned Features

- **The Failure Range:** Interactive distributed failure simulations
- **The Proving Grounds:** Python coding challenges evaluated with pytest
- **Bounty Board:** Daily engineering challenges
- **Marshal's Log:** Learning progress and completion history
- **Frontier Expeditions:** Multi-stage backend engineering projects

## Technology Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Vitest + React Testing Library
- Zod
- ESLint
- Node.js managed with mise

Planned backend: FastAPI, PostgreSQL, and isolated Python execution environments.

## Getting Started

### Prerequisites

- Git
- mise (recommended)
- Node.js and npm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/faultline-frontier.git
cd faultline-frontier

mise install
npm ci
```

### Start Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm run test:run
```

### Lint and Build

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
├── components/    # Reusable UI components
├── content/       # Lessons and learning materials
├── schemas/       # Zod validation and TypeScript types
├── test/          # Test configuration
└── App.tsx
```

## Development Workflow

- `main`: Stable integration branch
- `phase_1/1.0`: Initial foundation
- `phase_1/1.1-lesson-viewer`: Reusable lesson viewer
- Subsequent branches: Focused features and improvements

All feature branches should be reviewed through pull requests before merging into `main`.

## Roadmap

See `docs/Faultline_Frontier_Feature_Roadmap.pdf` for the development roadmap.

## Security

Future Python coding challenges will execute in isolated environments with resource limits and restricted access.

Submitted code must never execute directly within the application server.

## Project Status

**Phase 1: In development**

Part of the Noir Forge project ecosystem.

