import React, { useEffect, useRef } from "react";

interface Props {
	children: React.ReactNode;
	handleToggle: () => void;
}

const OutsideClick = (props: Props) => {
	const ref = useRef<any>(null);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				props.handleToggle();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<div className="outside-click search-mobile" ref={ref}>
			{props.children}
		</div>
	);
};

export default OutsideClick;
