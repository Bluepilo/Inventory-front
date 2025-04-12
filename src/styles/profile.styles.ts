import styled from "styled-components";

export const ProfileBox = styled.div`
	background: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;
	margin-bottom: 30px;
	padding: 15px;
	border-radius: 5px;

	h6,
	p {
		margin: 0;
		padding: 0;
	}

	h6 {
		font-weight: 600;
		font-size: 1rem;
	}
	p {
		font-size: 0.9rem;
	}

	@media (max-width: 800px) {
		flex-direction: column;
	}

	.info {
		display: flex;
		align-items: center;
		width: 20%;

		@media (max-width: 800px) {
			width: 100%;
		}

		img {
			height: 60px;
			width: 60px;
			border-radius: 50%;
		}

		span.img {
			height: 60px;
			width: 60px;
			border-radius: 50%;
			background: #000d33;
		}

		.content {
			margin-left: 15px;
		}
	}

	.more {
		width: 60%;
		@media (max-width: 800px) {
			width: 100%;
			margin-top: 15px;
		}
	}

	.btns {
		width: 20%;
		@media (max-width: 800px) {
			width: 100%;
			margin-top: 15px;
		}

		button {
			border: 1px solid #666;
			outline: 0;
			padding: 8px 20px;
			border-radius: 5px;
			color: #666;
			background: none;
		}
	}
`;

export const ReferralBox = styled.div`
	p {
		font-size: 1.1rem;
	}

	.share {
		display: flex;
		.share-icon {
			margin-right: 20px;
		}
	}

	.button-div {
		background-color: #000d33;
		display: flex;
		align-items: center;
		width: 50%;
		justify-content: center;
		padding: 10px 0;
		margin-top: 20px;
		border-radius: 3px;

		@media (max-width: 991px) {
			width: 100%;
		}

		.box {
			width: 70%;
			background-color: #fff;
			margin-right: 15px;
			padding: 3px 10px;
			font-weight: 600;
		}

		button {
			border: 1px solid #fff;
			outline: 0;
			padding: 8px 20px;
			border-radius: 5px;
			color: #fff;
			background: none;
		}
	}
`;

export const AccountBox = styled.div`
	border: 1px solid #d9dbe9;
	padding: 20px;
	border-radius: 5px;
	margin-bottom: 25px;

	h6 {
		color: #666666;
		font-weight: 600;
	}
	p {
		color: #333;
	}

	.waiting {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		div {
			max-width: 60%;
		}
	}
	.input {
		input,
		select {
			width: 250px;
			border: 1px solid #d9dbeb;
			outline: 0;
			color: #333;
			border-radius: 6px;
			padding-left: 20px;
			height: 45px;
		}
	}

	.list {
		border: 1px solid rgba(0, 0, 0, 0.08);
		margin-bottom: 15px;
		padding: 8px;
		border-radius: 3px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		span {
			max-width: 80%;
		}

		button {
			background: blue;
			border: 0;
			outline: 0;
			color: #fff;
			height: 30px;
			width: 30px;
			border-radius: 20px;
			align-items: center;
			justify-content: center;
			display: flex;

			&.red {
				background: red;
			}
		}
	}
`;
