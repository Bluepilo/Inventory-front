import React, { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { FiUserPlus } from "react-icons/fi";
import ModalComponent from "../../../components/ModalComponent";
import AddUser from "../../../components/Users/AddUser";
import customerService from "../../../redux/features/customer/customer-services";
import { useAppSelector } from "../../../redux/hooks";

const Users = () => {
	const { token } = useAppSelector((state) => state.auth);

	const [lists, setLists] = useState<any>({});
	const [openModal, setOpenModal] = useState(false);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		listUsers();
	}, []);

	const listUsers = async () => {
		try {
			setLoad(true);
			let res = await customerService.listUsers(token, "");
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<div>
			<TitleCover
				title="Users"
				dataCount={lists?.count}
				button="New User"
				buttonIcon={<FiUserPlus />}
				buttonClick={() => {
					setOpenModal(true);
				}}
			/>
			<ModalComponent
				open={openModal}
				close={() => setOpenModal(false)}
				title="Create New User"
			>
				<AddUser
					onComplete={() => {
						setOpenModal(false);
						listUsers();
					}}
				/>
			</ModalComponent>
		</div>
	);
};

export default Users;
