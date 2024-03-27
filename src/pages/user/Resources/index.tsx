import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { ResourceList } from "../../../styles/basic.styles";
import dateFormat from "dateformat";
import { FaAngleRight } from "react-icons/fa6";
import { displayError } from "../../../utils/errors";
import basicService from "../../../redux/features/basic/basic-service";
import { useAppSelector } from "../../../redux/hooks";
import FaqLoad from "../../../components/Loaders/FaqLoad";
import { useNavigate } from "react-router-dom";

const Resources = () => {
	const navigate = useNavigate();

	const { token } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [faqs, setFaqs] = useState<any>([]);

	useEffect(() => {
		loadFaqs();
	}, []);

	useEffect(() => {
		addTawkScript();

		return () => {
			let elem: any = document.getElementById("basic-tawk");
			if (elem) {
				elem.parentNode.removeChild(elem);
			}
		};
	}, []);

	const addTawkScript = () => {
		let src = `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
		var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
		s1.async=true;
		s1.src='https://embed.tawk.to/654436dcf2439e1631eb2b07/1hj5vk7k6';
		s1.charset='UTF-8';
		s1.setAttribute('crossorigin','*');
		s0.parentNode.insertBefore(s1,s0);
		})();`;

		const script = document.createElement("script");

		script.type = "text/javascript";
		script.textContent = src;
		script.id = "basic-tawk";

		document.body.appendChild(script);
	};

	const loadFaqs = async () => {
		try {
			setLoad(true);
			let res = await basicService.loadFaqs(token);
			setLoad(false);
			setFaqs(Array.isArray(res) ? res : []);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const goTo = (faq: any) => {
		let str = faq.question;
		str = str.replace(/\s+/g, "-");
		navigate(`${str?.toLowerCase()}`, { state: faq });
	};

	return (
		<div>
			<TitleCover title={`Resources`} />
			<div className="mt-4 row">
				<div className="col-lg-8">
					{load ? (
						<FaqLoad />
					) : (
						<ResourceList>
							{faqs.map((faq: any) => (
								<div
									key={faq.id}
									className="box shadow-sm"
									onClick={() => goTo(faq)}
								>
									<div>
										<h5>{faq.question}</h5>
										<p>
											Last Updated:{" "}
											{dateFormat(
												faq.updatedAt,
												"mmm dd, yyyy | h:MM TT"
											)}
										</p>
									</div>

									<FaAngleRight />
								</div>
							))}
						</ResourceList>
					)}
				</div>
			</div>
		</div>
	);
};

export default Resources;
