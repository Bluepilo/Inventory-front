import { useNavigate } from "react-router-dom";
import Img from "../../assets/defaults/sales.png";
import { MainButton } from "../../styles/links.styles";
import { useAppDispatch } from "../../redux/hooks";
import { subModalAction } from "../../redux/features/auth/auth-slice";

const SubAds = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	return (
		<div>
			<div className="text-center">
				<div
					style={{
						height: 150,
						width: 150,
						display: "inline-flex",
						justifyContent: "center",
						alignItems: "center",
						border: "4px solid rgba(0,0,0,0.3)",
						borderRadius: "50%",
						marginBottom: "20px",
					}}
				>
					<img src={Img} height={100} />
				</div>
				<p>You do not have an active subscription.</p>
				<p>
					Enjoy our services to the fullest by clicking on the button
					below to subscribe.
				</p>
				<MainButton
					onClick={() => {
						dispatch(subModalAction(false));
						navigate("/dashboard/subscription/upgrade");
					}}
				>
					<span>Subscribe</span>
				</MainButton>
				<MainButton
					className="ms-3"
					bg="#f0f0f0"
					color="#000"
					onClick={() => {
						dispatch(subModalAction(false));
					}}
				>
					<span>Cancel</span>
				</MainButton>
			</div>
		</div>
	);
};

export default SubAds;
