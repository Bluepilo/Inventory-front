import styled from "styled-components";

export const SaleSelectDiv = styled.div`
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 900px) {
		flex-direction: column;
		align-items: flex-start;

		.info {
			margin: 15px 0;
		}
	}

	div.info {
		p {
			margin: 0;
			padding: 0;
		}
	}

	button {
		border: 0;
		outline: 0;
		background: none;
		text-decoration: underline;
	}

	.a-flex {
		display: flex;

		.mb {
			margin-left: 20px;
		}

		@media (max-width: 991px) {
			flex-direction: column;

			.mb {
				margin: 15px 0;
			}
		}
	}
`;

export const SalesDiv = styled.div`
	margin-top: 30px;

	div.item-title {
		display: flex;
		color: #0241ff;
		font-weight: 600;
		align-items: center;
		margin-bottom: 10px;

		p {
			margin: 0;
			padding: 0;
		}

		span {
			background: #0241ff;
			color: #fff;
			padding: 2px 12px;
			border-radius: 10px;
			margin-left: 6px;
		}
	}
`;

export const ItemListStyle = styled.div`
	margin-bottom: 40px;
	width: 100%;

	.name {
		width: 35%;
	}

	.sku {
		width: 5%;
	}

	.qty,
	.qty-t {
		width: 25%;
		display: flex;
		align-items: center;

		&.tt {
			background: blue;
		}

		button {
			display: flex;
			width: 24px;
			height: 24px;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background: #000d35;
			font-weight: bold;
			color: #fff;
			border: 0;
			outline: 0;
		}

		input {
			width: 60px;
			padding-left: 10px;
			border: 1px solid #d9dbeb;
			outline: 0;
			background: #f5f5f5;
			height: 35px;
			margin: 0 10px;
			border-radius: 4px;
		}
	}

	.input {
		width: 20%;

		input {
			border: 1px solid #d9dbeb;
			outline: 0;
			height: 40px;
			border-radius: 4px;
			text-align: right;
			color: #333;
			padding-right: 10px;
		}
	}
	.price {
		width: 8%;
		text-align: right;
	}
	.cancel {
		width: 7%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;

		button {
			display: flex;
			width: 30px;
			height: 30px;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			background: #ffb500;
			font-weight: bold;
			color: #000d33;
			font-weight: 700;
			border: 0;
			outline: 0;
		}
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 800;

		&.head-sm {
			width: 60%;
		}

		@media (max-width: 900px) {
			width: 900px;
			overflow-x: auto;

			&.head-sm {
				width: 600px;
			}
		}
	}

	.body {
		margin-top: 15px;

		.info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #d9dbeb;
			padding: 15px 0;

			&.info-sm {
				width: 60%;
			}

			@media (max-width: 900px) {
				width: 900px;
				overflow-x: auto;

				&.info-sm {
					width: 600px;
				}
			}
		}
	}
`;

export const TotalBox = styled.div`
	margin-top: 35px;
	display: flex;
	align-items: flex-end;
	flex-wrap: wrap;

	p {
		margin: 0;
		padding: 0;
	}

	.summary {
		margin-bottom: 15px;
		background: #000d33;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 300px;
		padding: 12px 25px;
		border-radius: 4px;
		margin-right: 20px;
	}

	.input {
		margin-right: 20px;
		margin-bottom: 15px;
		button.percent {
			border: 1px solid #d9dbeb;
			outline: 0;
			background: #f5f5f5;
			margin-right: 10px;
			border-radius: 3px;
			padding: 3px 8px;
		}
		label {
			display: block;
			margin-bottom: 3px;
			font-size: 0.8rem;
		}
		input {
			display: inline-block;
			border: 1px solid #d9dbeb;
			background: #fff;
			outline: 0;
			height: 35px;
			border-radius: 4px;
			padding-left: 5px;
			width: 80px;

			&.expand {
				width: 150px;
			}

			&:disabled {
				background: #edeef0;
			}
		}
	}
	.submit {
		margin-bottom: 15px;

		@media (max-width: 991px) {
			width: 100%;
			button {
				width: 100% !important;
				justify-content: center;
				padding: 15px 10px;
				margin-top: 20px;
			}
		}
	}
`;

