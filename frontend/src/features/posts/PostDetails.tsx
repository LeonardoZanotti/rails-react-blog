import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../config/constants";
import { Post } from "../../interfaces/Post";
import "./PostDetails.css";
import {
	fetchPostById,
	deletePost as deletePostService,
} from "../../services/postService";

function PostDetails() {
	const [post, setPost] = useState<Post>({
		id: 0,
		title: "",
		body: "",
	});
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

	const deletePost = async (id: number) => {
		if (confirm(`Are you sure you want to delete the post ${id}?`)) {
			await deletePostService(id).then(() => {
				navigate(`/`);
				console.log(`Deleted post with id: ${id}`);
				alert("Post deleted successfully.");
			});
		}
	};

	let content = !loading ? (
		<div className="post-container">
			<h2>{post?.title}</h2>
			<p>{post?.body}</p>
			<div className="post-links">
				<Link to={`/edit/${post.id}`} className="post-edit">
					<button>Edit</button>
				</Link>
				<button onClick={() => deletePost(post?.id)}>Delete</button>
			</div>
		</div>
	) : (
		<h2 className="loading">Loading...</h2>
	);

	return <div>{content}</div>;
}

export default PostDetails;
