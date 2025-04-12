import styled from "styled-components";

export const Form = styled.form`
	input,
	textarea,
	select {
		width: 100%;
		border: 1px solid #d9dbeb;
		outline: 0;
		color: #333;
		border-radius: 6px;
		padding-left: 20px;
		margin-bottom: 20px;

		&.height {
			height: 45px;
		}

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

		button,
		a {
			position: absolute;
			right: 15px;
			top: 5px;
			cursor: pointer;
			background: none;
			outline: 0;
			border: 0;
			text-decoration: none;
			color: #333;
		}
	}

	.forgot {
		margin-top: 7px;
		font-size: 0.9rem;
		color: #333;
	}

	.error-check {
		color: #f44336;
		ul {
			margin: 0;
			padding: 0;
			margin-bottom: 20px;
			margin-left: 20px;
			li {
				font-size: 0.7rem;
			}
		}
		p {
			margin: 0;
			padding: 0;
			font-size: 0.7rem;
		}
	}
`;

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
		height: 15px !important;
		width: 15px !important;
		margin-bottom: 0 !important;
	}
	span {
		margin-left: 10px;
	}
`;

export const JointDiv = styled.div`
	input {
		width: 60%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	select {
		width: 40%;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: 0;
	}
`;

export const FormBody = styled.div`
	border: 1px solid #d9dbeb;
	padding: 25px;
	border-radius: 4px;
`;

export const IconsInput = styled.div`
	a {
		color: #0241ff !important;
		top: 8px !important;
	}
	a.one {
		right: 80px !important;
	}
	a.two {
		right: 50px !important;
	}
`;
