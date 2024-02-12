import ShopIcon from "../assets/icons/shop.svg";
import ProductIcon from "../assets/icons/product.svg";
import SupplierIcon from "../assets/icons/supplier.svg";
import PurchaseIcon from "../assets/icons/purchase.svg";
import MoneyIcon from "../assets/icons/money.svg";

const faqsHints = [
	{
		id: 1,
		title: `Can't Remember Your Password?`,
		list: [
			`Click on "Forgot Password" link`,
			`Enter your registered email address`,
			`Check your email for a password reset link.`,
			`Follow the link to create a new password.`,
		],
	},
	{
		id: 2,
		title: `Haven't Received the Email?`,
		list: [
			`Click on "Resend OTP" option.`,
			`Check your spam or junk folder for the OTP email.`,
			`If it's not there, make sure the email you provided is correct.`,
		],
	},
	{
		id: 3,
		title: `Struggling with Your Password?`,
		list: [
			`Ensure your password has at least 8 characters.`,
			`Include a number and a capital letter.`,
			`Click on "Forgot Password" if needed.`,
		],
	},
	{
		id: 4,
		title: `Time-Expired Code?`,
		list: [
			`Click on "Resend OTP" to get a new code.`,
			`Check your email for the latest OTP.`,
			`Use the new code within the specified time.`,
		],
	},
	{
		id: 5,
		title: `Confused by OTP Format?`,
		list: [
			`Find the OTP in the email.`,
			`Enter the code exactly as provided.`,
			`Double-check for spaces or extra characters.`,
		],
	},
	{
		id: 6,
		title: `Need to Change Your Email?`,
		list: [
			`Click on "Edit Email" to correct your email.`,
			`If the email is correct, click on "Resend OTP" to get the code.`,
		],
	},
];

const onboardingsteps = [
	{
		id: 1,
		icon: ShopIcon,
		title: "Add Business Locations",
		desc: `Input your business locations to manage stock across different places effortlessly.`,
		type: "shop",
		href: "/dashboard/shops",
	},
	{
		id: 2,
		icon: ProductIcon,
		title: "Create Products",
		desc: `Add products under the "Create Products" section. This is the foundation of your inventory.`,
		type: "product",
		href: "/dashboard/brands",
	},
	{
		id: 3,
		icon: SupplierIcon,
		title: "Create Suppliers",
		desc: `In the "Suppliers" tab, add supplier details for seamless ordering and inventory updates.`,
		type: "supplier",
		href: "/dashboard/suppliers",
	},
	{
		id: 4,
		icon: PurchaseIcon,
		title: "Import Inventory or",
		title2: "Make Purchase",
		desc: `Import existing Inventory OR make a Purchase from your supplier.`,
		type: "purchase",
		href: "/dashboard/purchases",
	},
	{
		id: 5,
		icon: MoneyIcon,
		title: "Make Sales",
		desc: `Record your sales transactions to stay on top of your business with BluePilo.`,
		type: "sales",
		href: "/dashboard/sales",
	},
];

export { faqsHints, onboardingsteps };
