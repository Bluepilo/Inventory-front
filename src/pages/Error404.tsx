import { Container, Row, Col } from "react-bootstrap";
import { TbHandClick } from "react-icons/tb";
import Logo from "../assets/images/logo.svg";
import Img from "../assets/images/404.jpg";
import { ErrorStyle } from "../styles/basic.styles";
import { MainButton } from "../styles/links.styles";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Row className="justify-content-center">
				<Col lg={6} md={10}>
					<ErrorStyle>
						<img src={Logo} alt="Logo" className="logo" />
						<img
							src={Img}
							alt="Error 404"
							className="img-fluid"
							style={{ height: "360px" }}
						/>
						<p>Looks like you are lost. Let's get you back!</p>
						<MainButton onClick={() => navigate("/")}>
							<TbHandClick />
							<span>Click Here</span>
						</MainButton>
					</ErrorStyle>
				</Col>
			</Row>
		</Container>
	);
};

export default Error404;
