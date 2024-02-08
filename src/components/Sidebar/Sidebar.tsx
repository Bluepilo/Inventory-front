import { useState } from "react";
import {
	SidebarDiv,
	SidebarLogo,
	SidebarMenu,
} from "../../styles/dashboard.styles";
import LogoIcon from "../../assets/images/logo-icon.svg";
import LogoText from "../../assets/images/bluepilo.svg";
import SidebarMin from "../../assets/icons/sidebar-min.svg";
import { useAppSelector } from "../../redux/hooks";
import { adminRoutes, bottomRoutes, userRoutes } from "./routes";
import NavCollapse from "./NavCollapse";
import NavLink from "./NavLink";

interface Props {
	handleToggle: () => void;
	open: boolean;
	minimizeHandler: (val: boolean) => void;
	minimized: boolean;
	onClose: () => void;
}

const Sidebar = ({
	handleToggle,
	open,
	minimizeHandler,
	onClose,
	minimized,
}: Props) => {
	const { details } = useAppSelector((state) => state.auth);

	const [color, setColor] = useState("#CFEAFF");

	const menuToLoad = () => {
		if (details.businessId) {
			return userRoutes;
		} else {
			return adminRoutes;
		}
	};

	return (
		<SidebarDiv minimize={`${minimized}`} color={color}>
			<SidebarLogo minimize={`${minimized}`}>
				<div className="images">
					<img src={LogoIcon} className="icon" alt="Logo" />
					<img src={LogoText} className="sub" alt="Logo" />
				</div>
				<a
					href="#"
					className="minimize-btn"
					onClick={(e) => {
						e.preventDefault();
						minimizeHandler(!minimized);
					}}
				>
					<img src={SidebarMin} />
				</a>
			</SidebarLogo>
			<SidebarMenu minimize={`${minimized}`}>
				<ul>
					{menuToLoad().map((r) =>
						r.children.length > 0 ? (
							<NavCollapse key={r.id} links={r} />
						) : (
							<NavLink key={r.id} links={r} />
						)
					)}
				</ul>
				<ul className="bottom">
					{bottomRoutes.map((r) =>
						r.children.length > 0 ? (
							<NavCollapse key={r.id} links={r} />
						) : (
							<NavLink key={r.id} links={r} />
						)
					)}
				</ul>
			</SidebarMenu>
		</SidebarDiv>
	);
};

export default Sidebar;
