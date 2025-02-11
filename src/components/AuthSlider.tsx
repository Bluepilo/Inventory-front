import { Carousel } from "react-bootstrap";
import { CarouselSlide, ImageBox } from "../styles/auth.styles";
import { useAppSelector } from "../redux/hooks";

const AuthSlider = ({ path }: { path: string }) => {
	const { carousels } = useAppSelector((state) => state.basic);

	const carouselList = carousels?.filter(
		(c: any) => c.type === (path === "/" ? "login" : "register")
	);

	return (
		<div>
			{carouselList?.length > 0 ? (
				<CarouselSlide controls={false}>
					{carouselList.map((caro: any) => (
						<Carousel.Item key={caro.id}>
							<ImageBox>
								<img src={caro.image} alt="Carousel" />
							</ImageBox>
						</Carousel.Item>
					))}
				</CarouselSlide>
			) : (
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
			)}
		</div>
	);
};

export default AuthSlider;
