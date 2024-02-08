import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
	const [open, setOpen] = useState(false);
	const [minimized, setMinimized] = useState(false);

	return (
		<div>
			<Sidebar
				handleToggle={() => setOpen(false)}
				open={open}
				minimizeHandler={(val: boolean) => setMinimized(val)}
				onClose={() => setOpen(false)}
				minimized={minimized}
			/>
		</div>
	);
};

export default DashboardLayout;
