import { TermsDiv } from "../styles/basic.styles";
import { UnderlineLink } from "../styles/links.styles";

const Terms = () => {
	return (
		<TermsDiv>
			<div className="div-link mb-2">
				<UnderlineLink
					href="https://bluepilo.com/terms"
					target="_blank"
				>
					Terms of Service
				</UnderlineLink>
				<UnderlineLink
					href="https://bluepilo.com/privacy-policy"
					target="_blank"
				>
					Privacy Policy
				</UnderlineLink>
			</div>
			<p>
				&copy; {new Date().getFullYear()}{" "}
				<UnderlineLink href="https://bluepilo.com" target="_blank">
					Bluepilo
				</UnderlineLink>{" "}
				Inc. all rights reserved.
			</p>
		</TermsDiv>
	);
};

export default Terms;
