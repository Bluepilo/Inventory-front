import { useState } from "react";
import { NotifcationStyles } from "../../styles/header.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ReactTimeAgo from "react-time-ago";
import OutsideClick from "../OutsideClick";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { getNotifications } from "../../redux/features/basic/basic-slice";
import { useNavigate } from "react-router-dom";
import basicService from "../../redux/features/basic/basic-service";

const NotificationDropDown = ({
	setOpenNoti,
}: {
	setOpenNoti: (arg: boolean) => void;
}) => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const { notify } = useAppSelector((state) => state.basic);

	const [page, setPage] = useState(1);

	const readNotification = async (obj: any) => {
		if (obj.body?.type === "Sales") {
			navigate(`/dashboard/sales/${obj.body.id}`);
			setOpenNoti(false);
		} else if (obj.body?.type === "Product return") {
			navigate(`/dashboard/reports/returns/${obj.body.id}`);
			setOpenNoti(false);
		} else if (obj.body?.type === "Transfer") {
			navigate(`/dashboard/transfers/${obj.body.id}`);
			setOpenNoti(false);
		}
		await basicService.readNotification(obj.id);
		dispatch(getNotifications(1));
	};

	const readAllNotifications = async () => {
		await basicService.readAllNotifications();
		dispatch(getNotifications(1));
		setTimeout(() => {
			setOpenNoti(false);
		}, 2000);
	};

	return (
		<NotifcationStyles>
			{notify?.notifications?.rows?.length > 0 && (
				<OutsideClick handleToggle={() => setOpenNoti(false)}>
					<div className="noti-body">
						<div className="btns">
							<button onClick={() => readAllNotifications()}>
								Mark All as Read
							</button>
						</div>
						{notify?.notifications?.rows.map((noti) => (
							<div
								onClick={() => readNotification(noti)}
								className={`noti ${
									noti.readAt ? "" : "active"
								}`}
								key={noti.id}
							>
								<span>{noti.message}</span>
								<span className="time">
									<ReactTimeAgo
										date={noti.createdAt}
										locale="en-US"
									/>
								</span>
							</div>
						))}
					</div>
					<div className="paginate">
						{page !== 1 && (
							<button
								onClick={() => {
									setPage(page - 1);
									dispatch(getNotifications(page - 1));
								}}
							>
								<GoTriangleLeft />
								<span>Prev</span>
							</button>
						)}
						<button
							onClick={() => {
								setPage(page + 1);
								dispatch(getNotifications(page + 1));
							}}
						>
							<span>Next</span>
							<GoTriangleRight />
						</button>
					</div>
				</OutsideClick>
			)}
		</NotifcationStyles>
	);
};

export default NotificationDropDown;
