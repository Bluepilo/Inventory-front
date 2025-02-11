import styled from "styled-components";

export const SidebarDiv = styled.div<{ minimize: string; color: string }>`
	width: ${(props) => (props.minimize === "true" ? "70px" : "220px")};
	background-color: ${(props) =>
		props.color == "dark" ? "#000D33" : "#CFEAFF"};
	height: 100vh;
	position: fixed;
	z-index: 1029;
	transition: all 0.3s ease-in-out;

	@media (max-width: 991px) {
		margin-left: -220px;
		height: 100% !important;
		padding-bottom: 50px !important;

		&.open-m {
			margin-left: 0;
		}
	}
`;

export const SidebarLogo = styled.div<{ minimize: string }>`
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	align-items: center;

	.images {
		.icon {
			height: 40px;
		}
		.sub {
			height: 40px;
		}
	}

	a {
		@media (max-width: 991px) {
			display: none;
		}
	}
`;

export const SidebarMenu = styled.div<{ minimize: string; color: string }>`
	padding: 20px 10px;
	position: relative;
	height: 100%;

	ul.first {
		height: 100%;
		z-index: 1;
		overflow: hidden;
		padding-bottom: 45px;

		&:hover {
			overflow-y: auto;
		}

		&::-webkit-scrollbar {
			width: 0.5em;
		}

		&::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			background-color: #f5f5f5;
		}

		&::-webkit-scrollbar-thumb {
			background-color: ${(props) =>
				props.color == "dark" ? "#fff" : "#000"};
			outline: 1px solid #000;
		}
	}

	li.top-b {
		border-top: 1px solid
			${(props) =>
				props.color == "dark"
					? "rgba(255, 255, 255, 0.2);"
					: "rgba(51, 51, 51, 0.2)"};
		padding-top: 10px;
		margin-top: 10px;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;

		li {
			margin-bottom: 5px;

			a {
				display: block;
				padding: 10px 15px;
				color: ${(props) => (props.color == "dark" ? "#FFF" : "#333")};
				text-decoration: none;
				display: flex;
				align-items: center;
				font-weight: 600;
				font-size: 0.9rem;
				border-radius: 5px;

				img {
					${(props) =>
						props.color == "dark" &&
						`filter: invert(100%) sepia(0%) saturate(1%)
							hue-rotate(207deg) brightness(106%) contrast(101%);`}
				}

				span {
					display: ${(props) =>
						props.minimize === "true" ? "none" : "inline"};
					margin-left: 15px;
				}

				svg {
					margin-left: 10px;
				}

				&.active {
					background: ${(props) =>
						props.color == "dark" ? "#FFB500" : "#0241ff"};
					color: ${(props) =>
						props.color == "dark" ? "#000D33" : "#fff"};

					img {
						${(props) =>
							props.color == "dark"
								? `filter: invert(8%) sepia(22%) saturate(5669%) hue-rotate(208deg) brightness(88%) contrast(110%);`
								: `filter: invert(100%) sepia(0%) saturate(1%)
							hue-rotate(207deg) brightness(106%) contrast(101%);`}
					}
				}
			}
		}
	}
`;

export const SidebarDropDown = styled.li<{ minimize: string; color: string }>`
	ul {
		background: ${(props) =>
			props.color == "dark" ? "#000D33" : "#CFEAFF"};
		border-left-color: ${(props) =>
			props.color == "dark" ? "rgba(255,255,255,0.6)" : "#000D33"};
		${(props) =>
			props.minimize === "true"
				? `	position: absolute;
					left: 70px;
					top: 30%;
					width: 180px;
					box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
					border-radius: 6px;
					border: 1px solid rgba(102, 102, 102, 0.3);
					padding: 5px 10px;
					z-index: 9991;
					color: #FFFFFF;
		`
				: `margin-left: 45px;
				border-left-width: 1px;
				border-left-style: solid;
				padding: 0 10px;
					`}

		li {
			a {
				padding: 4px;
				font-size: 0.85rem;
				color: ${(props) =>
					props.color == "dark" ? "#FFF" : "#000D33"};
				font-weight: 700;
			}
		}
	}
`;

