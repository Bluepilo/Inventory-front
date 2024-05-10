import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { useLocation, useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Form, FormBody } from "../../../styles/form.styles";
import { MainButton } from "../../../styles/links.styles";
import LoadModal from "../../../components/Loaders/LoadModal";
import { displayError } from "../../../utils/errors";
import adminService from "../../../redux/features/admin/admin-service";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";

const ResourceDetails = () => {
	const navigate = useNavigate();

	const stateData = useLocation().state;

	const { token } = useAppSelector((state) => state.auth);

	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [url, setUrl] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (stateData?.id) {
			setQuestion(stateData.question);
			setAnswer(stateData.answer);
			setUrl(stateData.videoLink);
		}
	}, [stateData]);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		if (question && answer) {
			let payload = {
				videoLink: url,
				answer,
				question,
			};
			try {
				setLoad(true);
				if (stateData?.id) {
					await adminService.updateFaq(payload, token, stateData.id);
				} else {
					await adminService.createFaq(payload, token);
				}
				setLoad(false);
				toast.success(
					`Resource has been ${stateData?.id ? "updated" : "created"}`
				);
				navigate(-1);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Please provide question and answer");
		}
	};

	return (
		<div>
			<TitleCover title={stateData?.question || `New Resource`} />
			<div className="mt-4">
				<div className="row">
					<div className="col-lg-8">
						<FormBody>
							<Form onSubmit={submitHandler}>
								<label>Question</label>
								<input
									type="text"
									value={question}
									onChange={(e) =>
										setQuestion(e.target.value)
									}
									className="height"
									required
								/>
								<label>Answer</label>
								<SunEditor
									height={"300"}
									onChange={(e) => setAnswer(e)}
									setContents={answer}
								/>
								<div className="mt-3">
									<label>Video URL</label>
									<input
										type="text"
										value={url}
										onChange={(e) => setUrl(e.target.value)}
										className="height"
									/>
								</div>
								<div className="text-center">
									<MainButton type="submit" right="true">
										<span>
											{stateData?.id
												? "Update "
												: "Create "}
											Resource
										</span>
									</MainButton>
								</div>
							</Form>
						</FormBody>
					</div>
				</div>
			</div>
			<LoadModal open={load} />
		</div>
	);
};

export default ResourceDetails;
