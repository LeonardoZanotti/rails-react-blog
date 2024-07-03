import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPostForm.css";
import { API_URL } from "../../config/constants";
import { Post } from "../../interfaces/Post";
import { fetchPostById, updatePost } from "../../services/postService";

function EditPostForm() {
	const [post, setPost] = useState<Post>({ title: "", body: "", id: 0 });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams() as { id: string };
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await fetchPostById(id);
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

		updatePost(id, post).then((post) => {
			navigate(`/post/${post.id}`);
		});
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
