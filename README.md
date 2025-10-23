[![Deploy to mcp-use](https://cdn.mcp-use.com/deploy.svg)](https://mcp-use.com/deploy/start?repository-url=https%3A%2F%2Fgithub.com%2Fmcp-use%2Fapp-sdk-template&branch=main&project-name=app-sdk-template&build-command=npm+install&start-command=npm+run+build+%26%26+npm+run+start&port=3000&runtime=node&base-image=node%3A18)

# MCP Use App

A starter template created with [create-mcp-use-app](https://github.com/mcp-use/mcp-use).

## Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run production server
yarn start
```

## Project Structure

```
├── index.ts              # MCP server entry point
├── resources/            # UI widgets directory
│   └── display-weather.tsx
├── styles.css           # Global styles
└── package.json         # Dependencies and scripts
```

## Development

The dev server runs on `http://localhost:3000` with hot reload and auto-opens the inspector.

## Learn More

- [mcp-use Documentation](https://github.com/mcp-use/mcp-use)
- [Model Context Protocol](https://modelcontextprotocol.io)

