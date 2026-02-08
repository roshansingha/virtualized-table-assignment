#!/bin/bash
set -e

echo "Installing dependencies with npm..."
npm ci

echo "Generating mock data..."
npm run generate-data

echo "Building TypeScript..."
npm run build

echo "Build complete!"
