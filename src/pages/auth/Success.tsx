import { ResendBox } from "../../styles/auth.styles";
import Loading from "../../components/Loaders/Loading";
import { MainButton } from "../../styles/links.styles";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/auth-slice";
import { useNavigate } from "react-router-dom";

const Success = () => {
	const navigate = useNavigate();

	return (
		<div className="mt-4">
			<ResendBox>
				<p>Welcome! Your account is ready!</p>
				<p>You will be redirected...</p>
				<Loading />
				<div className="text-center mt-5">
					<p>OR</p>
					<MainButton onClick={() => navigate("/")}>
						<span>Login</span>
					</MainButton>
				</div>
			</ResendBox>
		</div>
	);
};

export default Success;
