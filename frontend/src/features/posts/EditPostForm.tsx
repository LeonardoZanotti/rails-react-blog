import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditPostForm.css";
import { Post } from "../../interfaces/Post";
import { fetchPostById } from "../../services/postService";
import PostForm from "./PostForm";

function EditPostForm() {
	const [post, setPost] = useState<Post>({ title: "", body: "", id: 0 });
	const [loading, setLoading] = useState(true);
	const { id } = useParams() as { id: string };

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await fetchPostById(id);
				setPost(data);
			} catch (error: any) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [id]);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<div className="editPostDiv">
			<PostForm post={post} isEditing={true} />
		</div>
	);
}

export default EditPostForm;
