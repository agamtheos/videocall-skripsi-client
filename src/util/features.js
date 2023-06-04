import React from 'react';

export const ROLE_ADMIN = 'admin';
export const ROLE_CLIENT = 'client';

// page permissions
export const DASHBOARD_ADMIN = 'DASHBOARD_ADMIN';
export const MANAGE_USER = 'MANAGE_USER';
export const DASHBOARD_CLIENT = 'DASHBOARD_CLIENT';

const adminAccessList = [
    DASHBOARD_ADMIN,
    MANAGE_USER,
]

const clientAccessList = [
    DASHBOARD_CLIENT,
]

const PERMISSIONS = [
    {
        role: ROLE_ADMIN,
        defaultRoute: '/dashboard/admin/home',
        features: adminAccessList,
    },
    {
        role: ROLE_CLIENT,
        defaultRoute: '/dashboard/client/home',
        features: clientAccessList,
    }
]

export const getActiveRole = () =>
{
	// const {role: activeRole} = store.getState().auth;
    const activeRole = localStorage.getItem('role');
	return activeRole ? activeRole : null;
}

export const getDefaultRoute = () =>
{
	const activeRole = getActiveRole();
	const {defaultRoute} = PERMISSIONS.find(({role}) => role === activeRole) ?? {};
	return defaultRoute ? defaultRoute : null;
}

export const RoleableComponent = ({children}) => (
	<React.Fragment>
		{getDefaultRoute() ? children : null}
	</React.Fragment>
);

export const roleable = (featureCode) => {
	const activeRole = getActiveRole();
	const {features} = PERMISSIONS.find(({role}) => role === activeRole) ?? {};
	return features ? features.includes(featureCode) : false;
}