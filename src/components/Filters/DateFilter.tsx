import React from "react";
import { BasicSelect, DateSelect } from "./BasicInputs";

const DateFilter = ({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	dateType,
	setDateType,
	singleLine,
}: {
	startDate: any;
	setStartDate: (arg: any) => void;
	endDate: any;
	setEndDate: (arg: any) => void;
	dateType: any;
	setDateType: (arg: any) => void;
	singleLine?: boolean;
}) => {
	const changeDateType = (val: any) => {
		setDateType(val);
		if (val?.value === "month") {
			setStartDate(
				new Date(new Date().getFullYear(), new Date().getMonth(), 1)
			);
			setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		} else if (val?.value === "today") {
			let start = new Date();
			start.setUTCHours(0, 0, 0, 0);

			let end = new Date();
			end.setUTCHours(23, 59, 59, 999);
			setStartDate(start);
			setEndDate(end);
		} else if (val?.value === "week") {
			let curr = new Date();
			let firstday = new Date(
				curr.setDate(curr.getDate() - curr.getDay())
			);
			let lastday = new Date(
				curr.setDate(curr.getDate() - curr.getDay() + 6)
			);
			setStartDate(firstday);
			setEndDate(lastday);
		} else if (val?.value === "lweek") {
			let curr = new Date();
			let firstday = new Date(
				curr.setDate(curr.getDate() - curr.getDay())
			);
			let lastday = new Date(
				curr.setDate(curr.getDate() - curr.getDay() + 6)
			);
			setStartDate(new Date(firstday.setDate(firstday.getDate() - 7)));
			setEndDate(new Date(lastday.setDate(lastday.getDate() - 7)));
		} else if (val?.value === "lmonth") {
			const now = new Date();
			const startOfMonth = new Date(
				now.getFullYear(),
				now.getMonth() - 1,
				1
			);
			const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
			setStartDate(startOfMonth);
			setEndDate(endOfMonth);
		} else if (val?.value === "year") {
			const firstDateOfYear = new Date(new Date().getFullYear(), 0, 1);
			setStartDate(firstDateOfYear);
			setEndDate(new Date());
		} else if (val?.value === "lyear") {
			const now = new Date();
			const startOfPreviousYear = new Date(now.getFullYear() - 1, 0, 1);
			const endOfPreviousYear = new Date(now.getFullYear() - 1, 11, 31);
			setStartDate(startOfPreviousYear);
			setEndDate(endOfPreviousYear);
		}
	};
	return (
		<>
			<div
				className={singleLine ? "mb-3" : "col-lg-2 col-md-4 col-6 mb-3"}
			>
				<BasicSelect
					value={dateType}
					options={[
						{
							label: "Today",
							value: "today",
						},
						{
							label: "This Week",
							value: "week",
						},
						{
							label: "Last Week",
							value: "lweek",
						},
						{
							label: "This Month",
							value: "month",
						},
						{
							label: "Last Month",
							value: "lmonth",
						},
						{
							label: "This Year",
							value: "year",
						},
						{
							label: "Last Year",
							value: "lyear",
						},
						{
							label: "Custom Date",
							value: "custom",
						},
					]}
					label="Date Type"
					changeSelected={changeDateType}
				/>
			</div>
			{dateType?.value === "custom" && (
				<>
					<div
						className={
							singleLine ? "mb-3" : "col-lg-2 col-md-4 col-6 mb-3"
						}
					>
						<DateSelect
							dateVal={startDate}
							changeDateVal={setStartDate}
							label="Start Date"
						/>
					</div>

					<div
						className={
							singleLine ? "mb-3" : "col-lg-2 col-md-4 col-6 mb-3"
						}
					>
						<DateSelect
							dateVal={endDate}
							changeDateVal={setEndDate}
							label="End Date"
						/>
					</div>
				</>
			)}
		</>
	);
};

export default DateFilter;
