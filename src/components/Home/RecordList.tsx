import SaleIcon from "../../assets/menus/sales.svg";
import PurchaseIcon from "../../assets/menus/purchases.svg";
import ExpenseIcon from "../../assets/menus/expense.svg";
import { RecordStyles } from "../../styles/dashboard.styles";
import { Link } from "react-router-dom";

const RecordList = () => {
	return (
		<RecordStyles>
			<Link to="/dashboard/sales/new">
				<img src={SaleIcon} alt="Sale" />
				<span>Make Sale</span>
			</Link>
			<Link to="/dashboard/purchases/new">
				<img src={PurchaseIcon} alt="Purchase" />
				<span>Record Purchase</span>
			</Link>
			<Link to="/dashboard/expenses">
				<img src={ExpenseIcon} alt="Expense" />
				<span>Add Expense</span>
			</Link>
		</RecordStyles>
	);
};

export default RecordList;
