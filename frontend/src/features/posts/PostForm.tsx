import React, { useState } from "react";
import { Post } from "../../interfaces/Post";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../services/postService";
import "./PostForm.css";

interface PostFormProps {
	post: null | Post;
	isEditing: boolean;
}

interface PostFormRawData {
	id?: number;
	title: string;
	body: string;
	image?: File;
	image_url?: string;
}

function PostForm({ post, isEditing }: PostFormProps) {
	const [rawData, setRawData] = useState<PostFormRawData>(
		post || { title: "", body: "" }
	);
	const navigate = useNavigate();

	const sendPost = (rawData: any) => {
		const { id } = rawData;

		const formData = new FormData();
		formData.append("post[title]", rawData.title);
		formData.append("post[body]", rawData.body);

		// keep old image when updating but not selecting a new image
		if (!id || (id && rawData.image)) {
			formData.append("post[image]", rawData.image);
		}

		const requestFunction = isEditing
			? updatePost(id.toString(), formData)
			: createPost(formData);

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
					sendPost(rawData);
				}}
			>
				<label htmlFor="titleInput" className="titleLabel">
					Title:
					<input
						id="titleInput"
						type="text"
						value={rawData?.title}
						onChange={(e) =>
							setRawData({ ...rawData, title: e.target.value })
						}
					/>
				</label>
				<br />
				<label htmlFor="image" className="titleLabel">
					Image:
					<input
						id="imageInput"
						type="file"
						name="image"
						accept="image/*"
						onChange={(e) => {
							if (e.target?.files) {
								setRawData({
									...rawData,
									image: e.target.files[0],
								});
								console.log(e.target.files[0]);
							}
						}}
					/>
				</label>
				{rawData.image_url && (
					<img
						src={rawData?.image_url}
						alt={rawData.title}
						className="post-image"
					/>
				)}
				<br />
				<label htmlFor="bodyInput" className="bodyLabel">
					Body:
					<textarea
						id="bodyInput"
						value={rawData?.body}
						onChange={(e) =>
							setRawData({ ...rawData, body: e.target.value })
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
