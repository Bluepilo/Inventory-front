import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

export const FaqDiv = styled.div<{ active: boolean }>`
	padding: 10px;
	background: ${(props) => (props.active ? "#000d33" : "#ffffff")};
	font-size: 0.9rem;
	color: ${(props) => (!props.active ? "#000d33" : "#ffffff")};
	border: 1px solid #d9dbeb;
	margin-bottom: 10px;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.5s;

	h6 {
		font-weight: 600;
		font-size: 0.9rem;
		color: ${(props) => (props.active ? "#FFB500" : "#000d33")};
		margin: 0;
		padding: 0;
	}

	.actives {
		margin-top: 10px;
		transition: margin 0.5s;
	}
`;

export const Flex = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

export const FlexCenter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const FlexBetween = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
`;

export const TermsDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #666;
	font-size: 0.9rem;

	.div-link {
		a {
			padding: 0 10px;
		}
		a:first-child {
			border-right: 1px solid #666;
		}
	}
`;

export const ErrorStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	margin-top: 25px;
	padding: 20px 10px;
`;

export const LoadPage = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	p {
		font-size: 0.9rem;
		color: #0241ff;
		text-transform: uppercase;
		text-align: center;
		margin-top: 10px;
	}
`;

export const ModalLoadStyle = styled.div`
	padding: 20px 10px;

	p {
		margin-top: 15px;
	}
`;

export const TitleStyles = styled.div`
	.btwn {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		@media (max-width: 768px) {
			flex-direction: column;

			.title {
				margin-bottom: 20px;
			}
		}
	}
	.title {
		h5 {
			margin: 0;
			padding: 0;
			font-weight: 600;
			font-size: 1.4rem;
		}

		span.count {
			display: flex;
			padding: 4px 12px;
			align-items: flex-start;
			border-radius: 25px;
			background: #ffb500;
			font-weight: bold;
			margin-left: 10px;
			font-size: 0.9rem;
		}
	}
`;

export const BreadCrumbStyles = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;

	button {
		border: 0;
		outline: 0;
		background: none;
		font-weight: 600;
		margin-right: 20px;

		span {
			margin-left: 7px;
		}
	}

	a {
		text-transform: capitalize;
		text-decoration: none;
		color: #333333;
		margin-right: 8px;

		span {
			margin-right: 5px;
		}
	}
`;

export const NewPageStyles = styled.div`
	text-align: center;
	margin-top: 40px;

	img {
		margin-bottom: 20px;
	}

	h3 {
		color: #0241ff;
		font-weight: 600;
	}

	p {
		color: #000;
		font-size: 0.85rem;
	}

	button {
		margin-top: 20px;
		background: #0241ff;
		font-weight: 800;
		font-size: 1rem;
		color: #fff;
		padding: 10px 20px;
		border-radius: 5px;
		border: 0;
		outline: 0;
	}
`;

export const Drop = styled(Dropdown)`
	button.dropdown-toggle {
		background: none !important;
		color: #333 !important;
		border: none;
		outline: 0 !important;

		&:focus {
			box-shadow: none !important;
		}

		&::after {
			display: none !important;
		}
	}

	.dropdown-menu {
		font-size: 0.9rem;
	}
`;

export const WalletDiv = styled.div`
	margin: 25px 0;
	background: #f5f5f5;
	padding: 20px 40px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 991px) {
		flex-direction: column;

		.info {
			margin-bottom: 20px;
		}
	}

	h6,
	p {
		margin: 0;
		padding: 0;
	}
	h6 {
		font-weight: 600;
		font-size: 1.1rem;
	}
	.info {
		div {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
		}

		.initials {
			padding: 10px 15px;
			border-radius: 20px;
			background: #000d33;
			color: #fff;
			margin-right: 10px;
		}
	}
	.balance {
		.amount {
			display: flex;
			margin-bottom: 20px;
			div {
				margin-left: 20px;
			}
		}
		.buttons {
			display: flex;
			align-items: center;

			@media (max-width: 991px) {
				flex-direction: column;

				button.custom {
					margin-top: 20px;
				}
			}

			button {
				margin-left: 20px;
			}

			button.custom {
				background: none;
				border: 1px solid #f44336;
				color: #f44336;
				outline: 0;
				padding: 10px 18px;
				border-radius: 4px;
				display: flex;
				align-items: center;
				font-size: 0.9rem;
				font-weight: 600;

				img {
					margin-right: 10px;
				}
			}
		}
	}
`;

export const Confirmation = styled.div`
	button {
		border: 0;
		outline: 0;
		background: none;
		padding: 10px 20px;
		border-radius: 5px;
		font-weight: 600;
		margin: 0 10px;

		&.yes {
			background: #0241ff;
			color: #fff;
		}
	}
`;

export const SwitchDiv = styled.div`
	width: 45%;
	display: flex;
	background: #f5f5f5;
	justify-content: space-between;
	border: 1px solid #d9dbe9;
	border-radius: 4px;
	padding: 4px;
	margin-top: 20px;

	@media (max-width: 991px) {
		width: 100%;
	}

	div {
		width: 50%;
		text-align: center;
		padding: 6px;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;

		&.active {
			border: 1px solid #0241ff;
			color: #0241ff;
		}
	}
`;

export const DrawerDiv = styled.div`
	position: fixed;
	background: #fff;
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
	width: 300px;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 91;
	transition: all 0.3s ease-in-out;
	padding: 20px;

	.transactions {
		margin-top: 25px;

		h6,
		p {
			margin: 0;
			padding: 0;
		}

		h6 {
			font-size: 0.8rem;
			text-transform: uppercase;
			color: #666;
			font-weight: 600;
		}

		p {
			margin-bottom: 15px;
			margin-top: 4px;
			font-weight: 600;
		}
	}
`;

export const UploadWrapper = styled.div`
	.upload-btn-wrapper {
		position: relative;
		overflow: hidden;
		display: inline-block;
		width: 100%;
		cursor: pointer;

		.btn {
			border: 2px solid gray;
			color: gray;
			background-color: white;
			padding: 8px 20px;
			border-radius: 8px;
			font-size: 0.9rem;
			font-weight: bold;
			cursor: pointer;

			&.wide {
				width: 100%;
			}
		}
		input[type="file"] {
			font-size: 100px;
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0;
			cursor: pointer;
		}
	}

	.img-box {
		border: 1px solid rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		padding: 5px 20px;

		a {
			color: #0241ff;

			&:hover {
				color: #0241ff;
			}
		}

		button {
			padding: 0;
			margin: 0;
			color: red;
			font-size: 1.1rem;
			background: none;
			margin-left: 20px;
			border: 0;
			font-weight: 600;
		}
	}
`;

export const Alert = styled.div`
	background: #cfeaff;
	color: #0241ff;
	display: inline-flex;
	align-items: center;
	padding: 5px 15px;
	border-radius: 3px;
	font-weight: 600;

	svg {
		margin-right: 5px;
	}
`;
