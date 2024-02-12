import { HeaderProfile } from "../../styles/header.styles";
import OutsideClick from "../OutsideClick";
import { AiOutlineLogout } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import SmsIcon from "../../assets/images/sms-icon.svg";
import AppsIcon from "../../assets/icons/apps.svg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeTheme } from "../../redux/features/basic/basic-slice";
import { logout } from "../../redux/features/auth/auth-slice";

const HeaderDropDown = ({
	setOpenDrop,
}: {
	setOpenDrop: (arg: boolean) => void;
}) => {
	const dispatch = useAppDispatch();

	const { details } = useAppSelector((state) => state.auth);

	return (
		<HeaderProfile>
			<OutsideClick handleToggle={() => setOpenDrop(false)}>
				<div className="head">
					<FaRegUser />
					<div>
						<p>{details.fullName}</p>
						<p>{details?.role.name}</p>
					</div>
				</div>
				{details.businessId && (
					<div className="apps mb-3">
						<a href={"#"} target="_blank" className="box bluepilo">
							<img src={SmsIcon} alt="Bluepilo" />
							<p>Bluepilo SMS</p>
						</a>
						<a href="#" className="box others">
							<img src={AppsIcon} alt="Bluepilo" />
							<p>Other Apps</p>
						</a>
					</div>
				)}
				<div className="apps">
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							dispatch(logout());
						}}
						className="box"
					>
						<AiOutlineLogout size={20} />
						<p>Logout</p>
					</a>
					<Link
						to="/"
						onClick={() => setOpenDrop(false)}
						className="box"
					>
						<IoSettingsOutline size={20} />
						<p>Settings</p>
					</Link>
				</div>
				<div className="switch-p">
					<button
						onClick={() => dispatch(changeTheme("light"))}
					></button>
					<button
						onClick={() => dispatch(changeTheme("dark"))}
					></button>
				</div>
				<p className="text">Switch Theme</p>
			</OutsideClick>
		</HeaderProfile>
	);
};

export default HeaderDropDown;
