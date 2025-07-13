# pnpm + Nx Best Practices Guide

## 🎯 Why pnpm + Nx?

### pnpm Benefits

- **Disk Space**: Hard links instead of copying dependencies
- **Speed**: Faster installs and updates
- **Security**: Stricter dependency resolution
- **Workspaces**: Native monorepo support

### Nx Benefits

- **Caching**: Intelligent build and test caching
- **Affected**: Only rebuild what changed
- **Parallel**: Build independent projects simultaneously
- **Graph**: Visualize project dependencies

## 🏗️ Architecture Principles

### 1. **Workspace Structure**

```
apps/           # Applications (deployable)
├── client/     # Frontend app
└── server/     # Backend app

packages/       # Shared libraries
├── db/         # Database layer
├── trpc-server/# API layer
└── eslint-config/ # Shared configs
```

### 2. **Dependency Management**

#### Workspace Dependencies

```json
{
  "dependencies": {
    "@repo/db": "workspace:*", // Exact version
    "@repo/trpc-server": "workspace:^" // Compatible version
  }
}
```

#### External Dependencies

```bash
# Add to specific project
pnpm add react --filter client

# Add to all projects
pnpm add -r typescript

# Add dev dependency
pnpm add -D @types/node --filter server
```

### 3. **Nx Project Configuration**

Each project has a `project.json`:

```json
{
  "name": "client",
  "targets": {
    "build": {
      "executor": "@nx/vite:build",
      "outputs": ["{options.outputPath}"],
      "dependsOn": ["^build"]
    },
    "serve": {
      "executor": "@nx/vite:dev-server",
      "cache": false
    }
  }
}
```

## 🚀 Development Workflow

### 1. **Initial Setup**

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev
```

### 2. **Daily Development**

```bash
# Start all apps
pnpm dev

# Start specific app
nx serve client

# Build affected projects
pnpm affected:build

# Test affected projects
pnpm affected:test
```

### 3. **Adding New Features**

```bash
# Add new package
pnpm add @repo/new-package --filter client

# Build dependencies first
pnpm build:packages

# Start development
pnpm dev
```

## 📦 Package Management Best Practices

### 1. **Adding Dependencies**

#### To Specific Project

```bash
# Production dependency
pnpm add react --filter client

# Development dependency
pnpm add -D @types/react --filter client

# Workspace dependency
pnpm add @repo/db --filter client
```

#### To Root (Shared)

```bash
# Shared dev dependency
pnpm add -D typescript

# Shared tool
pnpm add -D nx
```

### 2. **Removing Dependencies**

```bash
# From specific project
pnpm remove react --filter client

# From all projects
pnpm remove -r typescript
```

### 3. **Updating Dependencies**

```bash
# Update all
pnpm update

# Update specific
pnpm update react --filter client

# Interactive updates
pnpm update -i
```

## 🏗️ Build Optimization

### 1. **Caching Strategy**

- **Build Cache**: Outputs cached by inputs
- **Test Cache**: Results cached by source + dependencies
- **Lint Cache**: Results cached by source + config

### 2. **Dependency Graph**

```bash
# View dependencies
pnpm graph

# View affected
nx affected:graph
```

### 3. **Parallel Execution**

- Independent projects build in parallel
- Tests run in parallel when possible
- Linting runs in parallel

## 🧪 Testing Strategy

### 1. **Test Organization**

```
src/
├── __tests__/          # Test files
├── components/
│   └── Button.test.tsx # Co-located tests
└── utils/
    └── utils.test.ts   # Co-located tests
```

### 2. **Test Commands**

```bash
# Test all
pnpm test

# Test specific
nx test client

# Test affected
pnpm affected:test

# Test with coverage
nx test client --coverage
```

### 3. **Test Configuration**

```json
{
  "test": {
    "executor": "@nx/jest:jest",
    "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
    "options": {
      "jestConfig": "apps/client/jest.config.ts"
    }
  }
}
```

## 🔍 Linting Strategy

### 1. **ESLint Configuration**

```json
{
  "lint": {
    "executor": "@nx/eslint:lint",
    "outputs": ["{options.outputFile}"],
    "inputs": ["default", "{workspaceRoot}/.eslintrc.json"]
  }
}
```

### 2. **Lint Commands**

```bash
# Lint all
pnpm lint

# Lint specific
nx lint client

# Lint affected
pnpm affected:lint

# Fix issues
nx lint client --fix
```

## 🚀 Deployment Strategy

### 1. **Apps Deployment**

```bash
# Build for production
pnpm build:apps

# Deploy client
nx build client --configuration=production

# Deploy server
nx build server --configuration=production
```

### 2. **Packages Publishing**

```bash
# Build packages
pnpm build:packages

# Publish package
pnpm publish --filter @repo/db
```

## 🔧 Configuration Files

### 1. **pnpm-workspace.yaml**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### 2. **nx.json**

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "test": {
      "cache": true
    },
    "lint": {
      "cache": true
    }
  }
}
```

### 3. **package.json (Root)**

```json
{
  "packageManager": "pnpm@8.15.4",
  "scripts": {
    "dev": "nx run-many --target=serve --projects=client,server --parallel",
    "build": "nx run-many --target=build --all",
    "test": "nx run-many --target=test --all",
    "lint": "nx run-many --target=lint --all"
  }
}
```

## 🐛 Troubleshooting

### 1. **Cache Issues**

```bash
# Clear Nx cache
nx reset

# Clear pnpm cache
pnpm store prune
```

### 2. **Dependency Issues**

```bash
# Reinstall all
rm -rf node_modules
pnpm install

# Check workspace
pnpm list -r
```

### 3. **Build Issues**

```bash
# Clean build
pnpm clean
pnpm build

# Debug build
nx build client --verbose
```

## 📈 Performance Tips

### 1. **Installation Speed**

- Use pnpm's store efficiently
- Minimize duplicate dependencies
- Use workspace dependencies

### 2. **Build Speed**

- Leverage Nx caching
- Use affected commands
- Build in parallel

### 3. **Development Speed**

- Use watch mode for packages
- Hot reload for apps
- Parallel development servers

## 🔒 Security Best Practices

### 1. **Dependency Security**

```bash
# Audit dependencies
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

### 2. **Workspace Security**

- Use exact versions for critical dependencies
- Pin workspace dependencies
- Regular security updates

## 📚 Advanced Features

### 1. **Custom Executors**

Create custom Nx executors for project-specific needs.

### 2. **Code Generation**

Use Nx generators for consistent project structure.

### 3. **CI/CD Integration**

Integrate with GitHub Actions, GitLab CI, etc.

### 4. **Environment Management**

Use Nx's environment configuration for different deployments.

## 🎯 Key Takeaways

1. **Use workspace dependencies** for internal packages
2. **Leverage Nx caching** for faster builds
3. **Use affected commands** for efficient development
4. **Organize by apps/packages** for clear separation
5. **Configure proper caching** in nx.json
6. **Use parallel execution** when possible
7. **Maintain consistent tooling** across projects

This setup provides the best of both worlds: pnpm's efficient package management and Nx's powerful build orchestration.
