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
	open: boolean;
	minimizeHandler: (val: boolean) => void;
	minimized: boolean;
	onClose: () => void;
}

const Sidebar = ({ open, minimizeHandler, onClose, minimized }: Props) => {
	const { details } = useAppSelector((state) => state.auth);

	const { theme } = useAppSelector((state) => state.basic);

	const menuToLoad = () => {
		if (details.businessId) {
			return userRoutes;
		} else {
			return adminRoutes;
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
							/>
						) : (
							<NavLink key={r.id} links={r} onClose={onClose} />
						)
					)}
				</ul>
				{details.businessId && (
					<ul className="bottom">
						{bottomRoutes.map((r) =>
							r.children.length > 0 ? (
								<NavCollapse
									key={r.id}
									links={r}
									minimized={`${minimized}`}
									color={theme}
									onClose={onClose}
								/>
							) : (
								<NavLink
									key={r.id}
									links={r}
									onClose={onClose}
								/>
							)
						)}
					</ul>
				)}
			</SidebarMenu>
		</SidebarDiv>
	);
};

export default Sidebar;
