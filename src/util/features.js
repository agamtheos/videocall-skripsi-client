import React from 'react';

export const ROLE_ADMIN = 'admin';
export const ROLE_CLIENT = 'client';

const PERMISSIONS = [
    {
        role: ROLE_ADMIN,
        defaultRoute: '/dashboard/admin/home',
    },
    {
        role: ROLE_CLIENT,
        defaultRoute: '/dashboard/client/home',
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