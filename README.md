# Pups & Pourovers

Rails application powered by [Inertia.js](https://inertia-rails.dev/) + React, Vite, and Tailwind CSS.

## Main tech
- Backend: Ruby on Rails 8.1, PostgreSQL
- Inertia: `inertia_rails` + `@inertiajs/react` (React 19 + TypeScript)
- Frontend tooling: Vite 7, Tailwind CSS 4

## Prerequisites
- Ruby 3.4 (see `.ruby-version` and `Gemfile`)
- Node.js 22+
- SQLite

## Setup and run locally
1. Install dependencies and prepare DB:
  - `bin/setup`
2. Start the app in development (Rails + Vite):
  - `bin/dev`
  - Rails runs on http://localhost:3000

> Note: it's important to use `localhost` and not `127.0.0.1` on macOS.
