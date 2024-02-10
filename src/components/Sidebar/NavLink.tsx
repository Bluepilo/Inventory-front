import { NavLink as Link } from "react-router-dom";
import { SidebarMenusType } from "../../utils/types";

const NavLink = ({
	links,
	onClose,
}: {
	links: SidebarMenusType;
	onClose: () => void;
}) => {
	return (
		<li onClick={() => onClose()}>
			<Link to={links.href}>
				<img src={links.icon} alt={links.name} />
				<span>{links.name}</span>
			</Link>
		</li>
	);
};

export default NavLink;
