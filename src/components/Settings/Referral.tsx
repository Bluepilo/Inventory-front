import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	XIcon,
} from "react-share";
import { ReferralBox } from "../../styles/profile.styles";
import { FiCopy } from "react-icons/fi";
import { displaySuccess } from "../../utils/errors";

export default function Referral({ code }: { code: string }) {
	const shareUrl = `${window.location.origin}/sign-up?code=${code}`;
	const title = "BluePilo";

	return (
		<ReferralBox>
			<p>Share your Referral code and get rewards</p>

			<div className="share">
				<div className="share-icon">
					<FacebookShareButton url={shareUrl}>
						<FacebookIcon size={32} round />
					</FacebookShareButton>
				</div>

				<div className="share-icon">
					<TwitterShareButton url={shareUrl} title={title}>
						<XIcon size={32} round />
					</TwitterShareButton>
				</div>

				<div className="share-icon">
					<TelegramShareButton url={shareUrl} title={title}>
						<TelegramIcon size={32} round />
					</TelegramShareButton>
				</div>

				<div className="share-icon">
					<WhatsappShareButton
						url={shareUrl}
						title={title}
						separator=":: "
					>
						<WhatsappIcon size={32} round />
					</WhatsappShareButton>
				</div>

				<div className="share-icon">
					<LinkedinShareButton url={shareUrl}>
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>
				</div>

				<div className="share-icon">
					<RedditShareButton
						url={shareUrl}
						title={title}
						windowWidth={660}
						windowHeight={460}
					>
						<RedditIcon size={32} round />
					</RedditShareButton>
				</div>

				<div className="share-icon">
					<EmailShareButton
						url={shareUrl}
						subject={title}
						body="body"
					>
						<EmailIcon size={32} round />
					</EmailShareButton>
				</div>
			</div>
			<div className="button-div">
				<div className="box">{`${window.location.origin}/signup?code=${code}`}</div>
				<button
					onClick={() => {
						navigator.clipboard.writeText(
							`${window.location.origin}?code=${code}`
						);
						displaySuccess("Copied!");
					}}
				>
					Copy <FiCopy />
				</button>
			</div>
		</ReferralBox>
	);
}
