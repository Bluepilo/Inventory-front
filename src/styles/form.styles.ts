import styled from "styled-components";

export const Form = styled.form`
	input,
	textarea,
	select {
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

	textarea {
		height: 100px;
		padding-top: 10px;
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

export const BasicInput = styled.input``;

export const TextAreaComment = styled.div`
	textarea {
		border: 1px solid #d9dbeb;
		outline: 0;
		height: 150px;
		width: 100%;
		margin-bottom: 5px;
		color: #333;
		border-radius: 4px;
		padding-left: 15px;
		padding-top: 10px;
	}

	label {
		text-transform: capitalize;
		margin-bottom: 5px;
		display: block;
		color: #333;
		font-size: 0.8rem;
	}

	.btns {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
`;

export const CheckBox = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;

	input {
		height: 15px;
		width: 15px;
	}
	span {
		margin-left: 10px;
	}
`;

export const JointDiv = styled.div`
	input {
		width: 60%;
	}
	select {
		width: 40%;
	}
`;