export const MainPage = styled.div<{ minimize: string }>`
	position: relative;
	display: block;
	clear: both;
	float: unset;
	right: 0;
	margin: 0 auto 0 ${(props) => (props.minimize == "true" ? "70px" : "230px")};
	min-height: 100vh;
	-webkit-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
	margin-bottom: 70px;

	@media (max-width: 991px) {
		margin: 0px;
	}
`;

export const AppContent = styled.div`
	@media (min-width: 991px) {
		padding-left: 2%;
		padding-right: 2%;
	}

	.main-content {
		padding: 20px 0;
	}
`;

export const SummaryCard = styled.div`
	background: #000d33;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	border-radius: 4px;
	padding: 12px 20px;

	@media (max-width: 576px) {
		justify-content: center;
		flex-direction: column;
	}

	div {
		display: flex;

		@media (max-width: 768px) {
			&:first-child {
				margin-bottom: 10px;
			}
		}
		h6 {
			margin: 0;
			color: #fff;
			&:last-child {
				color: #ff9800;
				margin-left: 5px;
			}
			font-size: 1rem;
		}
	}

	button {
		background: #d4e9ff;
		color: #000d33;
		font-weight: 600;
		border: 0;
		outline: 0;
		padding: 8px 30px;
		border-radius: 4px;
	}
`;

export const CashSummaryCard = styled.div`
	background: #000d33;
	border-radius: 4px;
	margin-top: 15px;
	padding: 20px 12px;
	/* height: 100%; */

	.top {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		.icon {
			background: #ffb900;
			height: 40px;
			width: 40px;
			border-radius: 10px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			margin-right: 15px;
		}

		h6 {
			color: #fff;
			margin: 0;
			padding: 0;
		}
		p {
			color: #ffb900;
			margin: 0;
			padding: 0;
			font-size: 0.8rem;
		}
	}

	.bottom {
		div {
			display: flex;
			margin-top: 10px;

			h6 {
				width: 40%;
				color: #fff;
				font-size: 0.8rem;
				margin: 0;
				padding: 0;
			}
		}
		h6.first {
			width: 60%;
			color: #d4e9ff;
		}
	}
`;

export const CheckBoxPrint = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;

	@media (max-width: 991px) {
		justify-content: center;
	}

	div.checks {
		margin-right: 20px;
		display: flex;
		align-items: center;

		input {
			margin-right: 5px;
		}

		label {
			font-size: 0.9rem;
			font-weight: 600;
		}
	}

	.main-btn {
		background: #0241ff;
		color: #fff;
		outline: 0;
		border: 0;
		padding: 10px 18px;
		border-radius: 4px;
		display: inline-flex;
		align-items: center;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;

		svg,
		img {
			margin-right: 10px;
		}
	}
`;

export const RecordStyles = styled.div`
	display: flex;
	flex-direction: column;

	a {
		color: #333;
		text-decoration: none;
		margin-bottom: 15px;
		font-weight: 600;

		span {
			margin-left: 10px;
		}
	}
`;

export const ExpenseStyle = styled.div`
	.status-div {
		display: flex;
		margin-top: 20px;
		font-weight: 700;

		.status {
			text-transform: capitalize;
			background: rgba(244, 67, 54, 0.1);
			color: #f44336;
			padding: 3px 30px;
			border-radius: 4px;
			border: 2px solid #f44336;

			svg {
				margin-right: 10px;
			}

			&.approved {
				background: rgba(2, 65, 255, 0.05);
				color: #4caf50;
				border: 2px solid #4caf50;
			}
			&.pending {
				background: rgba(255, 152, 0, 0.1);
				color: #ff9800;
				border: 2px solid #ff9800;
			}
		}
	}

	.content-comment {
		border: 1px solid rgba(0, 0, 0, 0.2);
		margin: 20px 0;
		padding: 10px;

		h5 {
			font-weight: 600;
		}

		.img {
			background: #f5f5f5;
			padding: 8px;

			a {
				color: #000;
				font-weight: 600;
			}
		}
	}
`;
