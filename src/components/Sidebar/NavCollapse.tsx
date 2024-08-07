import { GoChevronDown } from "react-icons/go";
import { SidebarMenusType } from "../../utils/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { SidebarDropDown } from "../../styles/dashboard.styles";
import OutsideClick from "../OutsideClick";
import { useAppSelector } from "../../redux/hooks";

const NavCollapse = ({
	links,
	minimized,
	color,
	onClose,
	permitted,
}: {
	links: SidebarMenusType;
	minimized: string;
	color: string;
	onClose: () => void;
	permitted: boolean;
}) => {
	const { details } = useAppSelector((state) => state.auth);

	const [open, setOpen] = useState(false);

	const location = useLocation();

	const toggleDropDown = (e: any) => {
		e.preventDefault();
		setOpen(!open);
	};

	useEffect(() => {
		if (location.pathname.split("/")[2] === links.name) {
			setOpen(true);
		}
	}, []);

	const allowUser = (permit: any) => {
		if (details.shopId && permit?.includes("admin")) {
			return false;
		} else if (details.role.isAdmin) {
			if (details.role.permissions.find((p) => p.method === permit[0])) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};

	return permitted ? (
		<OutsideClick handleToggle={() => setOpen(false)}>
			<SidebarDropDown
				minimize={minimized}
				color={color}
				className={links.id == 12 ? "top-b" : ""}
			>
				<a href={links.href} onClick={toggleDropDown}>
					<img src={links.icon} alt={links.name} />
					<span>{links.name}</span>
					<GoChevronDown />
				</a>
				{open && (
					<ul className="side-dropdown" onClick={() => onClose()}>
						{links.children.map((link) => (
							<li key={link.id}>
								{allowUser(link.permission) ? (
									link.name === "Import Inventory" &&
									!details?.business?.canOnboard ? (
										<></>
									) : (
										<NavLink to={link.href}>
											{link.name}
										</NavLink>
									)
								) : (
									<></>
								)}
							</li>
						))}
					</ul>
				)}
			</SidebarDropDown>
		</OutsideClick>
	) : (
		<></>
	);
};

export default NavCollapse;
