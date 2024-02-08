import { NavLink as Link } from "react-router-dom";
import { SidebarMenusType } from "../../utils/types";

const NavLink = ({ links }: { links: SidebarMenusType }) => {
	return (
		<li>
			<Link to={links.href}>
				<img src={links.icon} alt={links.name} />
				<span>{links.name}</span>
			</Link>
		</li>
	);
};

export default NavLink;
