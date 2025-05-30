#!/bin/bash

# Simple script to start a local web server for previewing the GitHub Pages site
cd "$(dirname "$0")"
echo "Starting local server at http://localhost:8000"
echo "Press Ctrl+C to stop the server"
python3 -m http.server 8000
