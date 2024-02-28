import { useAppSelector } from "../../redux/hooks";
import { ButtonCancelDiv, FilterStyles } from "../../styles/filters.styles";
import { BasicSearch, BasicSelect, DateSelect } from "./BasicInputs";
import { FaTimes } from "react-icons/fa";

interface Props {
	startDate?: any;
	changeStartDate?: (arg: any) => void;
	endDate?: any;
	changeEndDate?: (arg: any) => void;
	shopId?: any;
	changeShopId?: (arg: any) => void;
	staffId?: any;
	changeStaffId?: (arg: any) => void;
	customerType?: any;
	changeCustomerType?: (arg: any) => void;
	transactionType?: any;
	changeTransactionType?: (arg: any) => void;
	isSearchable?: boolean;
	searchVal?: string;
	changeSearchVal?: (arg: string) => void;
	clearValues?: () => void;
	methodId?: any;
	changeMethodId?: (arg: any) => void;
}

const Filters = ({
	startDate,
	changeStartDate,
	endDate,
	changeEndDate,
	changeShopId,
	changeStaffId,
	changeCustomerType,
	searchVal,
	changeSearchVal,
	isSearchable,
	clearValues,
	shopId,
	staffId,
	customerType,
	transactionType,
	changeTransactionType,
	methodId,
	changeMethodId,
}: Props) => {
	const { details } = useAppSelector((state) => state.auth);

	const { shops, staffs, methods } = useAppSelector((state) => state.basic);

	return (
		<FilterStyles>
			<div className="row">
				{isSearchable && changeSearchVal && (
					<div className="col-lg-1 col-md-4 col-sm-6 mb-3">
						<BasicSearch
							searchVal={searchVal || ""}
							changeSearchVal={changeSearchVal}
						/>
					</div>
				)}
				{startDate && changeStartDate && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<DateSelect
							dateVal={startDate}
							changeDateVal={changeStartDate}
							label="Start Date"
						/>
					</div>
				)}
				{endDate && changeEndDate && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<DateSelect
							dateVal={endDate}
							changeDateVal={changeEndDate}
							label="End Date"
						/>
					</div>
				)}
				{changeShopId && !details.shopId && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={shopId}
							options={shops}
							label="Shop"
							changeSelected={changeShopId}
						/>
					</div>
				)}
				{changeStaffId && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={staffId}
							options={
								details.shopId
									? staffs.filter(
											(s) =>
												s.value == details.id ||
												s.id === null
									  )
									: staffs
							}
							label="Staff"
							changeSelected={changeStaffId}
						/>
					</div>
				)}
				{changeCustomerType && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={customerType}
							options={[
								{ label: "Subdealer", value: "Sub Dealer" },
								{ label: "Customer", value: "Customer" },
							]}
							label="Customer Type"
							changeSelected={changeCustomerType}
						/>
					</div>
				)}
				{changeTransactionType && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={transactionType}
							options={[
								{ label: "Sales", value: "sales" },
								{ label: "Payment", value: "payment" },
							]}
							label="Transaction Type"
							changeSelected={changeTransactionType}
						/>
					</div>
				)}
				{changeMethodId && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={methodId}
							options={methods}
							label="Methods"
							changeSelected={changeMethodId}
						/>
					</div>
				)}
				{clearValues && (
					<div className="col-lg-1 col-6">
						<ButtonCancelDiv>
							<button
								onClick={() => {
									clearValues();
								}}
							>
								<FaTimes />
							</button>
						</ButtonCancelDiv>
					</div>
				)}
			</div>
		</FilterStyles>
	);
};

export default Filters;
