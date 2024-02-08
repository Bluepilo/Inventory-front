import HomeIcon from "../../assets/menus/home.svg";
import SalesIcon from "../../assets/menus/sales.svg";
import CustomerIcon from "../../assets/menus/customers.svg";

import BusinessIcon from "../../assets/menus/business.svg";
import LogsIcon from "../../assets/menus/logs.svg";
import SubscriptionIcon from "../../assets/menus/subscription.svg";

const userRoutes = [
	{
		id: 1,
		name: "Home",
		href: "/dashboard/home",
		icon: HomeIcon,
		children: [],
	},
	{
		id: 2,
		name: "Sales",
		href: "/dashboard/sales",
		icon: SalesIcon,
		children: [],
	},
	{
		id: 3,
		name: "Customers",
		href: "/dashboard/customers",
		icon: CustomerIcon,
		children: [
			{
				id: 1,
				name: "Walk-in",
				href: "/dashboard/customers/walk-in",
			},
			{
				id: 2,
				name: "Sub-Dealer",
				href: "/dashboard/customers/subdealer",
			},
		],
	},
];

const adminRoutes = [
	{
		id: 1,
		name: "Home",
		href: "/admin/home",
		icon: HomeIcon,
		children: [],
	},
];

const bottomRoutes = [
	{
		id: 1,
		name: "Manage Biz",
		href: "/dashboard/business",
		icon: BusinessIcon,
		children: [
			{
				id: 1,
				name: "My Shops",
				href: "/dashboard/business/shops",
			},
			{
				id: 2,
				name: "Staff",
				href: "/dashboard/business/staff",
			},
			{
				id: 3,
				name: "Import Inventory",
				href: "/dashboard/business/import-inventory",
			},
		],
	},
	{
		id: 2,
		name: "Subscription",
		href: "/dashboard/subscription",
		icon: SubscriptionIcon,
		children: [],
	},
	{
		id: 3,
		name: "Activity Logs",
		href: "/dashboard/logs",
		icon: LogsIcon,
		children: [],
	},
];

export { userRoutes, adminRoutes, bottomRoutes };
