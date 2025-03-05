import React from "react";
import { useAppSelector } from "../redux/hooks";
import PermissionDenied from "./PermissionDenied";

const PageCover = ({
	permission,
	children,
}: {
	permission: string;
	children: React.ReactNode;
}) => {
	const { details } = useAppSelector((state) => state.auth);

	return details?.role?.permissions?.find((f) => f.method === permission) ? (
		<>{children}</>
	) : (
		<PermissionDenied />
	);
};

export default PageCover;
