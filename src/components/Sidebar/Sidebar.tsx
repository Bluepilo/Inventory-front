import { useState } from "react";
import {
	SidebarDiv,
	SidebarLogo,
	SidebarMenu,
} from "../../styles/dashboard.styles";
import LogoIcon from "../../assets/images/logo-dark.png";
import Logo from "../../assets/images/logo.svg";
import SidebarMin from "../../assets/icons/sidebar-min.svg";
import { useAppSelector } from "../../redux/hooks";
import { adminRoutes, userRoutes } from "./routes";
import NavCollapse from "./NavCollapse";
import NavLink from "./NavLink";

interface Props {
	open: boolean;
	minimizeHandler: (val: boolean) => void;
	minimized: boolean;
	onClose: () => void;
}

const Sidebar = ({ open, minimizeHandler, onClose, minimized }: Props) => {
	const { details } = useAppSelector((state) => state.auth);

	const { theme } = useAppSelector((state) => state.basic);

	const menuToLoad = () => {
		if (!details.role.isAdmin) {
			return userRoutes;
		} else {
			return adminRoutes;
		}
	};

	const allowUser = (permit: any) => {
		if (details.role.isAdmin) {
			if (
				details.role.permissions.find((p) => p.method === permit[0]) ||
				permit.length === 0
			) {
				return true;
			} else {
				return false;
			}
		} else {
			if (permit.includes(details.businessRoleId)) {
				return true;
			} else {
				return false;
			}
		}
	};

	return (
		<SidebarDiv
			minimize={`${minimized}`}
			color={theme}
			className={open ? `open-m` : ""}
		>
			<SidebarLogo minimize={`${minimized}`}>
				<div className="images">
					{minimized ? (
						<img src={Logo} className="sub" alt="Logo" />
					) : (
						<img src={LogoIcon} className="icon" alt="Logo" />
					)}
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
			<SidebarMenu minimize={`${minimized}`} color={theme}>
				<ul className="first">
					{menuToLoad().map((r) =>
						r.children.length > 0 ? (
							<NavCollapse
								key={r.id}
								links={r}
								minimized={`${minimized}`}
								color={theme}
								onClose={onClose}
								permitted={allowUser(r.permission)}
							/>
						) : (
							<NavLink
								key={r.id}
								links={r}
								onClose={onClose}
								permitted={allowUser(r.permission)}
							/>
						)
					)}
				</ul>
			</SidebarMenu>
		</SidebarDiv>
	);
};

export default Sidebar;
