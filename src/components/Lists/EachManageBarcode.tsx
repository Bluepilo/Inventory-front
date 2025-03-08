import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { generateBarcode } from "../../utils/basic";
import { displayError, displaySuccess } from "../../utils/errors";
import productService from "../../redux/features/product/product-service";
import Loading from "../Loaders/Loading";
import { Spinner } from "react-bootstrap";

const EachManageBarcode = ({ li, reload }: { li: any; reload: () => void }) => {
	const { details } = useAppSelector((state) => state.auth);

	const [val, setVal] = useState(li.barcode);
	const [load, setLoad] = useState(false);

	const updateBarcode = async () => {
		try {
			setLoad(true);
			await productService.editProduct(
				{ barcode: val },
				li.id,
				details.role.isAdmin
			);
			setLoad(false);
			displaySuccess("Barcode has been saved");
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<tr>
			<td>{li.summary}</td>
			<td className="input">
				<input value={val} onChange={(e) => setVal(e.target.value)} />
			</td>
			<td className="bbtn">
				{!li?.barcode && (
					<button
						onClick={() => {
							setVal(generateBarcode(`${details.business?.id}`));
						}}
					>
						Auto Generate
					</button>
				)}
				<button className="mx-3">Print</button>
				{li.barcode !== val && load ? (
					<Spinner animation="border" variant="primary" size="sm" />
				) : (
					<button onClick={updateBarcode}>Save</button>
				)}
			</td>
		</tr>
	);
};

export default EachManageBarcode;
