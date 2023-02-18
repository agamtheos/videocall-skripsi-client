const path = require('path');
const {override, addLessLoader, addWebpackAlias} = require('customize-cra');

const overrideProcessEnv = value => config => {
    config.resolve.modules = [
        path.join(__dirname, 'src')
    ].concat(config.resolve.modules);
    return config;
};

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
    }),
    overrideProcessEnv({
        VERSION: JSON.stringify(require('./package.json').version),
    }),
    addWebpackAlias({
        ['@app']: path.resolve(__dirname, 'src'),
        ['@actions']: path.resolve(__dirname, 'src/appRedux/actions'),
        ['@reducers']: path.resolve(__dirname, 'src/appRedux/reducers'),
        ['@store']: path.resolve(__dirname, 'src/appRedux/store'),
        ['@constants']: path.resolve(__dirname, 'src/constants'),
        ['@containers']: path.resolve(__dirname, 'src/containers'),
        ['@layouts']: path.resolve(__dirname, 'src/layouts'),
        ['@components']: path.resolve(__dirname, 'src/components'),
        ['@routes']: path.resolve(__dirname, 'src/routes'),
        ['@config']: path.resolve(__dirname, 'src/config'),
        ['@util']: path.resolve(__dirname, 'src/util'),
    })
);