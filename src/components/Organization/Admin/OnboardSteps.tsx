import { useEffect, useState } from "react";
import { DetailCard } from "../../../styles/sale.styles";

const OnboardSteps = ({ allBiz }: { allBiz: any }) => {
	const [val, setVal] = useState(allBiz[0]?.id);
	const [steps, setSteps] = useState<any>({});

	useEffect(() => {
		if (val) {
			setSteps(
				allBiz?.find((biz: any) => biz.id == val)?.onboardingSteps
			);
		}
	}, [val]);

	return (
		<DetailCard>
			<h5 className="mb-3">Onboarding Steps</h5>
			<select
				className="select"
				value={val}
				onChange={(e) => setVal(e.target.value)}
			>
				<option value={""}>Select Business</option>
				{allBiz?.map((biz: any) => (
					<option key={biz.id} value={biz.id}>
						{biz.name}
					</option>
				))}
			</select>
			<div className="body mt-3">
				<div className="row">
					<span className="col-4 mb-2">Trial Pick:</span>
					<b className="col-8 mb-2">
						{steps?.trialPick ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Shop:</span>
					<b className="col-8 mb-2">
						{steps?.shop ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Subdealer:</span>
					<b className="col-8 mb-2">
						{steps?.subdealer ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Suppliers:</span>
					<b className="col-8 mb-2">
						{steps?.supplier ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Transfers:</span>
					<b className="col-8 mb-2">
						{steps?.transfer ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Purchase:</span>
					<b className="col-8 mb-2">
						{steps?.purchase ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Expense:</span>
					<b className="col-8 mb-2">
						{steps?.expense ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Sales:</span>
					<b className="col-8 mb-2">
						{steps?.sales ? "Completed" : "Pending"}
					</b>
					<span className="col-4 mb-2">Catalogue:</span>
					<b className="col-8 mb-2">
						{steps?.product ? "Completed" : "Pending"}
					</b>
				</div>
			</div>
		</DetailCard>
	);
};

export default OnboardSteps;
