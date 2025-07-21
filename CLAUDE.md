# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for a fitness tracking application built with a tRPC full-stack architecture. The application tracks workout logs, apparatus (equipment), and integrates with external fitness APIs for activity data.

## Architecture

**Monorepo Structure:**

- `apps/client/` - React frontend with Vite, Material-UI, and tRPC client
- `apps/server/` - Express.js backend serving tRPC API
- `packages/trpc-server/` - Shared tRPC router definitions and schemas
- `packages/db/` - Database layer with Prisma ORM (SQLite)
- `packages/eslint-config/` - Shared ESLint configuration
- `packages/cron/` - Background job processing

**Key Technologies:**

- tRPC v11 for type-safe API communication
- Zod v4 for schema validation
- Prisma with SQLite for database
- React 19 with Material-UI for frontend
- Express.js for backend server

## Development Commands

**Start Development Environment:**

```bash
pnpm dev
```

This concurrently starts all services: trpc-server build watch, db build watch, server dev, and client dev.

**Individual Package Commands:**

- Client: `pnpm --filter client run dev`
- Server: `pnpm --filter server run dev`
- Database build: `pnpm --filter db run build:watch`
- tRPC server build: `pnpm --filter trpc-server run build:watch`

**Build Commands:**

- Database: `pnpm --filter db run build`
- tRPC server: `pnpm --filter trpc-server run build`
- Server: `pnpm --filter server run build`

**Linting:**

- Server: `pnpm --filter server run lint`
- tRPC server: `pnpm --filter trpc-server run lint`

**Database Operations:**

- Generate Prisma client: Navigate to `packages/db/` and run standard Prisma commands
- Sync external data: `pnpm --filter db run sync-data`
- Database backup: `pnpm --filter db run db:backup`

## Code Patterns

**tRPC Integration:**

- Router definitions in `packages/trpc-server/src/routers/`
- Schemas in `packages/trpc-server/src/schemas/` using Zod v4
- Client-side usage through `@tanstack/react-query` with tRPC hooks

**Database Schema:**

- Main entities: User, Activity, Apparatus, Session, Log
- Activity model stores external fitness data (Strava integration)
- Apparatus model represents gym equipment with progression tracking
- Log model tracks individual workout sets

**Frontend Architecture:**

- React Router for navigation
- Material-UI components with custom theming
- Feature-based component organization under `src/components/feature/`
- Shared layouts in `src/components/layout/`

**Import Notes:**

- Uses workspace dependencies (`@repo/db`, `@repo/trpc-server`)
- Client uses zod v4 (zod/mini), server packages use zod v3
- SuperJSON for tRPC serialization

## Package Manager

Uses pnpm with workspace configuration. All commands should use pnpm, not npm or yarn.

## trpc procedure naming

Use the following procedure naming conventions

- series example (where series is both singular and plural)
  - `updateSeries` (just one)
  - `updateManySeries` (one or more)
  - `createSeries` (just one)
  - `createManySeries` (one or more)
  - `getSeries` (one)
  - `getAllSeries` (all)
  - `deleteSeries` (one)
  - `deleteManySeries` (one or more)
- posts example (where `post` is singular and `posts` is plural)
  - `updatePost` (just one)
  - `updateManyPosts` (one or more)
  - `upsertPost` (create or update one)
  - `upsertManyPosts` (create or update many)
  - `createPost` (just one)
  - `createManyPosts` (one or more)
  - `getPost` (one)
  - `getPostById` (one by ID - use when other identifiers exist)
  - `getPostWithAuthor` (one with specific relations)
  - `getPostWithRelations` (one with all or optional relations)
  - `getAllPosts` (all)
  - `getAllPostsWithAuthor` (all with specific relations)
  - `getAllPostsWithRelations` (all with all or optional relations)
  - `findPostsByAuthor` (filtered by specific field)
  - `findPostsByTag` (filtered by specific field)
  - `searchPosts` (text search or complex filters)
  - `deletePost` (one)
  - `deleteManyPosts` (one or more)

## trpc input schemas

The input schema should match the procedure name e.g.

- createPost -> createPostSchema
- createManyPosts -> createManyPostsSchema
- upsertPost -> upsertPostSchema
- findPostsByAuthor -> findPostsByAuthorSchema
- searchPosts -> searchPostsSchema

if only providing a single input (e.g. id), then the schema should be defined inside the procedure's input e.g.

```
getPost: publicProcedure.input(z.number()).query(...)
```
