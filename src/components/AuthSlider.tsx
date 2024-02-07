import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { CarouselSlide, ImageBox } from "../styles/auth.styles";

const AuthSlider = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<div>
			<CarouselSlide controls={false}>
				<Carousel.Item>
					<ImageBox></ImageBox>
				</Carousel.Item>
				<Carousel.Item>
					<ImageBox yellow={true}></ImageBox>
				</Carousel.Item>
				<Carousel.Item>
					<ImageBox></ImageBox>
				</Carousel.Item>
				<Carousel.Item>
					<ImageBox yellow={true}></ImageBox>
				</Carousel.Item>
			</CarouselSlide>
		</div>
	);
};

export default AuthSlider;
