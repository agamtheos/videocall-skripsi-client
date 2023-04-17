const config = {
	BASE_API: 'REACT_APP_BASE_API',
	COOKIE_TOKEN_KEY: 'COOKIE_TOKEN_KEY'
};

export const getConfig = (key) =>
{
	return (config.hasOwnProperty(key) && process.env.hasOwnProperty(config[key])) ? process.env[config[key]] : null
}