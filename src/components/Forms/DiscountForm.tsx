import { useEffect, useState } from "react";
import { displayError } from "../../utils/errors";
import { CheckBox, Form } from "../../styles/form.styles";
import dateFormat from "dateformat";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import adminService from "../../redux/features/admin/admin-service";
import { UseDebounce } from "../../utils/hooks";
import { DropStyle } from "../../styles/filters.styles";

const DiscountForm = ({
	detail,
	onComplete,
}: {
	detail: any;
	onComplete: () => void;
}) => {
	const [name, setName] = useState("");
	const [value, setValue] = useState("");
	const [type, setType] = useState("");
	const [condition, setCondition] = useState("");
	const [organizationId, setOrganizationId] = useState(null);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [usage, setUsage] = useState(false);
	const [load, setLoad] = useState(false);
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);

	const debouncedSearch = UseDebounce(search);

	useEffect(() => {
		if (debouncedSearch) {
			searchHandler();
		}
	}, [debouncedSearch]);

	useEffect(() => {
		if (detail?.id) {
			setName(detail.name);
			setCondition(detail.condition);
			setOrganizationId(detail.organizationId);
			setType(detail.type);
			setStartDate(dateFormat(detail.startDate, "yyyy-mm-dd"));
			setEndDate(dateFormat(detail.expiryDate, "yyyy-mm-dd"));
			setUsage(detail.usage);
			setValue(detail.value);
		}
	}, [detail]);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		try {
			let payload = {
				name,
				value,
				type,
				condition,
				organizationId: organizationId ? `${organizationId}` : null,
				startDate: dateFormat(startDate, "yyyy-mm-dd"),
				expiryDate: dateFormat(endDate, "yyyy-mm-dd"),
				usage: usage ? 1 : 0,
			};
			setLoad(true);
			if (detail?.id) {
				await adminService.updateDiscount(payload, detail.id);
			} else {
				await adminService.createDiscount(payload);
			}
			setLoad(false);
			onComplete();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const searchHandler = async () => {
		try {
			let res = await adminService.listOrganization(
				`?searchWord=${debouncedSearch}`
			);
			if (Array.isArray(res?.rows)) {
				setResults(res.rows);
			}
		} catch (err) {}
	};

	return (
		<Form onSubmit={submitHandler}>
			<div className="row">
				<div className="col-lg-6">
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>Discount Type</label>
					<select
						value={type}
						onChange={(e) => setType(e.target.value)}
						required
						disabled={load}
						className="height"
					>
						<option value={""}>Select One</option>
						<option value={"percentage"}>Percentage</option>
						<option value={"flat_amount"}>Flat Amount</option>
					</select>
				</div>
				<div className="col-lg-6">
					<label>Value</label>
					<input
						type="number"
						required
						disabled={load}
						className="height"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
				<div className="col-lg-6">
					<label>Condition</label>
					<select
						value={condition}
						onChange={(e) => {
							setCondition(e.target.value);
							setOrganizationId(null);
						}}
						required
						disabled={load}
						className="height"
					>
						<option value={""}>Select One</option>
						<option value={"all"}>For All</option>
						<option value={"new_account"}>New Accounts</option>
						<option value={"specific_account"}>
							Specific Account
						</option>
					</select>
				</div>
				{condition === "specific_account" && (
					<div className="col-lg-12">
						<label>Organization</label>
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							required
							disabled={load}
							className="height"
							placeholder="Search Organization"
						/>
						<DropStyle>
							{results.map((result: any) => (
								<div
									className="item"
									onClick={() => {
										setOrganizationId(result.id);
										setResults([]);
										setSearch(result.name);
									}}
								>
									<span>{result.name}</span>
								</div>
							))}
						</DropStyle>
					</div>
				)}

				<div className="col-lg-6">
					<label>Start Date</label>
					<input
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-6">
					<label>End Date</label>
					<input
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
				</div>
				<div className="col-lg-12">
					<CheckBox>
						<input
							type="checkbox"
							checked={usage}
							onChange={(e) => setUsage(e.target.checked)}
							disabled={load}
						/>
						<span>Activate?</span>
					</CheckBox>
				</div>
				<div className="col-lg-12">
					{load ? (
						<Loading />
					) : (
						<ButtonSubmit type="submit">
							{detail ? "Update" : "Add"} Discount
						</ButtonSubmit>
					)}
				</div>
			</div>
		</Form>
	);
};

export default DiscountForm;
