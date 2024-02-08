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

export const SidebarMenu = styled.div<{ minimize: string }>`
	padding: 20px 10px;
	position: relative;
	height: 100%;

	ul.first {
	}

	ul.bottom {
		border-top: 1px solid rgba(51, 51, 51, 0.2);
		position: absolute;
		bottom: 60px;
		right: 10px;
		left: 10px;
		padding-top: 10px;
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
