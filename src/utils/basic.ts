function generateBarcode(prefix: string, length = 12) {
	if (prefix.length >= length) {
		throw new Error(
			"Prefix length must be smaller than the total barcode length."
		);
	}
	const randomLength = length - prefix.length - 1; // Reserve 1 digit for checksum
	const randomNumber = Math.floor(Math.random() * Math.pow(10, randomLength))
		.toString()
		.padStart(randomLength, "0"); // Ensure correct length

	const barcodeWithoutChecksum = prefix + randomNumber;
	const checksum = calculateChecksum(barcodeWithoutChecksum);

	return barcodeWithoutChecksum + checksum;
}

function calculateChecksum(barcode: string) {
	let sum = 0;
	for (let i = 0; i < barcode.length; i++) {
		let digit = parseInt(barcode[i]);
		sum += i % 2 === 0 ? digit * 3 : digit;
	}
	let checksum = (10 - (sum % 10)) % 10;
	return checksum;
}

export { generateBarcode };
