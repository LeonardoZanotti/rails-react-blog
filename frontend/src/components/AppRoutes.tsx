import React from "react";
import { Route, Routes } from "react-router-dom";

import PostDetails from "../features/posts/PostDetails";
import PostsList from "../features/posts/PostsList";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<PostsList />} />
			<Route path="/post/:id" element={<PostDetails />} />
			<Route path="/new" element={<h1>Nothing to see here yet</h1>} />
		</Routes>
	);
}

export default AppRoutes;
