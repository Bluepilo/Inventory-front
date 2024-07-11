import { useAppSelector } from "../../redux/hooks";
import { ButtonCancelDiv, FilterStyles } from "../../styles/filters.styles";
import {
	BasicSearch,
	BasicSelect,
	DateSelect,
	OptionProp,
} from "./BasicInputs";
import { FaTimes } from "react-icons/fa";
import DateFilter from "./DateFilter";

interface Props {
	dateType?: any;
	changeDateType?: (arg: any) => void;
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
	transactionTypeOptions?: OptionProp[];
	isSearchable?: boolean;
	searchVal?: string;
	changeSearchVal?: (arg: string) => void;
	clearValues?: () => void;
	methodId?: any;
	changeMethodId?: (arg: any) => void;
	statusId?: any;
	changeStatusId?: (arg: any) => void;
	expenseCategory?: any;
	changeExpenseCategory?: (arg: any) => void;
	categoryList?: OptionProp[];
	othersList?: OptionProp[];
	others?: any;
	othersLabel?: string;
	changeOthers?: (arg: any) => void;
	logType?: any;
	changeLogType?: (arg: any) => void;
	placeholder?: string;
}

const Filters = ({
	dateType,
	changeDateType,
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
	transactionTypeOptions,
	methodId,
	changeMethodId,
	statusId,
	changeStatusId,
	expenseCategory,
	changeExpenseCategory,
	categoryList,
	others,
	changeOthers,
	othersList,
	logType,
	changeLogType,
	othersLabel,
	placeholder,
}: Props) => {
	const { details } = useAppSelector((state) => state.auth);

	const { shops, staffs, methods, expenseCat, logTypes } = useAppSelector(
		(state) => state.basic
	);

	return (
		<FilterStyles>
			<div className="row">
				{isSearchable && changeSearchVal && (
					<div className="col-lg-1 col-md-4 col-sm-6 mb-3">
						<BasicSearch
							searchVal={searchVal || ""}
							changeSearchVal={changeSearchVal}
							placeholder={placeholder || ""}
						/>
					</div>
				)}
				{changeEndDate && changeStartDate && changeDateType && (
					<DateFilter
						startDate={startDate}
						setStartDate={changeStartDate}
						endDate={endDate}
						setEndDate={changeEndDate}
						dateType={dateType}
						setDateType={changeDateType}
					/>
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
							options={transactionTypeOptions || []}
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
				{changeStatusId && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={statusId}
							options={[
								{ label: "All", value: "" },
								{ label: "Approved", value: "approved" },
								{ label: "Rejected", value: "rejected" },
								{ label: "Pending", value: "pending" },
							]}
							label="Status"
							changeSelected={changeStatusId}
						/>
					</div>
				)}
				{changeExpenseCategory && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={expenseCategory}
							options={categoryList || expenseCat}
							label="Category"
							changeSelected={changeExpenseCategory}
						/>
					</div>
				)}
				{changeOthers && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={others}
							options={othersList || []}
							label={othersLabel}
							changeSelected={changeOthers}
						/>
					</div>
				)}
				{changeLogType && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={logType}
							options={logTypes}
							label="Type"
							changeSelected={changeLogType}
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
