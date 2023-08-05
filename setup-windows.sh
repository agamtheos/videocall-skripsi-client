#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# creating .env file on frontend

if [[ "$OSTYPE" == "cygwin" ]]; then
    ip=${LOCAL_IP:-`ipconfig.exe | grep -im1 'IPv4 Address' | cut -d ':' -f2`}
else
    ip=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')

cd $SCRIPT_DIR

echo -e "REACT_APP_BASE_API=https://$ip:3030/api/\nCOOKIE_TOKEN_KEY=5jsadas981h2e21knda\nREACT_APP_WEB_SOCKET_URL=wss://$ip:3030/one2one" > .env

# installing dependencies
if [ -d "node_modules" ]; then
    echo "node_modules already exists... skipping..."
else
    # installing yarn if not installed
    if type yarn > /dev/null 2>&1 && which yarn > /dev/null 2>&1 ;then
        yarn -v
        echo "yarn is installed, skipping..."
    else
        # installing yarn
        echo "installing yarn...  please wait..."
        npm install -g yarn
    fi

    echo "installing dependencies for frontend... please wait... "
    yarn install
fi

if [ -d "build" ]; then
    echo "Building app already exists... skipping..."
else
    echo "Building app..."
    npm run build
fi
