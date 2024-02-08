import { Carousel } from "react-bootstrap";
import styled from "styled-components";

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

export const AuthStyle = styled.div`
	background: #fff;
	padding: 30px 20px;
	position: relative;
	width: 100%;
	height: 100vh;
	overflow-y: scroll;

	.auth-body {
		margin-top: 10px;
		.logo {
			text-align: center;
		}
		.content {
			margin-top: 15px;

			h5 {
				color: #0042ff;
				font-weight: 600;
				margin-bottom: 20px;
			}
		}
	}
`;

export const Hint = styled.button`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 0;
	outline: 0;
	background: #ffb900;
`;

export const HintBoard = styled.div`
	position: absolute;
	top: 100px;
	right: 20px;
	width: 80%;
	box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(102, 102, 102, 0.3);
	padding: 20px;
	border-radius: 4px;
	max-height: 80vh;
	overflow-y: scroll;
	background: #fff;
	z-index: 9991;

	h5 {
		font-size: 1rem;
		font-weight: 600;
	}

	.calls {
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		margin-top: 20px;

		a {
			width: 48%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-decoration: none;
			padding: 2px 15px;
			border-radius: 10px;

			&:first-child {
				background: #ffb900;
				color: #000d33;

				span:last-child {
					font-weight: bold;
				}
			}

			&:last-child {
				background: #edeef0;
				border: 1px solid #d9dbeb;

				span {
					color: #000;
				}
			}

			span.img {
				background: #000d33;
				height: 25px;
				width: 25px;
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
`;
