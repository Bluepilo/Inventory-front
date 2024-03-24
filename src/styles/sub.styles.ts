import styled from "styled-components";

export const SubSwitch = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30px;

	.b-switch {
		background: #f5f5f5;
		display: flex;
		align-items: center;
		padding: 5px 2px;
		border: 1px solid #d9dbe9;
		border-radius: 8px;

		button {
			border: 0;
			outline: 0;
			color: #666666;
			margin: 0 10px;
			font-weight: 600;
			padding: 8px 15px;
			border-radius: 5px;
			background: none;

			.count {
				font-size: 0.7rem;
				border: 1px solid #333;
				border-radius: 7px;
				padding: 2px 5px;
				margin-left: 5px;

				@media (max-width: 576px) {
					display: none;
				}
			}

			&.active {
				background: #0241ff;
				color: #fff;

				.count {
					border: 1px solid #fff;
				}
			}
		}
	}
`;

export const Plan = styled.div`
	border: 1px solid #d9dbe9;
	border-radius: 20px;
	padding: 10px;

	@media (max-width: 576px) {
		padding: 20px;
		margin: 10px 20px;
	}

	h6 {
		font-weight: 600;
	}

	p {
		color: #000d33;

		&.content {
			display: flex;
			align-items: center;

			svg {
				color: #0241ff;
				margin-right: 6px;
			}
			span {
				font-size: 0.8rem;
			}
		}
	}
`;

export const ConfirmStyle = styled.div`
	text-align: center;
`;
