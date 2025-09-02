#!/bin/bash

echo "=== Restarting backend user_management ==="

# Kill process listening on port 8081
PID=$(lsof -ti:8081)
if [ -n "$PID" ]; then
    echo "Killing process with PID $PID"
    kill -9 $PID
fi

# Change to script directory
cd "$(dirname "$0")"

# Start the backend again
go run . &
