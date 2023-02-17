const config = {
	BASE_API: 'REACT_APP_BASE_API'
};

export const getConfig = (key) =>
{
	return (config.hasOwnProperty(key) && process.env.hasOwnProperty(config[key])) ? process.env[config[key]] : null
}