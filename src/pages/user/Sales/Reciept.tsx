import { useRef } from "react";
import TitleCover from "../../../components/TitleCover";
import { ReceiptStyle } from "../../../styles/basic.styles";
import ThermalSale from "../../../components/Receipt/ThermalSale";
import { useLocation } from "react-router-dom";
import { MainButton } from "../../../styles/links.styles";
import { FiPrinter } from "react-icons/fi";
import ReactToPrint from "react-to-print";

const Reciept = () => {
	const bodyRef = useRef(null);

	const stateData = useLocation().state;

	return (
		<div>
			<TitleCover title={`Print Receipt`} />
			<div className="mt-3 text-center">
				<ReactToPrint
					content={() => bodyRef.current}
					trigger={() => {
						return (
							<MainButton>
								<FiPrinter />
								<span>Print</span>
							</MainButton>
						);
					}}
				/>
			</div>
			<ReceiptStyle>
				<div className="container" ref={bodyRef}>
					<ThermalSale result={stateData} />
				</div>
			</ReceiptStyle>
		</div>
	);
};

export default Reciept;
