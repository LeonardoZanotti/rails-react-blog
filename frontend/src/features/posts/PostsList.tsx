import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { Post } from "../../interfaces/Post";

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
				setLoading(false);
			} finally {
				setLoading(false);
			}
		}
		getPosts();
	}, []);

	return (
		<>
			<div>
				{posts.map((post: Post) => (
					<div key={post.id} className="post-container">
						<h2>{post.title}</h2>
						<p>{post.body}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default PostsList;
