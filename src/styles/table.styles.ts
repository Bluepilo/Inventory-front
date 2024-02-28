import styled from "styled-components";

export const TableComponent = styled.div`
	min-height: 40vh;
`;

export const Table = styled.table`
	font-size: 0.9rem;
	color: #333;
	white-space: nowrap;

	tr {
		border-color: #d9dbe9;
	}

	th {
		&.price {
			text-align: right;
		}
	}

	td {
		&.status {
			img {
				height: 20px;
			}
		}
		&.price {
			text-align: right;
		}
		&.bold {
			font-weight: 600;
		}
		&.link {
			a {
				color: #0047ab;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}
		&.quantites {
			display: flex;
			align-items: center;
			justify-content: flex-end;

			button {
				background: #edeef0;
				color: #000d33;
				border: 0;
				outline: 0;
				padding: 5px 10px;
				border-radius: 1px;
				font-weight: 700;
			}

			input {
				width: 50px;
				outline: 0;
				border: 1px solid #d9dbe9;
				text-align: center;
				margin: 0 5px;
			}
		}

		&.bbtn {
			button {
				background: none;
				outline: 0;
				border: 0;
			}
		}
	}
`;

export const PaginateStyles = styled.div`
	margin-top: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 991px) {
		flex-direction: column;

		.clicks {
			margin: 20px 0;
		}
	}

	.select {
		display: flex;
		align-items: center;

		select {
			border: 1px solid #c4c7db;
			outline: 0;
			height: 38px;
			border-radius: 4px;
			padding-left: 5px;
			margin-right: 5px;
			color: #666;
		}
		span {
			color: #666;
			font-size: 0.9rem;
		}
	}

	.clicks {
		display: flex;
		align-items: center;

		button {
			border: 1px solid #c4c7db;
			outline: 0;
			background: #fff;
			padding: 8px 20px;
			border-radius: 4px;
			display: flex;
			align-items: center;
			font-size: 0.9rem;
		}

		div {
			margin: 0 15px;
			background: #c3c7dd;
			color: #000d33;
			font-weight: 600;
			padding: 8px 20px;
			border-radius: 4px;
		}
	}

	.infos {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #edeef0;
		padding: 10px 30px;
		border-radius: 4px;

		p {
			margin: 0;
			padding: 0;
			color: #666666;
			font-size: 0.9rem;

			&:first-child {
				border-right: 1px solid #c2c7df;
				padding-right: 30px;
				font-weight: 600;
			}

			&:last-child {
				padding-left: 20px;
			}
		}
	}
`;
