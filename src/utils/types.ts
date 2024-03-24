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
	firstName: string;
	role: {
		name: string;
		isAdmin: boolean;
	};
	roleId: number;
	shopId: number;
	business: {
		name: string;
		onboardingSteps: any;
	};
	shop: {
		name: string;
		isActive: boolean;
	};
	image: string;
	organization: {
		id: number;
		name: string;
		isTrialOn: boolean;
		subscriptionPlan: {
			name: string;
			id: number;
			noOfShops: number;
			noOfUsers: number;
		};
		wallet: {
			balance: string;
		};
	};
	allowedBusinesses: {
		id: number;
		name: string;
	}[];
}

interface NotifcationType {
	unreadNotifications: number;
	notifications: {
		rows: {
			id: number;
			title: string;
			message: string;
			readAt: string;
			createdAt: Date;
		}[];
	};
}

const userDetailsType: UserDetailsType | Record<string, never> = {};
const notificationType: NotifcationType | Record<string, never> = {};

export { userDetailsType, notificationType };
