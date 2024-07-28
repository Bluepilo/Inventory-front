import HomeIcon from "../../assets/menus/home.svg";
import SalesIcon from "../../assets/menus/sales.svg";
import CustomerIcon from "../../assets/menus/customers.svg";
import PurchaseIcon from "../../assets/menus/purchases.svg";
import SupplierIcon from "../../assets/menus/supplier.svg";
import TransactionIcon from "../../assets/menus/transaction.svg";
import TransferIcon from "../../assets/menus/transfer.svg";
import ExpenseIcon from "../../assets/menus/expense.svg";
import CatalogueIcon from "../../assets/menus/catalogue.svg";
import ReportIcon from "../../assets/menus/reports.svg";

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
		permission: ["all"],
	},
	{
		id: 2,
		name: "Sales",
		href: "/dashboard/sales",
		icon: SalesIcon,
		children: [],
		permission: ["all"],
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
				permission: ["all"],
			},
			{
				id: 2,
				name: "Sub-Dealer",
				href: "/dashboard/customers/subdealer",
				permission: ["all"],
			},
		],
		permission: ["all"],
	},
	{
		id: 4,
		name: "Purchases",
		href: "/dashboard/purchases",
		icon: PurchaseIcon,
		children: [],
		permission: ["all"],
	},
	{
		id: 5,
		name: "Suppliers",
		href: "/dashboard/suppliers",
		icon: SupplierIcon,
		children: [],
		permission: ["admin"],
	},
	{
		id: 6,
		name: "Transactions",
		href: "/dashboard/transactions",
		icon: TransactionIcon,
		children: [],
		permission: ["all"],
	},
	{
		id: 7,
		name: "Transfers",
		href: "/dashboard/transfers",
		icon: TransferIcon,
		children: [],
		permission: ["all"],
	},
	{
		id: 8,
		name: "My Expenses",
		href: "/dashboard/expenses",
		icon: ExpenseIcon,
		children: [],
		permission: ["all"],
	},
	{
		id: 9,
		name: "My Catalogue",
		href: "/dashboard/catalogue",
		icon: CatalogueIcon,
		children: [],
		permission: ["admin"],
	},
	{
		id: 10,
		name: "Services",
		href: "/dashboard/services",
		icon: CatalogueIcon,
		children: [],
		permission: ["admin"],
	},
	{
		id: 11,
		name: "Reports",
		href: "/dashboard/reports",
		icon: ReportIcon,
		children: [
			{
				id: 1,
				name: "Stock Reports",
				href: "/dashboard/reports/stocks",
				permission: ["all"],
			},
			{
				id: 2,
				name: "Product Returns",
				href: "/dashboard/reports/returns",
				permission: ["all"],
			},
			{
				id: 3,
				name: "Stock Adjustments",
				href: "/dashboard/reports/adjustments",
				permission: ["admin"],
			},
			{
				id: 4,
				name: "Profits & Loss",
				href: "/dashboard/reports/profits-loss",
				permission: ["admin"],
			},
			{
				id: 5,
				name: "Export Reports",
				href: "/dashboard/reports/exports",
				permission: ["admin"],
			},
		],
		permission: ["all"],
	},
	{
		id: 133,
		name: "Rewards",
		href: "/dashboard/rewards",
		icon: BusinessIcon,
		children: [],
		permission: ["all"],
	},
	{
		id: 12,
		name: "Manage Biz",
		href: "/dashboard/business",
		icon: BusinessIcon,
		permission: ["admin"],
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
				permission: ["api"],
			},
		],
	},
	{
		id: 13,
		name: "Subscription",
		href: "/dashboard/subscription",
		icon: SubscriptionIcon,
		children: [],
		permission: ["admin"],
	},
	{
		id: 14,
		name: "Activity Logs",
		href: "/dashboard/logs",
		icon: LogsIcon,
		children: [],
		permission: ["all"],
	},
];

const adminRoutes = [
	{
		id: 1,
		name: "Dashboard",
		href: "/admin/home",
		icon: HomeIcon,
		children: [],
		permission: ["dashboardReport"],
	},
	{
		id: 2,
		name: "Organizations",
		href: "/admin/organizations",
		icon: SupplierIcon,
		children: [],
		permission: ["organizationList"],
	},
	{
		id: 3,
		name: "Subscriptions",
		href: "/admin/subscriptions",
		icon: SubscriptionIcon,
		children: [],
		permission: ["subscriptionStatistics"],
	},
	{
		id: 4,
		name: "Brands",
		href: "/admin/brands",
		icon: CatalogueIcon,
		children: [
			{
				id: 1,
				name: "Brand Accounts",
				href: "/admin/brands/accounts",
				permission: ["dashboardReport"],
			},
			{
				id: 2,
				name: "Catalogues",
				href: "/admin/brands/catalogues",
				permission: ["listBrand"],
			},
			{
				id: 3,
				name: "Brand Requests",
				href: "/admin/brands/requests",
				permission: ["listBrandRequest"],
			},
		],
		permission: [""],
	},
	{
		id: 5,
		name: "Bluepilo SMS",
		href: "/admin/sms",
		icon: TransactionIcon,
		permission: [""],
		children: [
			{
				id: 1,
				name: "Summary",
				href: "/admin/sms/summary",
				permission: ["bluepiloSmsSummary"],
			},
			{
				id: 2,
				name: "Wallets",
				href: "/admin/sms/wallets",
				permission: ["bluepiloSmsWallets"],
			},
			{
				id: 3,
				name: "Transactions",
				href: "/admin/sms/transactions",
				permission: ["bluepiloSmsTransactionList"],
			},
			{
				id: 4,
				name: "History",
				href: "/admin/sms/history",
				permission: ["bluepiloSmsHistory"],
			},
		],
	},
	{
		id: 6,
		name: "Finance",
		href: "/admin/finance",
		icon: ExpenseIcon,
		children: [
			{
				id: 1,
				name: "Transactions",
				href: "/admin/finance/transactions",
				permission: ["listTransactions"],
			},
			{
				id: 2,
				name: "Expense",
				href: "/admin/finance/expense",
				permission: ["expenseList"],
			},
		],
		permission: [""],
	},
	{
		id: 7,
		name: "Resource",
		href: "/admin/resource",
		icon: LogsIcon,
		children: [],
		permission: ["allFaqs"],
	},
	{
		id: 8,
		name: "Others",
		href: "/admin/resource",
		icon: BusinessIcon,
		children: [
			{
				id: 1,
				name: "App Admins",
				href: "/admin/others/users",
				permission: ["listUsers"],
			},
			{
				id: 2,
				name: "Terms",
				href: "/admin/others/terms",
				permission: ["getTermsAndCondition"],
			},
			{
				id: 3,
				name: "Adds Carousel",
				href: "/admin/others/carousel",
				permission: ["listCarousel"],
			},
			{
				id: 4,
				name: "Roles",
				href: "/admin/others/roles",
				permission: ["listRoles"],
			},
			{
				id: 5,
				name: "Rewards",
				href: "/admin/others/rewards",
				permission: ["listRoles"],
			},
		],
		permission: [""],
	},
];

export { userRoutes, adminRoutes };
