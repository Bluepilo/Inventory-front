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
		href: "/dashboard/business/shops",
	},
	{
		id: 2,
		icon: ProductIcon,
		title: "Create Products",
		desc: `Add products under the "Create Products" section. This is the foundation of your inventory.`,
		type: "product",
		href: "/dashboard/catalogue",
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
		href: "/dashboard/business/import-inventory",
		href2: "/dashboard/purchases",
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

const uploadData = [
	{
		brandName: "Drawal",
		category: "Art & Craft",
		productName: "Cat ",
		size: " 6 feet",
		type: "Clay Red",
		colour: "",
		year: "",
		productCode: "",
		costPrice: "50,000",
		price: "55,000",
		barcode: "128380040033",
	},
	{
		brandName: "Toyota",
		category: "Automobile",
		productName: "Camry ",
		size: " ",
		type: " Sport",
		colour: "Black",
		year: "2021",
		productCode: "",
		costPrice: " 1,200,000",
		price: "1,500,000",
		barcode: "128380040033",
	},
	{
		brandName: "Samsung",
		category: "Electronics",
		productName: "Crystal TV  ",
		size: ' 85"',
		type: " UHD 4K Smart",
		colour: "",
		year: "",
		productCode: "CU7000",
		costPrice: "123,000",
		price: "",
		barcode: "128380040033",
	},
	{
		brandName: "Unilever",
		category: "Beauty & Personal Care",
		productName: "Lux Bright Camelia",
		size: "  500 ml",
		type: "  Body Wash",
		colour: "",
		year: "",
		productCode: "",
		costPrice: "6,700",
		price: "8,000",
		barcode: "128380040033",
	},
	{
		brandName: "Landa Foam",
		category: " Mattress",
		productName: "Comfy ",
		size: " 75X54X12",
		type: "",
		colour: "",
		year: "",
		productCode: "",
		costPrice: "70,000",
		price: "77,000",
		barcode: "128380040033",
	},
];

export { faqsHints, onboardingsteps, uploadData };
