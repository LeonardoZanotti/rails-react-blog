import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/constants";
import { Post } from "../../interfaces/Post";
import { Link } from "react-router-dom";

function PostsList() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getPosts() {
			try {
				const response = await fetch(`${API_URL}/posts`);
				if (!response.ok) {
					throw new Error(
						`HTTP error! status: ${response.status} - ${response}`
					);
				}
				const data = await response.json();
				setPosts(data);
			} catch (error: any) {
				setError(error.message);
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		getPosts();
	}, []);

	return (
		<>
			<div>
				{!loading ? (
					posts.map((post: Post) => (
						<div key={post.id} className="post-container">
							<h2>
								<Link
									to={`/post/${post.id}`}
									className="post-title"
								>
									{post.title}
								</Link>
							</h2>
							<p>{post.body}</p>
						</div>
					))
				) : (
					<h2>Loading...</h2>
				)}
			</div>
		</>
	);
}

export default PostsList;
