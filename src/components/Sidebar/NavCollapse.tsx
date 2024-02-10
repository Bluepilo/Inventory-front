import { GoChevronDown } from "react-icons/go";
import { SidebarMenusType } from "../../utils/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { SidebarDropDown } from "../../styles/dashboard.styles";
import OutsideClick from "../OutsideClick";

const NavCollapse = ({
	links,
	minimized,
	color,
	onClose,
}: {
	links: SidebarMenusType;
	minimized: string;
	color: string;
	onClose: () => void;
}) => {
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

	return (
		<OutsideClick handleToggle={() => setOpen(false)}>
			<SidebarDropDown minimize={minimized} color={color}>
				<a href={links.href} onClick={toggleDropDown}>
					<img src={links.icon} alt={links.name} />
					<span>{links.name}</span>
					<GoChevronDown />
				</a>
				{open && (
					<ul className="side-dropdown" onClick={() => onClose()}>
						{links.children.map((link) => (
							<li key={link.id}>
								<NavLink to={link.href}>{link.name}</NavLink>
							</li>
						))}
					</ul>
				)}
			</SidebarDropDown>
		</OutsideClick>
	);
};

export default NavCollapse;
