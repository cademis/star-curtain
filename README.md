# Star Curtain - pnpm + Nx Workspace

This is a monorepo using **pnpm workspaces** with **Nx** for task orchestration and build optimization.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all projects
pnpm build

# Run tests
pnpm test

# Lint all projects
pnpm lint
```

## 📁 Project Structure

```
star-curtain/
├── apps/
│   ├── client/          # React frontend app
│   └── server/          # Node.js backend app
├── packages/
│   ├── db/              # Database schema and utilities
│   ├── trpc-server/     # tRPC server configuration
│   ├── cron/            # Scheduled tasks
│   └── eslint-config/   # Shared ESLint configuration
└── nx.json              # Nx configuration
```

## 🛠️ pnpm + Nx Best Practices

### 1. **Workspace Dependencies**

Use workspace protocol for internal dependencies:

```json
{
  "dependencies": {
    "@repo/db": "workspace:*",
    "@repo/trpc-server": "workspace:^"
  }
}
```

- `workspace:*` - Exact version match
- `workspace:^` - Compatible version (recommended for most cases)

### 2. **Nx Commands**

#### Development

```bash
# Start all apps in development mode
pnpm dev

# Start only apps
pnpm dev:apps

# Start only packages in watch mode
pnpm dev:packages

# Start specific project
nx serve client
nx serve server
```

#### Building

```bash
# Build all projects
pnpm build

# Build only apps
pnpm build:apps

# Build only packages
pnpm build:packages

# Build specific project
nx build client
nx build db
```

#### Testing

```bash
# Test all projects
pnpm test

# Test only apps
pnpm test:apps

# Test only packages
pnpm test:packages

# Test specific project
nx test client
nx test db
```

#### Linting

```bash
# Lint all projects
pnpm lint

# Lint only apps
pnpm lint:apps

# Lint only packages
pnpm lint:packages

# Lint specific project
nx lint client
nx lint db
```

### 3. **Affected Commands**

Nx automatically detects which projects are affected by changes:

```bash
# Build only affected projects
pnpm affected:build

# Test only affected projects
pnpm affected:test

# Lint only affected projects
pnpm affected:lint
```

### 4. **Dependency Graph**

Visualize project dependencies:

```bash
pnpm graph
```

### 5. **Caching**

Nx provides intelligent caching:

- Build outputs are cached
- Test results are cached
- Lint results are cached
- Only affected projects are rebuilt

## 🔧 Configuration Files

### `pnpm-workspace.yaml`

Defines workspace packages:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### `nx.json`

Nx configuration with:

- Target defaults for build, test, lint
- Caching configuration
- Plugin setup

### `project.json`

Each project has its own configuration:

- Build targets
- Test configuration
- Lint rules
- Dependencies

## 📦 Package Management

### Adding Dependencies

```bash
# Add to root (dev dependency)
pnpm add -D typescript

# Add to specific app
pnpm add react --filter client

# Add to specific package
pnpm add zod --filter @repo/db

# Add workspace dependency
pnpm add @repo/db --filter client
```

### Removing Dependencies

```bash
# Remove from specific project
pnpm remove react --filter client

# Remove from all projects
pnpm remove -r typescript
```

## 🏗️ Build Pipeline

1. **Dependencies**: Nx builds projects in dependency order
2. **Caching**: Unchanged projects use cached outputs
3. **Parallel**: Independent projects build in parallel
4. **Incremental**: Only affected projects rebuild

## 🧪 Testing Strategy

- **Unit Tests**: Jest for all packages
- **E2E Tests**: Playwright (if needed)
- **Coverage**: Automatic coverage reports
- **Parallel**: Tests run in parallel when possible

## 🔍 Development Workflow

1. **Start Development**:

   ```bash
   pnpm dev
   ```

2. **Make Changes**: Edit code in any project

3. **Automatic Rebuilds**: Nx rebuilds affected projects

4. **Run Tests**:

   ```bash
   pnpm test
   ```

5. **Lint Code**:

   ```bash
   pnpm lint
   ```

6. **Build for Production**:
   ```bash
   pnpm build
   ```

## 🚀 Deployment

### Apps

- `client`: Deploy to Vercel/Netlify
- `server`: Deploy to Railway/Render

### Packages

- Build packages: `pnpm build:packages`
- Publish if needed: `pnpm publish --filter @repo/db`

## 🔧 Troubleshooting

### Clear Cache

```bash
pnpm clean
```

### Reset Nx Cache

```bash
nx reset
```

### Reinstall Dependencies

```bash
rm -rf node_modules
pnpm install
```

## 📚 Additional Resources

- [Nx Documentation](https://nx.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [React 19 Documentation](https://react.dev/reference/react/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Run tests: `pnpm test`
5. Run lint: `pnpm lint`
6. Submit a pull request

## 📄 License

ISC
