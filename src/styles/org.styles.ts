import styled from "styled-components";

export const OrgDashboard = styled.div`
	background: #000d35;
	border-radius: 10px;

	.left-side {
		padding: 20px;
		position: relative;
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;

			h5 {
				margin: 0;
				padding: 0;
				color: #ff9800;
			}

			button {
				border: 0.5px solid #d9dbeb;
				outline: 0;
				background: none;
				color: #d4e9ff;
				border-radius: 5px;
				padding: 3px 8px;
			}
		}
		.body {
			margin-top: 10px;
			span {
				color: #fff;
				&.ss {
					color: #d4e9ff;
				}
			}
		}
	}

	.right-side {
		padding: 20px 20px 0 20px;
		.box {
			background: #fff;
			padding: 10px;
			margin-bottom: 10px;
			border-radius: 4px;

			.head {
				display: flex;
				align-items: center;
				margin-bottom: 15px;

				h6 {
					padding: 0;
					margin: 0;
					margin-left: 10px;
					font-size: 0.9rem;
				}
			}
			.body {
				display: flex;
				align-items: center;
				justify-content: space-between;

				p {
					margin: 0;
					padding: 0;

					span {
						font-weight: 700;
						color: #0241ff;
					}
				}

				.prog {
					background: #d9dbea;
					width: 100px;
					height: 15px;
					border-radius: 6px;
					padding: 2px;

					div {
						background: #0241ff;
						height: 100%;
						border-radius: 6px;
					}
				}
			}
		}
	}
`;

export const BusinessBox = styled.div`
	border: 1px solid #d9dbeb;
	padding: 15px;
	border-radius: 10px;

	&.active {
		border: 2px solid #495cea;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15px;

		button {
			border: 1px solid #d9dbeb;
			outline: 0;
			background: none;
			border-radius: 5px;
			padding: 3px 8px;
		}

		div.left {
			display: flex;
			align-items: center;

			span.box-holder {
				background: #0241ff;
				height: 30px;
				width: 40px;
				margin-right: 10px;
				border-radius: 3px;
			}

			img {
				height: 30px;
				width: 30px;
				margin-right: 10px;
			}

			p {
				margin: 0;
				padding: 0;
			}
		}
	}

	.body {
		padding: 10px;
		.row {
			border-bottom: 0.4px solid #000d33;
			margin-bottom: 10px;

			&:last-child {
				border: 0;
				margin-bottom: 0;
			}
			span,
			strong {
				font-size: 0.8rem;
			}
		}
	}
`;

export const AddBusiness = styled.div`
	background: #cfeaff;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 15px;
	border-radius: 10px;
	cursor: pointer;
	font-weight: 800;
	font-size: 1.1rem;

	span {
		margin-top: 10px;
	}
`;