export const UserBox = styled.div`
	h5.title {
		color: #000d33;

		button {
			margin-right: 5px;
			border: 0;
			outline: 0;
			background: none;
		}
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		.input {
			width: 60%;
		}
	}
`;

export const UserInfoBox = styled.div`
	background: #f5f5f5;
	border: 1px solid #d9dbeb;
	margin-top: 30px;
	border-radius: 4px;
	padding: 20px 25px 10px 25px;
	position: relative;

	p {
		margin: 0;
		padding: 0;
	}

	.info {
		display: flex;
		align-items: center;
		margin-bottom: 20px;

		p {
			font-weight: 600;
			font-size: 1rem;
		}

		.initials {
			margin-right: 20px;
			display: inline-flex;
			padding: 10px 15px;
			justify-content: center;
			align-items: center;
			background: #000d33;
			color: #fff;
			border-radius: 15px;
			font-weight: 600;
		}
	}

	.balance {
		background: #000d33;
		color: #fff;
		margin-top: 20px;
		display: flex;
		align-items: center;
		padding: 10px;
		border-radius: 4px;

		h4,
		h6 {
			padding: 0;
			margin: 0;
		}

		h6 {
			font-size: 0.8rem;
			text-transform: capitalize;
		}
		h4 {
			font-size: 1.2rem;
			margin-top: 5px;
		}

		div {
			margin: 0 20px;
		}
	}
	button.cancel {
		position: absolute;
		top: 5px;
		right: 15px;
		border: 0;
		background: none;
		outline: 0;
		font-size: 1.3rem;
	}
`;

export const PaymentSummaryBox = styled.div`
	.line {
		border-bottom: 1px solid #d9dbeb;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px 0;

		h6,
		p {
			margin: 0;
			padding: 0;
		}

		p {
			font-size: 0.8rem;
		}
	}

	input {
		outline: 0;
		border: 1px solid #d9dbeb;
		background: #fff;
		border-radius: 4px;
		height: 45px;
		width: 200px;
		text-align: right;
		padding-right: 10px;
	}

	.flx {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;

		.error {
			background: rgba(255, 39, 37, 0.1);
			color: #f44336;
			font-size: 0.7rem;
			margin-top: 10px;
			font-weight: 600;
			padding: 5px;
			border-radius: 2px;
		}
	}
	.buttons {
		display: flex;
		justify-content: center;
		margin-top: 40px;

		button {
			margin: 0 20px;
		}
	}
`;

export const ActionDetailsDiv = styled.div`
	margin-top: 20px;
`;

export const DetailCard = styled.div`
	border: 1px solid #d9dbeb;
	background: #f5f5f5;
	border-radius: 4px;
	padding: 20px 30px;
	margin-bottom: 30px;

	.head {
		border-bottom: 1px solid #d9dbeb;
		display: flex;
		align-items: center;
		padding-bottom: 12px;
		margin-bottom: 15px;

		h6,
		p {
			margin: 0;
			padding: 0;
		}

		.sale-info {
			border-right: 1px solid #d9dbeb;
			padding-right: 12px;

			h6 {
				font-weight: 700;
				font-size: 1.1rem;
				margin-bottom: 10px;
			}

			span.status {
				&.success {
					background: #4caf50;
				}

				&.withdrawal,
				&.pending {
					background: #ff9800;
				}
				background: #f44336;
				color: #fff;
				padding: 5px 15px;
				border-radius: 15px;
				margin-right: 6px;
			}
		}
		.user-info {
			padding-left: 12px;

			img {
				height: 30px;
				border-radius: 50%;
			}

			p {
				margin-bottom: 10px;

				span {
					margin-left: 5px;
				}
			}
		}
	}
	.body-detail {
		a {
			color: #0241ff;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.biz-detail {
		h5,
		h6 {
			font-weight: 600;
		}
		h5 {
			text-decoration: underline;
			margin-bottom: 15px;
		}

		h6 {
			margin-bottom: 10px;
			display: flex;
			align-items: center;

			span {
				margin-left: 10px;
			}
		}
		.body {
			border-bottom: 0.5px solid #d9dbeb;
			padding-bottom: 10px;
			margin-bottom: 10px;
			.para {
				span {
					margin-right: 10px;
				}
			}
		}
	}

	.box {
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 20px;
		border-radius: 5px;
	}
`;
