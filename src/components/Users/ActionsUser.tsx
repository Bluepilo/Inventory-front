import { Drop } from "../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";
import { useAppSelector } from "../../redux/hooks";
import basicService from "../../redux/features/basic/basic-service";
import { displayError } from "../../utils/errors";
import { toast } from "react-toastify";

const ActionsUser = ({
	detail,
	reload,
}: {
	detail: any;
	reload: () => void;
}) => {
	const { token, details } = useAppSelector((state) => state.auth);

	const activateOrDeactivate = async (action: string) => {
		try {
			await basicService.actionUser(token, action, detail.id);
			toast.success(`Staff has been ${action}d.`);
			reload();
		} catch (err) {
			displayError(err, true);
		}
	};

	return (
		<Drop>
			<Drop.Toggle size="sm" id="dropdown-basic">
				<HiDotsVertical />
			</Drop.Toggle>
			<Drop.Menu>
				{detail.id !== details.id && (
					<Drop.Item
						href="#"
						onClick={(e) => {
							e.preventDefault();
							activateOrDeactivate(
								detail.isActive ? "deactivate" : "activate"
							);
						}}
					>
						{detail.isActive ? "Deactivate" : "Activate"}
					</Drop.Item>
				)}
			</Drop.Menu>
		</Drop>
	);
};

export default ActionsUser;
