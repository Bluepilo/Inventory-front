import React, { useEffect, useState } from "react";
import { displayError, displaySuccess } from "../../utils/errors";
import { Form } from "../../styles/form.styles";
import { UploadWrapper } from "../../styles/basic.styles";
import Loading from "../Loaders/Loading";
import { ButtonSubmit } from "../../styles/links.styles";
import adminService from "../../redux/features/admin/admin-service";
import { useAppSelector } from "../../redux/hooks";

const CarouselForm = ({
	detail,
	onClose,
	onSubmit,
}: {
	detail: any;
	onClose: () => void;
	onSubmit: () => void;
}) => {
	const { token } = useAppSelector((state) => state.auth);

	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState("");
	const [type, setType] = useState("");
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (detail?.id) {
			setImage(detail.image);
			setTitle(detail.title);
			setType(detail.type);
		}
	}, [detail]);

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

	const submitHandler = async (e: any) => {
		e.preventDefault();
		if (title && image && type) {
			try {
				setLoad(true);
				if (detail) {
					await adminService.editCarousel(token, detail.id, {
						image,
						title,
						description: title,
						type,
					});
				} else {
					await adminService.createCarousel(token, {
						image,
						title,
						description: title,
						type,
					});
				}
				setLoad(false);
				displaySuccess(`Carousel ${detail ? "Updated" : "Added"}`);
				onSubmit();
				onClose();
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Provide Image, Title and For Fields");
		}
	};

	return (
		<Form onSubmit={submitHandler} className="mb-3">
			<div>
				<label>For</label>
				<select
					value={type}
					onChange={(e) => setType(e.target.value)}
					className="height"
				>
					<option value={""}>Select</option>
					<option value={"login"}>Login</option>
					<option value={"register"}>Registration</option>
				</select>
			</div>
			<div>
				<label>Title</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="height"
				/>
			</div>
			<UploadWrapper>
				{image ? (
					<div className="img-box">
						<a href={image} target="_blank">
							View Uploaded Image
						</a>
						<button onClick={() => setImage("")}>X</button>
					</div>
				) : (
					<div className="upload-btn-wrapper">
						<button className="btn wide">
							{uploading ? "Hold on..." : "Click to Upload image"}
						</button>
						<input
							disabled={uploading}
							type="file"
							name="myfile"
							onChange={fileUpload}
						/>
					</div>
				)}
			</UploadWrapper>
			<div className="mt-4">
				{load ? (
					<Loading />
				) : (
					<ButtonSubmit type="submit" disabled={load}>
						{detail ? "Update" : "Submit"}
					</ButtonSubmit>
				)}
			</div>
		</Form>
	);
};

export default CarouselForm;
