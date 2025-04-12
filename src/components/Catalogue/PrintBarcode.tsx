import OutsideClick from "../OutsideClick";
import { DrawerDiv } from "../../styles/basic.styles";
import Barcode from "react-barcode";
import { useRef, useState } from "react";
import { CheckBox } from "../../styles/form.styles";
import { MainButton } from "../../styles/links.styles";
import { FiPrinter } from "react-icons/fi";
import { useAppSelector } from "../../redux/hooks";
import { formatCurrency } from "../../utils/currency";
import { useReactToPrint } from "react-to-print";

const PrintBarcode = ({ close, code }: { close: () => void; code: any }) => {
	const { currency } = useAppSelector((state) => state.auth);

	const barcodeRef = useRef<any>(null);

	const [addPrice, setAddPrice] = useState(false);
	const [addName, setAddName] = useState(false);

	const handlePrint = useReactToPrint({
		content: () => barcodeRef.current,
	});

	return (
		<OutsideClick handleToggle={() => close()}>
			<DrawerDiv className="pt-4">
				<div ref={barcodeRef} className="text-center">
					<Barcode value={code.barcode} />
					<div className="text-center">
						{addName && (
							<p
								style={{
									fontSize: "0.8rem",
									margin: 0,
									padding: 0,
								}}
							>
								<strong>{code.name}</strong>
							</p>
						)}
						{addPrice && (
							<p
								style={{
									margin: 0,
									padding: 0,
									fontSize: "0.8rem",
									fontWeight: "600",
								}}
							>
								{currency} {formatCurrency(code.costPrice)}
							</p>
						)}
					</div>
				</div>
				<div className="mt-4">
					<CheckBox>
						<input
							checked={addPrice}
							onChange={(e) => setAddPrice(e.target.checked)}
							type="checkbox"
						/>
						<span>Include Price</span>
					</CheckBox>
					<CheckBox>
						<input
							checked={addName}
							onChange={(e) => setAddName(e.target.checked)}
							type="checkbox"
						/>
						<span>Include Name</span>
					</CheckBox>
					<div className="text-center mt-3">
						<MainButton onClick={handlePrint}>
							<FiPrinter />
							<span>Print</span>
						</MainButton>
					</div>
				</div>
			</DrawerDiv>
		</OutsideClick>
	);
};

export default PrintBarcode;
