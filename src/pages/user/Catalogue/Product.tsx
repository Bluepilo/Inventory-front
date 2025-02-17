import { useEffect, useState } from "react";
import TitleCover from "../../../components/TitleCover";
import { BasicSearch } from "../../../components/Filters/BasicInputs";
import { Flex } from "../../../styles/basic.styles";
import { MainButton } from "../../../styles/links.styles";
import { GiCloudUpload, GiTrashCan } from "react-icons/gi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productService from "../../../redux/features/product/product-service";
import { useAppSelector } from "../../../redux/hooks";
import { displayError } from "../../../utils/errors";
import Paginate from "../../../components/Paginate";
import { UseDebounce } from "../../../utils/hooks";
import { toast } from "react-toastify";
import adminService from "../../../redux/features/admin/admin-service";
import PermissionDenied from "../../../components/PermissionDenied";
import { FiTrash } from "react-icons/fi";
import ProductTable from "../../../components/Catalogue/ProductTable";
import LayoutSwitching from "../../../components/LayoutSwitching";
import ProductImage from "../../../components/Catalogue/ProductImage";

const Product = () => {
	const navigate = useNavigate();

	const params = useParams();

	const { details } = useAppSelector((state) => state.auth);

	const [search, setSearch] = useState("");
	const [brandName, setBrandName] = useState("");
	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>({});
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [ids, setIds] = useState<any>([]);
	const [pictureMode, setPictureMode] = useState(false);

	const debouncedSearch = UseDebounce(search);

	const nameState = useLocation()?.state?.name;

	const fetchBrand = async () => {
		try {
			let res = await productService.viewBrand(params?.id || "");
			if (res?.name) {
				setBrandName(res.name);
			}
		} catch (err) {}
	};

	let filters = `&page=${page}&limit=${limit}`;
	let searchFilter = `?searchWord=${debouncedSearch}&page=${page}&limit=${limit}&brandId=${params?.id}`;

	const fetchProducts = async () => {
		try {
			setLoad(true);
			let res;
			if (details.role.isAdmin) {
				res = await adminService.listProducts(
					`?brandId=${params?.id}${filters}`
				);
			} else {
				res = await productService.listBrandProducts(
					filters,
					params?.id || ""
				);
			}
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const searchProducts = async () => {
		try {
			setLoad(true);
			let res = await productService.searchProducts(searchFilter);
			setLoad(false);
			setList(res);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	useEffect(() => {
		if (nameState) {
			setBrandName(nameState);
		} else {
			fetchBrand();
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (debouncedSearch) {
			searchProducts();
		} else {
			fetchProducts();
		}
	}, [debouncedSearch, filters]);

	const deleteHandler = async (id: string, name: string) => {
		if (window.confirm(`Are you sure you want to delete ${name}`)) {
			try {
				setLoad(true);
				await productService.deleteProduct(id, details.role.isAdmin);
				if (search) {
					setSearch("");
				}
				fetchProducts();
				toast.success(`${name} has been deleted successfully.`);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	const ifAllowed = (method: string) => {
		if (details.role.isAdmin) {
			return details.role.permissions?.find((f) => f.method === method)
				? true
				: false;
		} else {
			return true;
		}
	};

	const updateIds = (val: boolean, id: any) => {
		if (id === "all") {
			let vals = list.rows?.map((l: any) => {
				return l.id;
			});
			val ? setIds(vals) : setIds([]);
		} else {
			if (val) {
				setIds([...ids, id]);
			} else {
				setIds(ids.filter((i: any) => i != id));
			}
		}
	};

	const bulkDeleteHandler = async () => {
		if (
			window.confirm(
				`Are you sure you want to delete the selected product${
					ids.length > 1 ? "s" : ""
				}`
			)
		) {
			try {
				setLoad(true);
				await productService.deleteBulkProduct(
					ids,
					details.role.isAdmin
				);
				setIds([]);
				fetchProducts();
				toast.success(`Products has been deleted successfully.`);
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		}
	};

	return ifAllowed("allProducts") ? (
		<div>
			<TitleCover
				title={`${brandName} Catalogue`}
				dataCount={list?.count}
				switching={
					<LayoutSwitching
						pictureMode={pictureMode}
						setPictureMode={setPictureMode}
					/>
				}
			/>
			<div className="row mt-4">
				<div className="col-lg-6 mb-3">
					<BasicSearch
						wide="true"
						searchVal={search}
						changeSearchVal={setSearch}
					/>
				</div>

				<div className="col-lg-6 mb-3">
					<Flex>
						{ifAllowed("addProduct") && (
							<MainButton
								className="me-3"
								onClick={() => navigate("new")}
							>
								<MdProductionQuantityLimits />
								<span>New Product</span>
							</MainButton>
						)}
						{ifAllowed("uploadProductExcel") && (
							<MainButton
								bg="#EDEEF0"
								color="#505BDA"
								className="me-3"
								onClick={() => navigate("upload")}
							>
								<GiCloudUpload />
								<span>Upload File</span>
							</MainButton>
						)}
						{ids.length > 0 && (
							<MainButton
								bg="red"
								color="#FFF"
								onClick={() => bulkDeleteHandler()}
							>
								<FiTrash />
								<span>Delete Products</span>
							</MainButton>
						)}
					</Flex>
				</div>
			</div>

			<div className="mt-4">
				{pictureMode ? (
					<ProductImage
						list={list}
						load={load}
						deleteHandler={deleteHandler}
						updateIds={updateIds}
						ids={ids}
					/>
				) : (
					<ProductTable
						list={list}
						load={load}
						deleteHandler={deleteHandler}
						updateIds={updateIds}
						ids={ids}
					/>
				)}
				{!load && list?.count ? (
					<Paginate
						changeLimit={(l) => setLimit(l)}
						limit={list.limit}
						count={list.count}
						pageNumber={page}
						onPrev={(n) => setPage(n)}
						onNext={(n) => setPage(n)}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	) : (
		<PermissionDenied />
	);
};

export default Product;
