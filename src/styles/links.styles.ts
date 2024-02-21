import { Link } from "react-router-dom";
import styled from "styled-components";

export const ButtonSubmit = styled.button`
	width: 100%;
	background: #0241ff;
	color: #fff;
	outline: 0;
	border: 0;
	padding: 10px 0;
	border-radius: 6px;
	font-weight: 600;

	img {
		margin-left: 10px;
	}
`;

export const BasicLink = styled(Link)`
	color: #505bda;
	font-weight: 600;
	text-transform: capitalize;
	text-decoration: none;
`;

export const UnderlineLink = styled.a`
	color: #0042ff;
	font-weight: normal;
	text-decoration: underline;
	font-size: 0.9rem;
`;

export const MainButton = styled.button<{
	bg?: string;
	color?: string;
	right?: string;
}>`
	background: ${(props) => props.bg || "#0241FF"};
	color: ${(props) => props.color || "#fff"};
	outline: 0;
	border: 0;
	padding: 10px 18px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	font-weight: 600;

	svg,
	img {
		${(props) =>
			props.right == "true"
				? `margin-left: 10px;`
				: `margin-right: 10px;`}
	}
`;

export const PrimaryButton = styled.button<{ color?: string; bg?: string }>`
	background: ${(props) => props.bg || "#0241FF"};
	color: ${(props) => props.color || "#FFF"};
	outline: 0;
	border: 0;
	padding: 8px 18px;
	border-radius: 4px;
	display: inline-flex;
	align-items: center;
	font-weight: 600;
	font-size: 0.9rem;

	svg,
	img {
		margin-left: 10px;
	}
`;

export const WideButton = styled.button<{ color?: string; bg?: string }>`
	background: ${(props) => props.bg || "#0241FF"};
	color: ${(props) => props.color || "#FFF"};
	outline: 0;
	border: 0;
	padding: 12px 0;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 0.9rem;
	width: 100%;

	svg,
	img {
		margin-left: 10px;
	}
`;

export const MainLink = styled.a<{ color?: string }>`
	background: ${(props) => props.color || "#0241FF"};
	color: #fff;
	outline: 0;
	border: 0;
	padding: 12px 20px;
	border-radius: 4px;
	display: inline-flex;
	align-items: center;
	text-decoration: none;

	svg,
	img {
		margin-right: 10px;
	}

	&:hover {
		color: #fff;
	}
`;
