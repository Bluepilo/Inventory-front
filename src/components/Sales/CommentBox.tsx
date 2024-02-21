import { useState } from "react";
import { TextAreaComment } from "../../styles/form.styles";
import { MainButton } from "../../styles/links.styles";

const CommentBox = ({ submit }: { submit: (arg: string) => void }) => {
	const [comment, setComment] = useState("");

	return (
		<TextAreaComment>
			<label>Provide a Comment:</label>
			<textarea
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			></textarea>
			<div className="btns">
				<MainButton onClick={() => submit(comment)}>Submit</MainButton>
			</div>
		</TextAreaComment>
	);
};

export default CommentBox;
