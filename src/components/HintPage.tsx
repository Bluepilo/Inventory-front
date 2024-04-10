import { useState } from "react";
import { HintBoard } from "../styles/auth.styles";
import { faqsHints } from "../utils/data";
import { FaqDiv, FlexBetween } from "../styles/basic.styles";
import { FaPlus, FaMinus } from "react-icons/fa6";
import IconSend from "../assets/icons/send.svg";

const HintPage = () => {
	const [active, setActive] = useState(1);

	return (
		<HintBoard>
			<h5>Hint Page</h5>
			{faqsHints.map((faq) => (
				<FaqDiv
					active={faq.id == active ? true : false}
					onClick={() => setActive(faq.id)}
				>
					<FlexBetween>
						<h6>{faq.title}</h6>
						{faq.id == active ? <FaMinus /> : <FaPlus />}
					</FlexBetween>
					{faq.id == active && (
						<div className="actives">
							<ol>
								{faq.list.map((l, i) => (
									<li key={i + 1}>{l}</li>
								))}
							</ol>
						</div>
					)}
				</FaqDiv>
			))}
			<div className="calls">
				<a href="tel:09134160765">
					<span>Call Support</span>
					<span>0913 416 0765</span>
				</a>
				<a href="https://bluepilo.com/contact-us/" target="_blank">
					<span>Chat with Support</span>
					<span className="img">
						<img src={IconSend} />
					</span>
				</a>
			</div>
		</HintBoard>
	);
};

export default HintPage;
