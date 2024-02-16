import { Flex, TitleStyles } from "../styles/basic.styles";
import BreadCrumb from "./BreadCrumb";
import { MainButton } from "../styles/links.styles";

interface Props {
	title: string;
	dataCount?: number;
	button?: string;
	buttonIcon?: any;
	buttonImg?: any;
	buttonClick?: () => void;
}

const TitleCover = ({
	title,
	dataCount,
	button,
	buttonIcon,
	buttonImg,
	buttonClick,
}: Props) => {
	return (
		<TitleStyles>
			<div className="btwn">
				<div className="title">
					<Flex>
						<h5>{title}</h5>
						{dataCount && (
							<span className="count">{dataCount}</span>
						)}
					</Flex>
					<BreadCrumb />
				</div>
				{button && (
					<MainButton onClick={buttonClick}>
						{buttonIcon && buttonIcon}
						{buttonImg && <img src={buttonImg} alt="Icon" />}
						<span>{button}</span>
					</MainButton>
				)}
			</div>
		</TitleStyles>
	);
};

export default TitleCover;
