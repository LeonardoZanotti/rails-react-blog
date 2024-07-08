import React, { useEffect, useState } from "react";
import { Post } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import "./PostsList.css";
import {
	fetchAllPosts,
	deletePost as deletePostService,
} from "../../services/postService";

function PostsList() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPosts() {
			try {
				const data = await fetchAllPosts();
				setPosts(data);
			} catch (error: any) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		getPosts();
	}, []);

	const deletePost = async (id: number) => {
		if (confirm(`Are you sure you want to delete the post ${id}?`)) {
			await deletePostService(id).then(() => {
				setPosts(posts.filter((post: Post) => post.id !== id));
				console.log(`Deleted post with id: ${id}`);
				alert("Post deleted successfully.");
			});
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
							<div className="post-image-div">
								{post.image_url && (
									<img
										src={post?.image_url}
										alt={post.title}
										className="post-image"
									/>
								)}
							</div>
							<div className="post-links">
								<Link
									to={`/edit/${post.id}`}
									className="post-edit"
								>
									<button>Edit</button>
								</Link>
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
