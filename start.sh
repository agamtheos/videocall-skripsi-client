#!/usr/bin/env bash

if type node > /dev/null 2>&1 && which node > /dev/null 2>&1 ;then
    node -v
    echo "nodeJs is installed, skipping..."
else
    echo "installing nodeJs...  please wait..."

    # Install nvm using curl
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

    # check if nvm is installed
    nvm -v

    # Install NodeJs
    nvm install v16.16.0

    # check if node is installed
    node -v

    nvm use v16.16.0

    nvm alias default v16.16.0

    # installing yarn
    curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.19

    echo "==> Adding Yarn to environment path"
    # Yarn configurations
    export PATH="$HOME/.yarn/bin:$PATH"
    yarn config set prefix ~/.yarn -g
fi

# creating .env file on frontend

if [[ "$OSTYPE" == "cygwin" ]]; then
    ip=${LOCAL_IP:-`ipconfig.exe | grep -im1 'IPv4 Address' | cut -d ':' -f2`}
else
    ip=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

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
        echo "installing yarn...  please wait..."
        curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.19
        echo "==> Adding Yarn to environment path"
        # Yarn configurations
        export PATH="$HOME/.yarn/bin:$PATH"
        yarn config set prefix ~/.yarn -g
    fi

    echo "installing dependencies..."
    yarn install
fi

if [ -d "build" ]; then
    echo "Building app already exists... skipping..."
else
    echo "Building app..."
    npm run build
fi

echo "Starting app..."
npm run prod
