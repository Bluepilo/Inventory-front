import Select from "react-select";
import { FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
import { FilterWrapper, SearchBar } from "../../styles/filters.styles";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";

export interface OptionProp {
	value: string | number;
	label: string;
}

interface SearchProp {
	searchVal: string;
	changeSearchVal: (arg: string) => void;
}

interface DateProp {
	dateVal: Date;
	changeDateVal: (arg: any) => void;
	label: string;
}

interface SelectProp {
	options: OptionProp[];
	changeSelected: (arg: any) => void;
	label: string;
	clear?: boolean;
}

export const BasicSelect = ({
	options,
	changeSelected,
	label,
	clear,
}: SelectProp) => {
	const customStyles = {
		control: (base: any, state: any) => ({
			...base,
			background: "none",
			border: "1px solid #c2c7df",
			height: "45px",
			paddingTop: "11px",
			fontSize: "0.9rem",
		}),
		placeholder: (base: any, state: any) => ({
			...base,
			color: "#333",
			fontSize: "0.9rem",
		}),
		menu: (base: any, state: any) => ({
			...base,
			color: "#333",
			fontSize: "0.9rem",
		}),
	};

	const selectInputRef = useRef<any>(null);

	useEffect(() => {
		if (clear) {
			console.log("Cleared??");
			selectInputRef.current?.clearValue();
		}
	}, [clear]);

	return (
		<FilterWrapper>
			<label className="label">{label}</label>
			<Select
				ref={selectInputRef}
				options={options}
				styles={customStyles}
				placeholder={`Select`}
				onChange={(v) => changeSelected(v?.value)}
			/>
		</FilterWrapper>
	);
};

export const BasicSearch = ({ searchVal, changeSearchVal }: SearchProp) => {
	return (
		<SearchBar>
			<input
				placeholder=""
				type="search"
				value={searchVal}
				onChange={(e) => changeSearchVal(e.target.value)}
			/>
			<FiSearch size={20} color="#0241FF" />
		</SearchBar>
	);
};

export const DateSelect = ({ dateVal, changeDateVal, label }: DateProp) => {
	return (
		<FilterWrapper>
			<label className="label">{label}</label>
			<DatePicker
				selected={dateVal}
				onChange={(date) => changeDateVal(date)}
				dateFormat="MMMM d, yyyy"
			/>
		</FilterWrapper>
	);
};

const BasicInputs = () => {
	return <div>BasicInputs</div>;
};

export default BasicInputs;
