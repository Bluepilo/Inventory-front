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
