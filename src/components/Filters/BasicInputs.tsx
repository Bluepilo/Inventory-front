import Select from "react-select";
import { FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
import {
	DropDownStyle,
	FilterWrapper,
	SaleSelectStyle,
	SearchBar,
} from "../../styles/filters.styles";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";

export interface OptionProp {
	value: string | number;
	label: string;
	isActive?: boolean;
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
	label?: string;
	clear?: boolean;
}

interface SelectProp2 {
	options: OptionProp[];
	changeSelected: (arg: any) => void;
	label?: string;
	value: OptionProp | null;
	loading?: boolean;
	placeholder?: string;
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

export const SaleSelect = ({ options, changeSelected, value }: SelectProp2) => {
	const customStyles = {
		control: (base: any, state: any) => ({
			...base,
			background: "#000D33",
			border: "1px solid #c2c7df",
			height: "40px",
			width: "200px",
			fontSize: "0.9rem",
			borderRadius: "4px",
			boxShadow: state.isFocused ? 0 : 0,
		}),
		placeholder: (base: any, state: any) => ({
			...base,
			color: "#FFB900",
			fontSize: "0.9rem",
		}),
		menu: (base: any, state: any) => ({
			...base,
			color: "#333",
			fontSize: "0.9rem",
		}),
		singleValue: (base: any, state: any) => ({
			...base,
			color: "#FFB900",
			fontSize: "0.9rem",
		}),
	};

	return (
		<SaleSelectStyle>
			<p>Selling from</p>
			<Select
				options={options}
				styles={customStyles}
				placeholder={`Select`}
				onChange={(v) => changeSelected(v)}
				value={value}
			/>
		</SaleSelectStyle>
	);
};

export const DropDownSelect = ({
	options,
	changeSelected,
	value,
	label,
	loading,
	placeholder,
}: SelectProp2) => {
	const customStyles = {
		control: (base: any, state: any) => ({
			...base,
			background: "#fff",
			border: "1px solid #c2c7df",
			height: "45px",
			width: "100%",
			fontSize: "0.9rem",
			borderRadius: "4px",
			boxShadow: state.isFocused ? 0 : 0,
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
		singleValue: (base: any, state: any) => ({
			...base,
			color: "#333",
			fontSize: "0.9rem",
		}),
	};

	return (
		<DropDownStyle>
			<p>{label}</p>
			<Select
				options={options}
				styles={customStyles}
				placeholder={placeholder || `Select`}
				onChange={(v) => changeSelected(v)}
				value={value}
				isLoading={loading}
				isClearable
			/>
		</DropDownStyle>
	);
};

const BasicInputs = () => {
	return <div>BasicInputs</div>;
};

export default BasicInputs;
