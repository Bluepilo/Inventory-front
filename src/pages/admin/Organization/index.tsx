import { useEffect, useState } from "react";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import TitleCover from "../../../components/TitleCover";
import { Table, TableComponent } from "../../../styles/table.styles";
import SkeletonTable from "../../../components/Loaders/SkeletonTable";
import { FaCircleCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import dateFormat from "dateformat";
import Paginate from "../../../components/Paginate";
import { SwitchDiv } from "../../../styles/basic.styles";
import {
	BasicSelect,
	OptionProp,
} from "../../../components/Filters/BasicInputs";
import SuccessIcon from "../../../assets/icons/success.svg";
import FailedIcon from "../../../assets/icons/failed.svg";
import subscriptionService from "../../../redux/features/subscription/subscriptionService";
import { Link } from "react-router-dom";
import { UseDebounce } from "../../../utils/hooks";
import DeletedList from "../../../components/Organization/DeletedList";
import Filters from "../../../components/Filters";
import { MainButton } from "../../../styles/links.styles";
import { displayError, displaySuccess } from "../../../utils/errors";

const Organization = () => {
	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [isLive, setIsLive] = useState(true);
	const [search, setSearch] = useState("");

	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [subTypes, setSubTypes] = useState<OptionProp[]>([]);
	const [subTypeId, setSubTypeId] = useState<OptionProp | null>(null);
	const [dateType, setDateType] = useState({
		label: "This Month",
		value: "month",
	});
	const [typeList, setTypeList] = useState<OptionProp[]>([
		{ value: "", label: "All" },
		{ value: "true", label: "Active" },
		{ value: "false", label: "Inactive" },
	]);
	const [typeId, setTypeId] = useState<OptionProp | null>({
		value: "",
		label: "All",
	});

	const debouncedSearch = UseDebounce(search);

	let filters = `?page=${page}&limit=${limit}&startDate=${startDate}&isActive=${
		typeId?.value
	}&&endDate=${endDate}&searchWord=${debouncedSearch}&planId=${
		subTypeId?.value || ""
	}`;

	const { token } = useAppSelector((state) => state.auth);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (isLive) {
			listOrgnaizations();
		} else {
			listDeletedOrgnaizations();
		}
	}, [filters, isLive]);

	useEffect(() => {
		getPlans();
	}, []);

	const listOrgnaizations = async () => {
		try {
			setList([]);
			setLoad(true);
			let res = await adminService.listOrganization(filters, token);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const listDeletedOrgnaizations = async () => {
		try {
			setList([]);
			setLoad(true);
			let res = await adminService.listDeletedOrganization(
				filters,
				token
			);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const getPlans = async () => {
		try {
			let res = await subscriptionService.getPlans(token);
			let arr = res?.map((a: any) => {
				return { label: a.name, value: a.id };
			});
			setSubTypes(arr || []);
		} catch (err) {}
	};

	const showFreeTrial = (name: string, isTrial: boolean) => {
		if (name?.includes("Free") && isTrial) {
			return true;
		} else {
			return false;
		}
	};

	const clearFilters = () => {
		setStartDate(
			new Date(new Date().getFullYear(), new Date().getMonth(), 1)
		);
		setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
		setDateType({ label: "This Month", value: "month" });
	};

	const actionHandler = async (user: any, active: boolean) => {
		if (
			window.confirm(
				`Are you sure you want to ${
					active ? "Deactivate" : "Activate"
				} ${user.name}`
			)
		) {
			try {
				setLoad(true);
				await adminService.actionOrganization(
					token,
					user.id,
					active ? "deactivate" : "activate"
				);
				listOrgnaizations();
				displaySuccess(
					`${user.name} ${active ? "Deactivated" : "Activated"}`
				);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return (
		<div>
			<TitleCover title="Organizations" dataCount={list?.count} />
			<SwitchDiv>
				<div
					className={isLive ? "active" : ""}
					onClick={() => setIsLive(true)}
				>
					Live Accounts
				</div>
				<div
					className={isLive ? "" : "active"}
					onClick={() => setIsLive(false)}
				>
					Deleted Accounts
				</div>
			</SwitchDiv>
			<Filters
				searchVal={search}
				isSearchable={true}
				changeSearchVal={setSearch}
				startDate={startDate}
				changeStartDate={setStartDate}
				endDate={endDate}
				changeEndDate={setEndDate}
				clearValues={clearFilters}
				others={subTypeId}
				changeOthers={setSubTypeId}
				othersLabel="Subscription Type"
				othersList={subTypes}
				dateType={dateType}
				changeDateType={setDateType}
				placeholder="Search by name, address or phone"
			>
				{isLive ? (
					<div className="col-lg-2 col-md-4 col-6 mb-3">
						<BasicSelect
							value={typeId}
							options={typeList}
							label="Type"
							changeSelected={setTypeId}
						/>
					</div>
				) : (
					<></>
				)}
			</Filters>
			<div className="mt-3">
				{isLive ? (
					<TableComponent>
						<div className="table-responsive">
							<Table className="table">
								<thead>
									<tr>
										<th>Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Owner Name</th>
										<th>Organization ID</th>
										<th>Active Subscription</th>
										<th>Expiry Date</th>
										<th>Date Registered</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{!load &&
										list?.rows?.map((org: any) => (
											<tr key={org.id}>
												<td className="link">
													<Link to={`${org.id}`}>
														{org.name}
													</Link>{" "}
												</td>
												<td>
													<span className="me-2">
														{org.email}
													</span>
													{org.emailVerifiedAt ? (
														<FaCircleCheck color="green" />
													) : (
														<FcCancel />
													)}
												</td>
												<td>{org.phone}</td>
												<td>
													{org.ownerFirstName}{" "}
													{org.ownerLastName}
												</td>
												<td>{org.uniqueId}</td>
												<td>
													{showFreeTrial(
														org?.subscriptionPlan
															?.name,
														org.isTrialOn
													)
														? "On Trial"
														: org.subscriptionPlan
																?.name}
												</td>
												<td>
													{showFreeTrial(
														org?.subscriptionPlan
															?.name,
														org.isTrialOn
													)
														? dateFormat(
																org.trialEndedAt,
																"mmm dd, yyyy"
														  )
														: org.subscription
														? dateFormat(
																org
																	?.subscription
																	?.endDate,
																"mmm dd, yyyy"
														  )
														: "No Expiry Date"}
												</td>
												<td>
													{dateFormat(
														org.createdAt,
														"mmm dd, yyyy"
													)}
												</td>
												<td>
													<img
														src={
															org.isActive
																? SuccessIcon
																: FailedIcon
														}
													/>
												</td>
												<td className="link">
													<MainButton
														sm="true"
														bg={
															org.isActive
																? "red"
																: ""
														}
														onClick={() =>
															actionHandler(
																org,
																org.isActive
															)
														}
													>
														{org.isActive
															? "Deactivate"
															: "Activate"}
													</MainButton>
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						{load && <SkeletonTable />}
					</TableComponent>
				) : (
					<DeletedList data={list.rows} load={load} />
				)}
				{!load && list?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={limit}
						count={list.count}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Organization;
