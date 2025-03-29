#!/bin/bash

while true; do
    cd /home/students/k/kg/kg53848/public_html/git/main || exit 1
    
    # Pull the latest changes from the remote repository and force update
    git fetch origin main
    git reset --hard origin/main  # This resets your local branch to match the remote

    # Pause for 1 second before the next check
    sleep 1
done


