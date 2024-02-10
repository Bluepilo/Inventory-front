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

export const MainButton = styled.button<{ color?: string }>`
	background: ${(props) => props.color || "#0241FF"};
	color: #fff;
	outline: 0;
	border: 0;
	padding: 12px 20px;
	border-radius: 4px;
	display: flex;
	align-items: center;

	svg,
	img {
		margin-right: 10px;
	}
`;
