import { GoChevronDown } from "react-icons/go";
import { SidebarMenusType } from "../../utils/types";

const NavCollapse = ({ links }: { links: SidebarMenusType }) => {
	return (
		<li>
			<a href={links.href}>
				<img src={links.icon} alt={links.name} />
				<span>{links.name}</span>
				<GoChevronDown />
			</a>
		</li>
	);
};

export default NavCollapse;
