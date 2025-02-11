import React from "react";
import { useAppSelector } from "../redux/hooks";
import { haveRole } from "../utils/role";

const RoleGuard = ({
	access,
	purchaseCheck,
	children,
}: {
	access:
		| "isSuperAdmin"
		| "isAppAdmin"
		| "isBusinessOwner"
		| "isBusinessRole"
		| "isBusinessAdmin"
		| "isBusinessAdminActioners"
		| "isBusinessActioners"
		| "isShopAdmin"
		| "isShopAgent"
		| "isShopViewer"
		| "isBusinessViewer";
	purchaseCheck?: boolean;
	children: React.ReactNode;
}) => {
	const { details } = useAppSelector((state) => state.auth);

	const ifAllowed = () => {
		if (purchaseCheck) {
			return details.currentBusinessAccess.makePurchase ? true : false;
		} else {
			if (haveRole(details.businessRoleId)[access]) {
				return true;
			} else {
				return false;
			}
		}
	};

	return ifAllowed() ? <>{children}</> : <></>;
};

export default RoleGuard;
