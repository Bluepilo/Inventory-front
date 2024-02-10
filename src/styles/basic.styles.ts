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
