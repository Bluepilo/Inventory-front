import { LayoutSwitch } from "../styles/basic.styles";
import { RiTable3 } from "react-icons/ri";
import { BsFillImageFill } from "react-icons/bs";
import { IoGridSharp } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";

const LayoutSwitching = ({
	pictureMode,
	setPictureMode,
}: {
	pictureMode: boolean;
	setPictureMode: (arg: boolean) => void;
}) => {
	return (
		<LayoutSwitch pic={pictureMode ? "yes" : "no"}>
			<button
				className={pictureMode ? "" : "active"}
				onClick={() => setPictureMode(false)}
			>
				<IoGridSharp />
			</button>
			<button
				className={pictureMode ? "active" : ""}
				onClick={() => setPictureMode(true)}
			>
				<GrGallery />
			</button>
		</LayoutSwitch>
	);
};

export default LayoutSwitching;
