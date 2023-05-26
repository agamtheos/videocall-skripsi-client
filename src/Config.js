const config = {
	BASE_API: 'REACT_APP_BASE_API',
	COOKIE_TOKEN_KEY: 'COOKIE_TOKEN_KEY',
	WEB_SOCKET_URL: 'REACT_APP_WEB_SOCKET_URL',
};

export const getConfig = (key) =>
{
	return (config.hasOwnProperty(key) && process.env.hasOwnProperty(config[key])) ? process.env[config[key]] : null
}