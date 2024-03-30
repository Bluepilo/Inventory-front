export interface SidebarMenusType {
	id: number;
	href: string;
	icon: string;
	name: string;
	children: {
		id: number;
		href: string;
		name: string;
		permission?: string[];
	}[];
}

interface UserDetailsType {
	id: number;
	businessId: number;
	fullName: string;
	firstName: string;
	lastName: string;
	phoneNo: string;
	email: string;
	role: {
		name: string;
		isAdmin: boolean;
	};
	roleId: number;
	shopId: number;
	business: {
		name: string;
		onboardingSteps: any;
		image: string;
		email: string;
		phone: string;
		address: string;
		canOnboard: boolean;
		currencyCode: string;
		currency: {
			symbol: string;
		};
	};
	shop: {
		name: string;
		isActive: boolean;
	};
	image: string;
	address: string;
	username: string;
	organization: {
		id: number;
		name: string;
		email: string;
		phone: string;
		isTrialOn: boolean;
		image: string;
		ownerFirstName: string;
		ownerLastName: string;
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
