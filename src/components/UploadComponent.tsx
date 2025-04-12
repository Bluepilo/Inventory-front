import { useState } from "react";
import { UploadWrapper } from "../styles/basic.styles";
import { displayError } from "../utils/errors";

const UploadComponent = ({
	image,
	setImage,
	allowChange,
	label,
	uploadedLabel,
}: {
	image: string;
	setImage: (arg: string) => void;
	allowChange: boolean;
	label?: string;
	uploadedLabel?: string;
}) => {
	const [uploading, setUploading] = useState(false);

	const fileUpload = (e: any) => {
		if (window.confirm("Upload Image?")) {
			let file = e.target.files[0];
			setUploading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("image", file);
			formData.append("upload_preset", "Bluepilo");
			formData.append("cloud_name", "dikkx8dz4");

			fetch("https://api.cloudinary.com/v1_1/dikkx8dz4/image/upload", {
				method: "POST",
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					setUploading(false);
					setImage(data.secure_url);
				})
				.catch((err) => {
					setUploading(false);
					displayError(err, true);
				});
		}
	};

	return (
		<UploadWrapper>
			<div className="row">
				<div className="col-lg-6">
					{allowChange && (
						<div className="upload-btn-wrapper">
							<button className="btn wide">
								{uploading
									? "Hold on..."
									: label || "Click to Upload image"}
							</button>
							<input
								disabled={uploading}
								type="file"
								name="myfile"
								onChange={fileUpload}
							/>
						</div>
					)}
				</div>
				<div className="col-lg-6">
					{image && (
						<div className="img-box">
							<a href={image} target="_blank">
								{uploadedLabel || "View Uploaded Image"}
							</a>
							<button onClick={() => setImage("")}>X</button>
						</div>
					)}
				</div>
			</div>
		</UploadWrapper>
	);
};

export default UploadComponent;
