import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	MdKeyboardArrowRight,
	MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { BreadCrumbStyles } from "../styles/basic.styles";

const BreadCrumb = () => {
	const navigate = useNavigate();

	const location = useLocation().pathname;

	const lists = location.split("/").slice(2);

	let currentLink = "/dashboard";
	const crumbs = lists.map((crumb, index) => {
		currentLink += `/${crumb}`;

		return (
			<Link to={currentLink} key={crumb}>
				<span>{crumb}</span>
				<MdKeyboardArrowRight />
			</Link>
		);
	});

	return (
		<BreadCrumbStyles>
			<button onClick={() => navigate(-1)}>
				<MdOutlineKeyboardBackspace />
				<span>Back</span>
			</button>
			{crumbs}
		</BreadCrumbStyles>
	);
};

export default BreadCrumb;
