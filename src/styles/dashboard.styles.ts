import styled from "styled-components";

export const SidebarDiv = styled.div<{ minimize: string; color: string }>`
	width: ${(props) => (props.minimize === "true" ? "70px" : "240px")};
	background-color: ${(props) => props.color};
	height: 100vh;
	position: fixed;
	z-index: 1029;
	transition: all 0.3s ease-in-out;

	@media (max-width: 991px) {
		margin-left: -270px;
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
		.sub {
			margin-left: 10px;
			display: ${(props) =>
				props.minimize === "true" ? "none" : "inline"};
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
		height: 67%;
		/* overflow: hidden; */
		overflow-y: ${(props) => (props.minimize === "true" ? "none" : "auto")};

		&::-webkit-scrollbar {
			width: 0.5em;
		}

		&::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			background-color: #f5f5f5;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #000;
			outline: 1px solid #000;
		}
	}

	ul.bottom {
		border-top: 1px solid rgba(51, 51, 51, 0.2);
		padding-top: 10px;
		padding-bottom: 10px;
		z-index: 9991;
		background-color: ${(props) => props.color};
		height: 33%;
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
				color: #333;
				text-decoration: none;
				display: flex;
				align-items: center;
				font-weight: 600;
				font-size: 0.9rem;

				span {
					display: ${(props) =>
						props.minimize === "true" ? "none" : "inline"};
					margin-left: 15px;
				}

				svg {
					margin-left: 10px;
				}
			}
		}
	}
`;

export const SidebarDropDown = styled.li<{ minimize: string }>`
	position: relative;

	ul {
		${(props) =>
			props.minimize === "true"
				? `position: absolute;
		left: 55px;
		top: 0px;
		background: #fff;
		width: 180px;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
		border-radius: 6px;
		border: 1px solid rgba(102, 102, 102, 0.3);
		padding: 5px 10px;
		z-index: 9991;
		`
				: `margin-left: 45px;
					
					`}

		li {
			a {
				padding: 4px;
				font-size: 0.85rem;
				color: #000d35;
				font-weight: 700;
			}
		}
	}
`;
