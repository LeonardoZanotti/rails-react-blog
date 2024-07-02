import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../config/constants";
import { Post } from "../../interfaces/Post";

function PostDetails() {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams();

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

	let content = !loading ? (
		<div>
			<h2>{post?.title}</h2>
			<p>{post?.body}</p>
		</div>
	) : (
		<h2>Loading...</h2>
	);

	return <div>{content}</div>;
}

export default PostDetails;
