import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import { CheckBox } from "../../../styles/form.styles";
import { MainButton } from "../../../styles/links.styles";
import { displayError } from "../../../utils/errors";
import { toast } from "react-toastify";
import Loading from "../../../components/Loaders/Loading";
import PermissionDenied from "../../../components/PermissionDenied";

const Terms = () => {
	const { details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [termsData, setTermsData] = useState("");
	const [showPrompt, setShowPrompt] = useState(false);
	const [promptUpdate, setPromptUpdate] = useState(false);

	useEffect(() => {
		getTerms();
	}, []);

	const getTerms = async () => {
		try {
			setLoad(true);
			let res = await adminService.getTerms();
			setLoad(false);
			setTermsData(res);
		} catch (err) {
			setLoad(false);
		}
	};

	const changeTerms = (val: string) => {
		setShowPrompt(true);
		setTermsData(val);
	};

	const submitHandler = async () => {
		try {
			setLoad(true);
			await adminService.setTerms({
				terms: termsData,
				promptUpdate: promptUpdate ? 1 : 0,
			});
			setLoad(false);
			toast.success("Terms updated.");
			getTerms();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return details?.role?.permissions?.find(
		(f) => f.method === "getTermsAndCondition"
	) ? (
		<div>
			<TitleCover title="Terms and Conditions" />
			<div className="mt-4">
				<textarea
					name="terms"
					id=""
					cols={30}
					rows={20}
					className="form-control"
					onChange={(e) => changeTerms(e.target.value)}
					value={termsData}
				/>
				<div className="mt-4">
					{showPrompt && (
						<CheckBox>
							<input
								type="checkbox"
								checked={promptUpdate}
								onChange={(e) =>
									setPromptUpdate(e.target.checked)
								}
							/>
							<span>Prompt businesses for update</span>
						</CheckBox>
					)}
					{load ? (
						<Loading />
					) : details?.role?.permissions?.find(
							(f) => f.method === "setTermsAndCondition"
					  ) ? (
						<MainButton onClick={() => submitHandler()}>
							<span>Update Terms</span>
						</MainButton>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default Terms;
