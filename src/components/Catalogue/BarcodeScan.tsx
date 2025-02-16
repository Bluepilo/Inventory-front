import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { displayError, displaySuccess } from "../../utils/errors";
import Barcode from "react-barcode";
import { IconsInput } from "../../styles/form.styles";
import { RiQrScan2Fill } from "react-icons/ri";
import { FaCameraRetro, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const BarcodeScan = ({
	barcode,
	setBarcode,
}: {
	barcode: string;
	setBarcode: (arg: string) => void;
}) => {
	const videoRef = useRef<any>(null);
	const barcodeRef = useRef<any>(null);
	const controlsRef = useRef<{ stop: () => void } | null>(null);

	const [scanning, setScanning] = useState(false);
	const [showBarcode, setShowBarcode] = useState(false);
	const [pScanner, setPScanner] = useState(false);

	const codeReader = useRef<any>(new BrowserMultiFormatReader());

	useEffect(() => {
		if (scanning) {
			setPScanner(false);
			startScanning();
		} else {
			stopScanning();
		}
	}, [scanning]);

	useEffect(() => {
		if (pScanner) {
			setScanning(false);
			stopScanning();
			let scannedData = "";
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === "Enter") {
					setBarcode(scannedData);
					scannedData = "";
				} else {
					scannedData += event.key;
				}
			};

			window.addEventListener("keydown", handleKeyDown);

			return () => window.removeEventListener("keydown", handleKeyDown);
		}
	}, [pScanner]);

	const startScanning = async () => {
		try {
			controlsRef.current =
				await codeReader.current.decodeFromVideoDevice(
					undefined,
					videoRef.current,
					(result: any, err: any) => {
						if (result) {
							setBarcode(result.getText());
							setScanning(false);
							stopScanning();
							controlsRef.current?.stop();
						}
						if (err) {
							console.log(err, "ERROR");
						}
					}
				);
		} catch (err) {
			displayError(err, true);
		}
	};

	const stopScanning = () => {
		setScanning(false);
		if (controlsRef.current) {
			controlsRef.current.stop(); // Stops scanning
			controlsRef.current = null;
		}
		if (videoRef.current?.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach((track) => track.stop()); // Stop the webcam
			videoRef.current.srcObject = null;
		}
	};
	const downloadBarcode = (e: any) => {
		e.preventDefault();

		if (barcodeRef.current) {
			const svgElement = barcodeRef.current.querySelector("svg");

			if (svgElement) {
				const svgData = new XMLSerializer().serializeToString(
					svgElement
				);
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");
				const img = new Image();

				img.onload = () => {
					canvas.width = img.width;
					canvas.height = img.height;
					ctx?.drawImage(img, 0, 0);

					const link = document.createElement("a");
					link.href = canvas.toDataURL("image/png");
					link.download = "barcode.png";
					link.click();
				};

				img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
			}
		}
	};

	return (
		<>
			{barcode && showBarcode && (
				<div className="col-lg-12 text-center">
					<div ref={barcodeRef}>
						<Barcode value={barcode} />
					</div>
					<a href="#" onClick={downloadBarcode}>
						Download Barcode
					</a>
				</div>
			)}
			{scanning && (
				<div className="text-center">
					<video
						ref={videoRef}
						style={{
							width: "100%",
							maxWidth: "600px",
							height: "300px",
						}}
						autoPlay
						playsInline
					/>
					<div>
						<a
							href="#"
							className="main-btn"
							onClick={(e) => {
								e.preventDefault();
								stopScanning();
							}}
						>
							Stop Scanning
						</a>
					</div>
				</div>
			)}

			<div className="col-lg-12">
				<IconsInput>
					<label>Barcode</label>
					<div className="pos">
						<input
							type="text"
							required
							value={barcode}
							onChange={(e) => setBarcode(e.target.value)}
							className="height"
						/>

						<a
							href="#"
							className="one"
							onClick={(e) => {
								e.preventDefault();
								displaySuccess(
									"Ensure your physical scanning device is connected."
								);
								setPScanner(true);
							}}
						>
							<RiQrScan2Fill size={20} />
						</a>
						<a
							href="#"
							className="two"
							onClick={(e) => {
								e.preventDefault();
								setScanning(true);
							}}
						>
							<FaCameraRetro size={20} />
						</a>
						<a
							href="#"
							className="three"
							onClick={(e) => {
								e.preventDefault();
								barcode
									? setShowBarcode(!showBarcode)
									: alert("No barcode has been added.");
							}}
						>
							{showBarcode ? (
								<FaRegEyeSlash size={20} />
							) : (
								<FaRegEye size={20} />
							)}
						</a>
					</div>
				</IconsInput>
			</div>
		</>
	);
};

export default BarcodeScan;
