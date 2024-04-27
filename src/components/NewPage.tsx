import { useAppSelector } from "../redux/hooks";
import { NewPageStyles } from "../styles/basic.styles";
import { haveRole } from "../utils/role";

interface Props {
	img: any;
	title: string;
	cover: string;
	desc: string;
	btnTitle: string;
	linkTo: any;
}

const NewPage = ({ img, title, cover, desc, btnTitle, linkTo }: Props) => {
	const { details } = useAppSelector((state) => state.auth);

	const permit = () => {
		if (
			haveRole(details.businessRoleId).isBusinessAdminActioners ||
			haveRole(details.businessRoleId).isShopAdmin
		) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<NewPageStyles>
						<img src={img} alt={title} />
						<h3>{cover}</h3>
						<p>{desc}</p>
						{permit() && (
							<button onClick={linkTo}>{btnTitle}</button>
						)}
					</NewPageStyles>
				</div>
			</div>
		</div>
	);
};

export default NewPage;
