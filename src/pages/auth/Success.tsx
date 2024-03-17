import { ResendBox } from "../../styles/auth.styles";
import Loading from "../../components/Loaders/Loading";
import { MainButton } from "../../styles/links.styles";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/auth-slice";

const Success = () => {
	const dispatch = useAppDispatch();

	const loginHandler = () => {
		dispatch(logout());
	};

	return (
		<div className="mt-4">
			<ResendBox>
				<p>Welcome! Your account is ready!</p>
				<p>You will be redirected...</p>
				<Loading />
				<div className="text-center mt-5">
					<p>OR</p>
					<MainButton onClick={() => loginHandler()}>
						<span>Login</span>
					</MainButton>
				</div>
			</ResendBox>
		</div>
	);
};

export default Success;
