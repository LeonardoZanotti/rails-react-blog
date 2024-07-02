import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/constants";
import { Post } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import "./PostsList.css";

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

	const deletePost = async (id: number) => {
		if (confirm(`Are you sure you want to delete the post ${id}?`)) {
			await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" }).then(
				(response) => {
					if (response.ok) {
						setPosts(posts.filter((post: Post) => post.id !== id));
						console.log(`Deleted post with id: ${id}`);
						alert("Post deleted successfully.");
					} else {
						throw response;
					}
				}
			);
		}
	};

	return (
		<>
			<div className="posts-container">
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
							<div className="post-links">
								<button>
									<Link
										to={`/edit/${post.id}`}
										className="post-edit"
									>
										Edit
									</Link>
								</button>
								<button onClick={() => deletePost(post.id)}>
									Delete
								</button>
							</div>
						</div>
					))
				) : (
					<h2 className="loading">Loading...</h2>
				)}
			</div>
		</>
	);
}

export default PostsList;
