import styled from "styled-components";

export const Form = styled.form`
	input {
		width: 100%;
		border: 1px solid #d9dbeb;
		outline: 0;
		height: 40px;
		color: #333;
		border-radius: 6px;
		padding-left: 20px;
		margin-bottom: 20px;

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

		button {
			position: absolute;
			right: 15px;
			top: 5px;
			cursor: pointer;
			background: none;
			outline: 0;
			border: 0;
		}
	}

	.forgot {
		margin-top: 7px;
		font-size: 0.9rem;
		color: #333;
	}
`;
