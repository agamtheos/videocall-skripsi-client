#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR

ip=''
if [[ "$OSTYPE" == "darwin"* ]]; then
    ip=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')
else 
    ip=${LOCAL_IP:-`ipconfig.exe | grep -im1 'IPv4 Address' | cut -d ':' -f2`}
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# creating .env file on frontend
echo -e "REACT_APP_BASE_API=https://$ip:3030/api/\nCOOKIE_TOKEN_KEY=5jsadas981h2e21knda\nREACT_APP_WEB_SOCKET_URL=wss://$ip:3030/one2one" > .env

sed -i '/^$/d;s[[:blank:]]//g' .env

# starting app
echo "Starting app..."
npm run prod