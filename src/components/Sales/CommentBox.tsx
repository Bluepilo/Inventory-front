import { useState } from "react";
import { TextAreaComment } from "../../styles/form.styles";
import { MainButton } from "../../styles/links.styles";

const CommentBox = ({
	submit,
	bg,
	btnName,
	disabled,
}: {
	submit: (arg: string) => void;
	bg?: string;
	btnName?: string;
	disabled?: boolean;
}) => {
	const [comment, setComment] = useState("");

	return (
		<TextAreaComment>
			<label>Provide a Comment:</label>
			<textarea
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				disabled={disabled ? true : false}
			></textarea>
			<div className="btns">
				<MainButton
					bg={bg}
					onClick={() => submit(comment)}
					disabled={disabled ? true : false}
				>
					{disabled ? "Hold On..." : btnName || "Submit"}
				</MainButton>
			</div>
		</TextAreaComment>
	);
};

export default CommentBox;
