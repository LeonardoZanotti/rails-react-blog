import "./NewPostForm.css";
import PostForm from "./PostForm";

function NewPostForm() {
	return (
		<div className="newPostDiv">
			<PostForm post={null} isEditing={false} />
		</div>
	);
}

export default NewPostForm;
