import { useState } from "react";

import {
	HeaderDetail,
	HeaderInfo,
	HeaderStyle,
	Progress,
} from "../styles/header.styles";
import FlashIcon from "../assets/icons/flash.svg";
import { FaBell, FaRegUser } from "react-icons/fa";
import { FcOnlineSupport } from "react-icons/fc";
import { MdMenu } from "react-icons/md";
import HeaderDropDown from "./Sidebar/Header/HeaderDropDown";
import NotificationDropDown from "./Sidebar/Header/NotificationDropDown";
import { useAppSelector } from "../redux/hooks";

const Header = ({ openMenu }: { openMenu: () => void }) => {
	const { details } = useAppSelector((state) => state.auth);

	const [openDrop, setOpenDrop] = useState(false);
	const [openNoti, setOpenNoti] = useState(false);

	return (
		<HeaderStyle>
			<HeaderDetail>
				<div className="business">
					<h6>
						{details.businessId
							? details?.business?.name
							: "Bluepilo"}
					</h6>
				</div>
				{details.businessId && (
					<Progress color="#F44336">
						<img src={FlashIcon} />
						<span>0% Setup</span>
					</Progress>
				)}
			</HeaderDetail>
			<HeaderInfo>
				{details.businessId && (
					<>
						<p>
							Currently on <b>free</b>
						</p>
						<button className="upgrade">Upgrade</button>
						<button className="bell">
							<FaBell />
							<span>273</span>
						</button>
						<button className="support hide">
							<FcOnlineSupport />
						</button>
					</>
				)}
				<button className="profile" onClick={() => setOpenDrop(true)}>
					<FaRegUser />
				</button>
				<button className="support menu" onClick={openMenu}>
					<MdMenu />
				</button>
			</HeaderInfo>
			{openDrop && <HeaderDropDown setOpenDrop={setOpenDrop} />}
			{openNoti && <NotificationDropDown />}
		</HeaderStyle>
	);
};

export default Header;
