#!/bin/bash

# Create root directories
mkdir -p src/domain/{entities,ports,strategies}
mkdir -p src/application/{services,rules/{scan,transform},factories}
mkdir -p src/infrastructure/{adapters/{dom,ai,storage},logging}
mkdir -p src/presentation/{popup,content-scripts,background}

# Create placeholder assets directory
mkdir -p public/icons

echo "Readable Project Structure Created:"
find src -maxdepth 3
