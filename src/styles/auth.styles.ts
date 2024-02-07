import { Carousel } from "react-bootstrap";
import styled from "styled-components";

interface Props {
	height: number;
}

export const AuthCover = styled.div`
	height: 100vh;
	overflow: hidden;
`;

export const SlideCover = styled.div`
	background: #d4e9ff;
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ImageBox = styled.div<{ yellow?: boolean }>`
	height: 70vh;
	width: 500px;
	background: ${(props) => (props.yellow ? "#FFB500" : "#000d33")};
	border-radius: 5px;
	display: block;
`;

export const CarouselSlide = styled(Carousel)`
	width: 500px;

	.carousel-indicators {
		position: absolute;
		bottom: -50px;
	}

	.carousel-indicators button {
		border-radius: 50%;
		width: 12px;
		height: 12px;
		background-color: #c4c7db;

		&.active {
			width: 20px;
			border-radius: 50%;
			background-color: #000d33;
		}
	}
`;
