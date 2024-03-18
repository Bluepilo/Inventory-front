import { NotifcationStyles } from "../../styles/header.styles";
import { useAppSelector } from "../../redux/hooks";
import ReactTimeAgo from "react-time-ago";
import OutsideClick from "../OutsideClick";

const NotificationDropDown = ({
	setOpenNoti,
}: {
	setOpenNoti: (arg: boolean) => void;
}) => {
	const { notify } = useAppSelector((state) => state.basic);

	const readNotification = (obj: any) => {};

	return (
		<NotifcationStyles>
			{notify?.notifications?.rows?.length > 0 && (
				<OutsideClick handleToggle={() => setOpenNoti(false)}>
					<div className="noti-body">
						{notify?.notifications?.rows.map((noti) => (
							<div
								onClick={() => readNotification(noti)}
								className={`${noti.readAt ? "" : "active"}`}
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
				</OutsideClick>
			)}
		</NotifcationStyles>
	);
};

export default NotificationDropDown;
