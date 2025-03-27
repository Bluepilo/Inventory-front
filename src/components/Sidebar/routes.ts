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
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 2,
		name: "Sales",
		href: "/dashboard/sales",
		icon: SalesIcon,
		children: [],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
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
				permission: [1, 2, 3, 4, 5, 6, 7, 8],
			},
			{
				id: 2,
				name: "Sub-Dealer",
				href: "/dashboard/customers/subdealer",
				permission: [1, 2, 3, 4, 5, 6, 7, 8],
			},
		],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 4,
		name: "Purchases",
		href: "/dashboard/purchases",
		icon: PurchaseIcon,
		children: [],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 5,
		name: "Suppliers",
		href: "/dashboard/suppliers",
		icon: SupplierIcon,
		children: [],
		permission: [4, 5, 8],
	},
	{
		id: 6,
		name: "Transactions",
		href: "/dashboard/transactions",
		icon: TransactionIcon,
		children: [],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 7,
		name: "Transfers",
		href: "/dashboard/transfers",
		icon: TransferIcon,
		children: [],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 8,
		name: "My Expenses",
		href: "/dashboard/expenses",
		icon: ExpenseIcon,
		children: [],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 9,
		name: "My Catalogue",
		href: "/dashboard/catalogue",
		icon: CatalogueIcon,
		children: [],
		permission: [4, 5, 6],
	},
	{
		id: 10,
		name: "Services",
		href: "/dashboard/services",
		icon: CatalogueIcon,
		children: [],
		permission: [4, 5, 6],
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
				permission: [1, 2, 3, 4, 5, 6, 7, 8],
			},
			{
				id: 2,
				name: "Product Returns",
				href: "/dashboard/reports/returns",
				permission: [1, 2, 3, 4, 5, 6, 7, 8],
			},
			{
				id: 3,
				name: "Stock Adjustments",
				href: "/dashboard/reports/adjustments",
				permission: [4, 5, 8],
			},
			{
				id: 4,
				name: "Profits & Loss",
				href: "/dashboard/reports/profits-loss",
				permission: [4, 5],
			},
			{
				id: 5,
				name: "Export Reports",
				href: "/dashboard/reports/exports",
				permission: [4, 5],
			},
		],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 133,
		name: "Rewards",
		href: "/dashboard/rewards",
		icon: BusinessIcon,
		children: [],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
	},
	{
		id: 12,
		name: "Manage Biz",
		href: "/dashboard/business",
		icon: BusinessIcon,
		permission: [4, 5, 6],
		children: [
			{
				id: 1,
				name: "My Shops",
				href: "/dashboard/business/shops",
				permission: [4, 5],
			},
			{
				id: 2,
				name: "Staff",
				href: "/dashboard/business/staff",
				permission: [4, 5],
			},
			{
				id: 3,
				name: "Import Inventory",
				href: "/dashboard/business/import-inventory",
				permission: [4, 5, 6],
			},
		],
	},
	{
		id: 13,
		name: "Subscription",
		href: "/dashboard/subscription",
		icon: SubscriptionIcon,
		children: [],
		permission: [4, 5],
	},
	{
		id: 14,
		name: "Activity Logs",
		href: "/dashboard/logs",
		icon: LogsIcon,
		children: [],
		permission: [1, 2, 3, 4, 5, 6, 7, 8],
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
				name: "Categories",
				href: "/admin/brands/categories",
				permission: ["listBrand"],
			},
			{
				id: 3,
				name: "Catalogues",
				href: "/admin/brands/catalogues",
				permission: ["listBrand"],
			},
			{
				id: 4,
				name: "Brand Requests",
				href: "/admin/brands/requests",
				permission: ["listBrandRequest"],
			},
		],
		permission: [],
	},
	{
		id: 5,
		name: "Bluepilo SMS",
		href: "/admin/sms",
		icon: TransactionIcon,
		permission: [],
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
				name: "Discounts",
				href: "/admin/finance/discounts",
				permission: ["listTransactions"],
			},
			{
				id: 3,
				name: "Expense",
				href: "/admin/finance/expense",
				permission: ["listTransactions"],
			},
		],
		permission: [],
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
		permission: [],
	},
	{
		id: 9,
		name: "Rewards",
		href: "/admin/rewards",
		icon: BusinessIcon,
		children: [],
		permission: [],
	},
];

export { userRoutes, adminRoutes };
