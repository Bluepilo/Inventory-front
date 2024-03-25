import { useState } from "react";
import { BasicSearch } from "../Filters/BasicInputs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MainButton } from "../../styles/links.styles";
import {
	BrandSearchResult,
	ManagedFoundStyle,
	NoSearchResult,
} from "../../styles/catalogue.styles";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { FlexBetween } from "../../styles/basic.styles";
import { displayError } from "../../utils/errors";
import productService from "../../redux/features/product/product-service";
import { toast } from "react-toastify";
import BrandForm from "./BrandForm";
import { Form } from "../../styles/form.styles";
import { updateOnboardingSteps } from "../../redux/features/basic/basic-slice";

const SearchBrands = ({ nextScreen }: { nextScreen: (arg: any) => void }) => {
	const { brands } = useAppSelector((state) => state.basic);

	const [search, setSearch] = useState("");
	const [brandList, setBrandList] = useState([]);

	const searchHandler = (val: string) => {
		setSearch(val);
		let arr = brands?.filter(
			(b: any) => b.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
		);
		setBrandList(val.length > 0 ? arr : []);
	};

	return (
		<>
			<p style={{ fontSize: "1.1rem" }}>
				We could provide the{" "}
				<strong>Brand, products and pricelist</strong> for you with
				<strong> Managed Brand</strong>
			</p>
			<p>First Check our Database and request with just a button?</p>
			<div>
				<BasicSearch
					searchVal={search}
					changeSearchVal={(val: string) => searchHandler(val)}
					wide="true"
					placeholder="Search for your favorite brand and select from the list"
				/>
			</div>
			<BrandSearchResult>
				{brandList.map((brand: any) => (
					<div key={brand.id}>
						<p>{brand.name}</p>
						<MainButton
							sm="true"
							onClick={() =>
								nextScreen({
									screen: 2,
									val: brand.name,
									id: brand.id,
								})
							}
						>
							Select
						</MainButton>
					</div>
				))}
			</BrandSearchResult>
			{brandList.length === 0 && search.length > 1 && (
				<NoSearchResult>
					<div className="red">No Result found for {search}</div>
					<div className="click">
						<p>
							Click to tell us about the brand and we can manage
							your catalogue
						</p>
						<MainButton
							onClick={() =>
								nextScreen({
									screen: 2,
									val: search,
									type: "request",
								})
							}
							bg="#ffb900"
							color="#000D33"
						>
							Tell Us More
						</MainButton>
					</div>
					<div className="click">
						<p>
							Create your Brand, product, and pricelist yourself?
						</p>
						<MainButton
							onClick={() =>
								nextScreen({
									screen: 3,
									name: search,
								})
							}
						>
							Self Service Brand
						</MainButton>
					</div>
				</NoSearchResult>
			)}
		</>
	);
};

const ManagedFound = ({
	brand,
	onCancel,
	onComplete,
}: {
	brand: any;
	onCancel: () => void;
	onComplete: () => void;
}) => {
	const dispatch = useAppDispatch();

	const { token, details } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [name, setName] = useState(brand.val);
	const [desc, setDesc] = useState("");

	const requestHandler = async () => {
		try {
			setLoad(true);
			await productService.requestBrand(token, {
				brandId: brand.id,
				name: name || brand.val,
				description: desc || brand.val,
			});
			setLoad(false);
			toast.success("Brand request successful");
			saveTrialPick();
			onComplete();
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const saveTrialPick = () => {
		if (details.business.onboardingSteps?.product !== "completed") {
			dispatch(
				updateOnboardingSteps({
					steps: {
						...details?.business?.onboardingSteps,
						product: "completed",
					},
				})
			);
		}
	};

	return (
		<ManagedFoundStyle>
			{brand.type === "request" ? (
				<Form>
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={load}
						className="height"
					/>
					<label>Description</label>
					<input
						type="text"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
						disabled={load}
						className="height"
					/>
				</Form>
			) : (
				<div className="yellow">
					<IoMdInformationCircleOutline />
					<span>{brand.val} is available in managed brands</span>
				</div>
			)}
			<div className="info">
				<p>Managed Brands makes business administration easy!!!</p>
				<ul>
					<li>
						<CiCirclePlus />
						<span>We Provide all the products lists</span>
					</li>
					<li>
						<CiCirclePlus />
						<span>We provide the price lists</span>
					</li>
					<li>
						<CiCirclePlus />
						<span>
							You also get automatic products and price updates
						</span>
					</li>
					<li>
						<CiCirclePlus />
						<span>You also have control over your prices</span>
					</li>
				</ul>
				<p>Terms and Condition applied</p>
				<p>
					You can access (3) managed brands if you need more please
					upgrade your subscription
				</p>
			</div>
			<FlexBetween>
				<MainButton disabled={load} onClick={requestHandler}>
					{load ? "Hold On..." : "Request Brand"}
				</MainButton>
				<MainButton
					bg="#D4E9FF"
					color="#000D33"
					onClick={() => onCancel()}
					disabled={load}
				>
					Cancel
				</MainButton>
			</FlexBetween>
		</ManagedFoundStyle>
	);
};

const NewBrand = ({ onComplete }: { onComplete: () => void }) => {
	const [screen, setScreen] = useState(1);
	const [brand, setBrand] = useState<any>({});

	return (
		<div>
			{screen === 1 ? (
				<SearchBrands
					nextScreen={(arg: any) => {
						setScreen(arg.screen);
						setBrand(arg);
					}}
				/>
			) : screen === 2 ? (
				<ManagedFound
					brand={brand}
					onCancel={() => setScreen(1)}
					onComplete={onComplete}
				/>
			) : screen === 3 ? (
				<BrandForm
					brandDetail={brand}
					onComplete={onComplete}
					onCancel={() => setScreen(1)}
				/>
			) : (
				<></>
			)}
		</div>
	);
};

export default NewBrand;
