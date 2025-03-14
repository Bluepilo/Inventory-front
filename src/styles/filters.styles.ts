import styled from "styled-components";

export const FilterStyles = styled.div`
	margin-top: 20px;
`;

export const ButtonCancelDiv = styled.div`
	height: 100%;
	padding-top: 5%;

	button {
		background-color: #f44336;
		color: #fff;
		outline: 0;
		border: 0;
		display: flex;
		padding: 10px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
	}
`;

export const SearchBar = styled.div<{ wide?: string }>`
	position: relative;
	width: 100%;
	z-index: 991;

	input {
		width: ${(props) => (props.wide ? "100%" : "50px")};
		position: relative;
		z-index: 991;
		outline: 0;
		border: 1px solid #c2c7df;
		height: 45px;
		border-radius: 4px;
		padding-left: 35px;
		color: #333333;
		background: #fff;
		transition-duration: 0.4s;
		-moz-transition-duration: 0.4s;
		-webkit-transition-duration: 0.4s;
		-o-transition-duration: 0.4s;

		@media (max-width: 991px) {
			width: 100%;
		}

		&::placeholder {
			color: #333333;
		}

		&:focus {
			width: ${(props) => (props.wide ? "100%" : "350px")};

			@media (max-width: 991px) {
				width: 100%;
			}
		}
	}

	svg {
		position: absolute;
		left: 8px;
		top: 11px;
		z-index: 991;
	}
`;

export const FilterWrapper = styled.div`
	position: relative;
	width: 100%;
	background: #f5f5f5;

	label.label {
		position: absolute;
		left: 10px;
		text-transform: uppercase;
		font-size: 0.7rem;
		color: #0241ff;
		top: 2px;
	}

	.react-datepicker-wrapper {
		display: block !important;

		input {
			background: none !important;
			width: 100% !important;
			display: block !important;
			padding-left: 10px;
			color: #333;
			border: 1px solid #c2c7df;
			border-radius: 4px;
			height: 45px;
			padding-top: 20px;
			font-size: 0.9rem;
			padding-bottom: 5px;
		}
	}
`;

export const SaleSelectStyle = styled.div`
	display: flex;
	align-items: center;
	background: #ffb900;
	width: 320px;
	justify-content: flex-end;
	border-radius: 4px;

	p {
		margin: 0;
		padding: 0;
		margin-right: 10px;
		font-weight: 600;
		font-size: 0.9rem;
	}

	div.shop {
		background: #000d33;
		width: 200px;
		height: 40px;
		color: #ffb900;
		display: flex;
		align-items: center;
		padding-left: 20px;
		border-radius: 4px;
	}
`;

export const DropDownStyle = styled.div`
	label {
		margin: 0;
		padding: 0;
		margin-bottom: 5px;
		text-transform: uppercase;
		font-size: 0.8rem;
	}
`;

export const DropStyle = styled.div`
	margin-bottom: 20px;

	.item {
		margin-bottom: 10px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		padding: 5px 10px;
		border-radius: 4px;
		cursor: pointer;

		span {
			font-size: 0.85rem;
			color: blue;
		}
	}
`;

export const PhoneStyle = styled.div`
	width: 100%;
	display: flex;

	div.country {
		border: 1px solid #d9dbeb;
		width: 30%;
		height: 45px;
		display: flex;
		align-items: center;
		border-right: 0;
		justify-content: center;
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;

		img {
			height: 20px;
		}
		span {
			font-size: 0.7rem;
			margin-left: 2px;
		}
	}
	input {
		width: 70%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
`;

export const InputDiv = styled.div`
	input {
		width: 100%;
		border: 1px solid #d9dbeb;
		outline: 0;
		color: #333;
		border-radius: 6px;
		padding-left: 20px;
		margin-bottom: 20px;
		height: 45px;

		&.no-m {
			margin-bottom: 0;
		}
	}

	label {
		font-size: 0.9rem;
		display: block;
		margin-bottom: 5px;
		color: #666;
	}

	.pos {
		position: relative;
		width: 100%;

		button,
		a {
			position: absolute;
			right: 15px;
			top: 8px;
			cursor: pointer;
			background: none;
			outline: 0;
			border: 0;
			text-decoration: none;
			color: #0241ff;
		}
	}
`;
