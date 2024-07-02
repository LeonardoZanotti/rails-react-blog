import React from "react";
import { Route, Routes } from "react-router-dom";

import PostDetails from "../features/posts/PostDetails";
import PostsList from "../features/posts/PostsList";
import NewPostForm from "../features/posts/NewPostForm";
import EditPostForm from "../features/posts/EditPostForm";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<PostsList />} />
			<Route path="/post/:id" element={<PostDetails />} />
			<Route path="/new" element={<NewPostForm />} />
			<Route path="/edit/:id" element={<EditPostForm />} />
		</Routes>
	);
}

export default AppRoutes;
