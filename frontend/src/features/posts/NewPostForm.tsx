import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPostForm.css";
import { API_URL } from "../../config/constants";
import { createPost } from "../../services/postService";
import { Post } from "../../interfaces/Post";

function NewPostForm() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const postData: Post = { id: 0, title, body };

		createPost(postData).then((post) => {
			navigate(`/post/${post.id}`);
		});
	};

	return (
		<div className="newPostDiv">
			<h2>Create a new post</h2>
			<form className="newPostForm" onSubmit={handleSubmit}>
				<label htmlFor="titleInput" className="titleLabel">
					Title:
					<input
						id="titleInput"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<br />
				<label htmlFor="bodyInput" className="bodyLabel">
					Body:
					<textarea
						id="bodyInput"
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default NewPostForm;
