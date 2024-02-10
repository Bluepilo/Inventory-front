export interface SidebarMenusType {
	id: number;
	href: string;
	icon: string;
	name: string;
	children: {
		id: number;
		href: string;
		name: string;
	}[];
}

interface UserDetailsType {
	id: number;
	businessId: number;
	fullName: string;
	role: {
		name: string;
	};
	business: {
		name: string;
	};
}

const userDetailsType: UserDetailsType | Record<string, never> = {};

export { userDetailsType };
