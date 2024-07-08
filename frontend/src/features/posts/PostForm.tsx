import React, { useState } from "react";
import { Post } from "../../interfaces/Post";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../services/postService";
import "./PostForm.css";

interface PostFormProps {
	post: null | Post;
	isEditing: boolean;
}

function PostForm({ post, isEditing }: PostFormProps) {
	const [formData, setFormData] = useState<Post>(
		post || { id: 0, title: "", body: "" }
	);
	const navigate = useNavigate();

	const sendPost = (data: Post) => {
		const { id } = data;

		const requestFunction = isEditing
			? updatePost(id.toString(), data)
			: createPost(data);

		requestFunction.then((res) => {
			navigate(`/post/${res.id}`);
		});
	};

	return (
		<div>
			<h2>{isEditing ? "Edit post" : "Create a new post"}</h2>
			<form
				className="postForm"
				onSubmit={(e) => {
					e.preventDefault();
					sendPost(formData);
				}}
			>
				<label htmlFor="titleInput" className="titleLabel">
					Title:
					<input
						id="titleInput"
						type="text"
						value={formData?.title}
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
				</label>
				<br />
				<label htmlFor="bodyInput" className="bodyLabel">
					Body:
					<textarea
						id="bodyInput"
						value={formData?.body}
						onChange={(e) =>
							setFormData({ ...formData, body: e.target.value })
						}
					/>
				</label>
				<br />
				<button type="submit">{isEditing ? "Edit" : "Create"}</button>
			</form>
		</div>
	);
}

export default PostForm;
