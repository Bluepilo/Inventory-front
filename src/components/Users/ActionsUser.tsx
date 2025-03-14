import { useState } from "react";
import { Drop } from "../../styles/basic.styles";
import { HiDotsVertical } from "react-icons/hi";
import { useAppSelector } from "../../redux/hooks";
import basicService from "../../redux/features/basic/basic-service";
import { displayError } from "../../utils/errors";
import { toast } from "react-toastify";
import ModalComponent from "../ModalComponent";
import AddToBusiness from "./AddToBusiness";

const ActionsUser = ({
	detail,
	reload,
	more,
	action,
}: {
	detail: any;
	reload: () => void;
	more?: boolean;
	action?: (arg: any) => void;
}) => {
	const { details } = useAppSelector((state) => state.auth);

	const [openModal, setOpenModal] = useState(false);

	const activateOrDeactivate = async (action: string) => {
		if (window.confirm(`Are you sure you want to ${action}?`)) {
			try {
				await basicService.actionUser(action, detail.id);
				toast.success(`Staff has been ${action}d.`);
				reload();
			} catch (err) {
				displayError(err, true);
			}
		}
	};

	const deleteUser = async () => {
		if (window.confirm(`Are you sure you want delete user?`)) {
			try {
				await basicService.deleteUser(detail.id);
				toast.success(`Staff has been deleted.`);
				reload();
			} catch (err) {
				displayError(err, true);
			}
		}
	};

	return (
		<>
			<Drop>
				<Drop.Toggle size="sm" id="dropdown-basic">
					<HiDotsVertical />
				</Drop.Toggle>
				<Drop.Menu>
					{detail.id !== details.id && (
						<>
							<Drop.Item
								href="#"
								onClick={(e) => {
									e.preventDefault();
									activateOrDeactivate(
										detail.isActive
											? "deactivate"
											: "activate"
									);
								}}
							>
								{detail.isActive ? "Deactivate" : "Activate"}
							</Drop.Item>
							{detail.transactions?.length === 0 && (
								<Drop.Item
									href="#"
									onClick={(e) => {
										e.preventDefault();
										deleteUser();
									}}
								>
									Delete User
								</Drop.Item>
							)}
						</>
					)}
					{more && (
						<>
							{action && (
								<Drop.Item
									href="#"
									onClick={(e) => {
										e.preventDefault();
										action(detail);
									}}
								>
									Edit
								</Drop.Item>
							)}
							<Drop.Item
								href="#"
								onClick={(e) => {
									e.preventDefault();
									setOpenModal(true);
								}}
							>
								Add to business
							</Drop.Item>
						</>
					)}
				</Drop.Menu>
			</Drop>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title={`${detail.firstName} ${detail.lastName}`}
			>
				<AddToBusiness
					detail={detail}
					close={() => {
						setOpenModal(false);
						reload();
					}}
				/>
			</ModalComponent>
		</>
	);
};

export default ActionsUser;
