import React, { useState } from "react";
import { displayError } from "../../utils/errors";
import productService from "../../redux/features/product/product-service";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";

const StockAlert = ({ stock }: { stock: any }) => {
	const [val, setVal] = useState("");
	const [load, setLoad] = useState(false);

	const { token } = useAppSelector((state) => state.auth);

	const submitHandler = async () => {
		if (val) {
			if (
				window.confirm("Are you sure you want to set the stock alert?")
			) {
				try {
					setLoad(true);
					await productService.setMinStockAlert(token, stock.id, {
						quantity: val,
					});
					setLoad(false);
					setVal("");
					toast.success("Minimum stock alert has been set");
				} catch (err) {
					setLoad(false);
					displayError(err, true);
				}
			}
		}
	};

	return (
		<div className="stock-alert">
			<input
				type="number"
				value={val}
				onChange={(e) => setVal(e.target.value)}
				disabled={load}
			/>
			<button disabled={load} onClick={submitHandler}>
				Set
			</button>
		</div>
	);
};

export default StockAlert;
