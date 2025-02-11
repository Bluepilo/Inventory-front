import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaPlus, FaTrash } from "react-icons/fa6";
import basicService from "../../../redux/features/basic/basic-service";
import { useAppSelector } from "../../../redux/hooks";
import { displayError } from "../../../utils/errors";
import FaqLoad from "../../../components/Loaders/FaqLoad";
import { ResourceList } from "../../../styles/basic.styles";
import dateFormat from "dateformat";
import adminService from "../../../redux/features/admin/admin-service";
import { toast } from "react-toastify";
import PermissionDenied from "../../../components/PermissionDenied";

const Resource = () => {
	const navigate = useNavigate();

	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [faqs, setFaqs] = useState<any>([]);

	useEffect(() => {
		loadFaqs();
	}, []);

	const loadFaqs = async () => {
		try {
			setLoad(true);
			let res = await adminService.loadFaqs(token);
			setLoad(false);
			setFaqs(Array.isArray(res) ? res : []);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const goTo = (faq: any) => {
		let str = faq.question;
		str = str.replace(/\s+/g, "-");
		navigate(`${str?.toLowerCase()}`, { state: faq });
	};

	const deleteHandler = async (id: string) => {
		if (window.confirm("Are you sure you want to delete?")) {
			try {
				setLoad(true);
				await adminService.deleteFaq(token, id);
				setLoad(false);
				toast.success("Resource has been deleted.");
				loadFaqs();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return details?.role?.permissions?.find((f) => f.method === "allFaqs") ? (
		<div>
			<TitleCover
				title={`Resources`}
				button={"Add New"}
				buttonIcon={<FaPlus />}
				buttonClick={() => {
					navigate("new");
				}}
			/>
			<div className="mt-4 row">
				<div className="col-lg-8">
					{load ? (
						<FaqLoad />
					) : (
						<ResourceList>
							{faqs.map((faq: any) => (
								<div className="cover-box" key={faq.id}>
									<div
										className="box shadow-sm"
										onClick={() => goTo(faq)}
									>
										<div>
											<h5>{faq.question}</h5>
											<p>
												Last Updated:{" "}
												{dateFormat(
													faq.updatedAt,
													"mmm dd, yyyy | h:MM TT"
												)}
											</p>
										</div>

										<FaAngleRight />
									</div>
									<button
										onClick={() => deleteHandler(faq.id)}
									>
										<FaTrash />
									</button>
								</div>
							))}
						</ResourceList>
					)}
				</div>
			</div>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default Resource;
