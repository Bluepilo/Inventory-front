const haveRole = (role: number) => {
	const ROLES = {
		SUPER_ADMIN: 1,
		ADMIN: 2,
		PERSONNEL: 3,
		BUSINESS_OWNER: 4,
		BUSINESS_ADMIN: 5,
		SHOP_ADMIN: 6,
		SHOP_AGENT: 7,
		SHOP_VIEWER: 7,
		BIZ_VIEWER: 8,
		BUSINESS_ADMINS: [4, 5, 8],
		BUSINESS_ADMIN_ACTIONERS: [4, 5],
		BUSINESS_ACTIONERS: [4, 5, 6],
		SHOP_AGENTS: [6, 7],
		APP_ADMIN_ROLES: [1, 2, 3],
		BUSINESS_ROLES: [4, 5, 6, 7, 8],
		BUSINESS_VIEWERS: [7, 8],
	};

	const roleChecks = {
		isSuperAdmin: role === ROLES.SUPER_ADMIN,
		isAppAdmin: ROLES.APP_ADMIN_ROLES.includes(role),
		isBusinessOwner: role === ROLES.BUSINESS_OWNER,
		isBusinessRole: ROLES.BUSINESS_ROLES.includes(role),
		isBusinessAdmin: ROLES.BUSINESS_ADMINS.includes(role),
		isBusinessAdminActioners: ROLES.BUSINESS_ADMIN_ACTIONERS.includes(role),
		isBusinessActioners: ROLES.BUSINESS_ACTIONERS.includes(role),
		isShopAdmin: role === ROLES.SHOP_ADMIN,
		isShopAgent: ROLES.SHOP_AGENTS.includes(role),
		isShopViewer: role === ROLES.SHOP_VIEWER,
		isBusinessViewer: ROLES.BUSINESS_VIEWERS.includes(role),
	};

	return roleChecks;
};

export { haveRole };
