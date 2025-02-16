import styled from "styled-components";

export const BrandSearchResult = styled.div`
	margin-top: 25px;
	div {
		display: flex;
		justify-content: space-between;
		border-bottom: 0.7px solid #d9dbeb;
		padding-bottom: 10px;
		margin-bottom: 10px;

		p {
			margin: 0;
			padding: 0;
		}
	}
`;

export const ManagedFoundStyle = styled.div`
	.yellow {
		background: #ffb900;
		display: inline-flex;
		align-items: center;
		padding: 6px 15px;
		border-radius: 4px;
		font-weight: 600;
		margin-bottom: 10px;

		span {
			margin-left: 10px;
		}
	}

	.info {
		p {
			font-weight: 600;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			margin-bottom: 10px;

			li {
				display: flex;
				align-items: center;

				svg {
					color: #0241ff;
					font-size: 1rem;
					margin-right: 5px;
				}
			}
		}
	}
`;

export const NoSearchResult = styled.div`
	.red {
		background: rgba(255, 39, 37, 0.1);
		display: inline-flex;
		color: #f44336;
		font-weight: 600;
		padding: 6px 12px;
		border-radius: 4px;
		margin-bottom: 15px;
	}

	p {
		margin: 0;
		padding: 0;
		margin-bottom: 5px;
	}
	.click {
		margin-bottom: 15px;
	}
`;

export const ProductImg = styled.div`
	cursor: pointer;
	.img {
		background: #f0f0f0;
		height: 200px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		img {
			width: 100%;
			height: 100%;

			&.no-i {
				width: 100px;
				height: 100px;
			}
		}
	}
	h5 {
		font-size: 0.9rem;
		margin: 15px 0;
	}
	h4 {
		font-size: 1rem;
		font-weight: 600;
	}
`;

export const SelectedProductImg = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	padding-bottom: 10px;

	.img {
		margin-right: 20px;
	}

	.div {
		width: 100%;
	}

	img {
		height: 40px;
		width: 40px;
	}
	p {
		margin: 0;
		padding: 0;
	}

	button.trash {
		color: red;
		background: none;
		outline: 0;
		border: 0;
	}

	.qty {
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
`;
