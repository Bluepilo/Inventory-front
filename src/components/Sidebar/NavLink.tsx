import { NavLink as Link } from "react-router-dom";
import { SidebarMenusType } from "../../utils/types";

const NavLink = ({
	links,
	onClose,
	permitted,
}: {
	links: SidebarMenusType;
	onClose: () => void;
	permitted: boolean;
}) => {
	return permitted ? (
		<li onClick={() => onClose()}>
			<Link to={links.href}>
				<img src={links.icon} alt={links.name} />
				<span>{links.name}</span>
			</Link>
		</li>
	) : (
		<></>
	);
};

export default NavLink;
