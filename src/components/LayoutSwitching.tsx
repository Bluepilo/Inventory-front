import { LayoutSwitch } from "../styles/basic.styles";
import { IoGridSharp } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changePictureMode } from "../redux/features/basic/basic-slice";

const LayoutSwitching = () => {
	const dispatch = useAppDispatch();

	const { pictureMode } = useAppSelector((state) => state.basic);

	return (
		<LayoutSwitch pic={pictureMode ? "yes" : "no"}>
			<button
				className={pictureMode ? "" : "active"}
				onClick={() => dispatch(changePictureMode(false))}
			>
				<IoGridSharp />
			</button>
			<button
				className={pictureMode ? "active" : ""}
				onClick={() => dispatch(changePictureMode(true))}
			>
				<GrGallery />
			</button>
		</LayoutSwitch>
	);
};

export default LayoutSwitching;
