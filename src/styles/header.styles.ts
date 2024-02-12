import styled from "styled-components";

export const HeaderStyle = styled.div`
	border-bottom: 1px solid #d9dbeb;
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	overflow: hidden;
	background: #fff;
`;

export const HeaderDetail = styled.div`
	display: flex;
	align-items: center;

	h6 {
		margin: 0;
		padding: 0;
		font-weight: 700;
	}
`;

export const Progress = styled.div<{ color: string }>`
	background: ${(props) => props.color};
	color: #fff;
	font-size: 0.8rem;
	padding: 10px 20px;
	border-radius: 5px;
	margin-left: 15px;

	span {
		font-weight: 600;
		margin-left: 5px;
	}

	@media (max-width: 991px) {
		display: none;
	}
`;

export const HeaderInfo = styled.div`
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	position: relative;

	p {
		margin: 0;
		padding: 0;

		@media (max-width: 991px) {
			display: none;
		}
	}

	button.upgrade {
		margin: 0 10px;
		border: 2px solid #0241ff;
		font-weight: 600;
		color: #0241ff;
		outline: 0;
		background: #fff;
		padding: 5px 15px;
		border-radius: 6px;

		@media (max-width: 991px) {
			display: none;
		}
	}

	button.bell {
		background: #d4e9ff;
		outline: 0;
		border: 0;
		display: flex;
		align-items: center;
		padding: 4px 15px;
		border-radius: 15px;
		font-weight: 600;
		margin-left: 10px;

		span {
			font-weight: 600;
			margin-left: 10px;
		}
	}

	button.menu {
		@media (min-width: 991px) {
			display: none;
		}
	}

	button.support {
		outline: 0;
		background: none;
		border: 0;
		margin-left: 5px;

		&.hide {
			border: 1px solid #000d33;
			height: 40px;
			width: 40px;
			border-radius: 50%;
		}

		svg {
			font-size: 2rem;
		}

		@media (max-width: 991px) {
			&.hide {
				display: none;
			}
		}
	}

	button.profile {
		margin-left: 20px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #d9dbeb;
		background: none;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			height: 100%;
			width: 100%;
			border-radius: 50%;
		}

		svg {
			font-size: 1rem;
		}
	}
`;

export const HeaderProfile = styled.div`
	position: absolute;
	right: 20px;
	top: 80px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	padding: 10px 20px;
	border-radius: 5px;
	background: #fff;
	z-index: 999991;
	-webkit-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;

	p {
		margin: 0;
		padding: 0;
		font-size: 0.9rem;
	}

	.head {
		display: flex;
		margin-bottom: 20px;
		align-items: center;

		svg {
			font-size: 2rem;
		}

		div {
			margin-left: 10px;

			p {
				&:last-child {
					text-transform: uppercase;
					font-size: 0.8rem;
				}
			}
		}
	}

	.apps {
		display: flex;
		justify-content: space-between;

		a {
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 15px 25px;
			color: #333;
			text-decoration: none;
			margin-right: 7px;
			margin-left: 7px;
			border-radius: 8px;

			&.others {
				border: 1px solid #e0e0e0;
			}

			&.bluepilo {
				background: #d4e9ff;
			}

			p {
				margin: 0;
				padding: 0;
				margin-top: 10px;
				font-size: 0.9rem;
				font-weight: 600;
			}

			img {
				height: 20px;
			}
		}
	}
	.switch-p {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 8px;

		button {
			margin: 0 10px;
			height: 30px;
			width: 30px;
			outline: 0;
			border: 0;
			border-radius: 4px;

			&:first-child {
				background: #cfeaff;
			}
			&:last-child {
				background: #000d33;
			}
		}
	}
	p.text {
		text-align: center;
		font-size: 0.75rem;
		font-weight: 700;
		margin-top: 10px;
	}
`;

export const NotifcationStyles = styled.div`
	position: absolute;
	right: 100px;
	top: 80px;

	.noti-body {
		width: 400px;
		max-height: 80vh;
		overflow-y: auto;
		border: 1px solid rgba(0, 0, 0, 0.2);
		padding: 10px 20px;
		border-radius: 5px;
		background: #fff;
		z-index: 999991;
		-webkit-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
		font-size: 0.85rem;
		div {
			display: block;
			color: #333;
			text-decoration: none;
			margin-bottom: 10px;
			border: 1px solid rgba(0, 0, 0, 0.1);
			padding: 5px;
			cursor: pointer;

			&.active {
				background: #d4e9ff;
			}

			span {
				display: block;

				&.time {
					text-align: right;
					font-weight: 600;
				}
			}
		}
	}
`;
