import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ButtonCancelDiv, FilterStyles } from "../../styles/filters.styles";
import { BasicSearch, BasicSelect, DateSelect } from "./BasicInputs";
import { FaTimes } from "react-icons/fa";

interface Props {
	startDate?: any;
	changeStartDate?: (arg: any) => void;
	endDate?: any;
	changeEndDate?: (arg: any) => void;
	changeShopId?: (arg: number) => void;
	changeStaffId?: (arg: number) => void;
	changeCustomerType?: (arg: string) => void;
	isSearchable?: boolean;
	searchVal?: string;
	changeSearchVal?: (arg: string) => void;
	clearValues?: () => void;
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
}: Props) => {
	const { shops, staffs } = useAppSelector((state) => state.basic);
	const [clear, setClear] = useState(false);

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
				{changeShopId && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							options={shops}
							label="Shop"
							changeSelected={changeShopId}
							clear={clear}
						/>
					</div>
				)}
				{changeStaffId && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							options={staffs}
							label="Staff"
							changeSelected={changeStaffId}
							clear={clear}
						/>
					</div>
				)}
				{changeCustomerType && (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							options={[
								{ label: "Subdealer", value: "Sub Dealer" },
								{ label: "Customer", value: "Customer" },
							]}
							label="Customer Type"
							changeSelected={changeCustomerType}
							clear={clear}
						/>
					</div>
				)}
				{clearValues && (
					<div className="col-lg-1 col-6">
						<ButtonCancelDiv>
							<button
								onClick={() => {
									setClear(true);
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
