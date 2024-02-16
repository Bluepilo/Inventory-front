import styled from "styled-components";

export const FaqDiv = styled.div<{ active: boolean }>`
	padding: 10px;
	background: ${(props) => (props.active ? "#000d33" : "#ffffff")};
	font-size: 0.9rem;
	color: ${(props) => (!props.active ? "#000d33" : "#ffffff")};
	border: 1px solid #d9dbeb;
	margin-bottom: 10px;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.5s;

	h6 {
		font-weight: 600;
		font-size: 0.9rem;
		color: ${(props) => (props.active ? "#FFB500" : "#000d33")};
		margin: 0;
		padding: 0;
	}

	.actives {
		margin-top: 10px;
		transition: margin 0.5s;
	}
`;

export const Flex = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

export const FlexBetween = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
`;

export const TermsDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #666;
	font-size: 0.9rem;

	.div-link {
		a {
			padding: 0 10px;
		}
		a:first-child {
			border-right: 1px solid #666;
		}
	}
`;

export const ErrorStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	margin-top: 25px;
	padding: 20px 10px;
`;

export const LoadPage = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	p {
		font-size: 0.9rem;
		color: #0241ff;
		text-transform: uppercase;
		text-align: center;
		margin-top: 10px;
	}
`;

export const TitleStyles = styled.div`
	.btwn {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.title {
		h5 {
			margin: 0;
			padding: 0;
			font-weight: 600;
			font-size: 1.4rem;
		}

		span.count {
			display: flex;
			padding: 4px 12px;
			align-items: flex-start;
			border-radius: 25px;
			background: #ffb500;
			font-weight: bold;
			margin-left: 10px;
			font-size: 0.9rem;
		}
	}
`;

export const BreadCrumbStyles = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;

	button {
		border: 0;
		outline: 0;
		background: none;
		font-weight: 600;
		margin-right: 20px;

		span {
			margin-left: 7px;
		}
	}

	a {
		text-transform: capitalize;
		text-decoration: none;
		color: #333333;
		margin-right: 8px;

		span {
			margin-right: 5px;
		}
	}
`;
