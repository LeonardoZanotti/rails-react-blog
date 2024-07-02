import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPostForm.css";
import { API_URL } from "../../config/constants";
import { Post } from "../../interfaces/Post";

function EditPostForm() {
	const [post, setPost] = useState<Post>({ title: "", body: "", id: 0 });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`${API_URL}/posts/${id}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setPost(data);
			} catch (error: any) {
				setError(error);
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [id]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const postData = { post };

		const response = await fetch(`${API_URL}/posts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});

		if (response.ok) {
			const { id } = await response.json();
			navigate(`/post/${id}`);
		} else {
			console.error(`Error editing post: ${response.status}`);
			alert("Failed to edit post. Please try again.");
		}
	};

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<div className="editPostDiv">
			<h2>Edit post</h2>
			<form className="editPostForm" onSubmit={handleSubmit}>
				<label htmlFor="titleInput" className="titleLabel">
					Title:
					<input
						id="titleInput"
						type="text"
						value={post?.title}
						onChange={(e) =>
							setPost({ ...post, title: e.target.value })
						}
					/>
				</label>
				<br />
				<label htmlFor="bodyInput" className="bodyLabel">
					Body:
					<textarea
						id="bodyInput"
						value={post?.body}
						onChange={(e) =>
							setPost({ ...post, body: e.target.value })
						}
					/>
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default EditPostForm;
