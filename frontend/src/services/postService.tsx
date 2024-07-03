import React from "react";
import { API_URL } from "../config/constants";
import { Post } from "../interfaces/Post";

async function fetchAllPosts(): Promise<Post[]> {
	try {
		const response = await fetch(`${API_URL}/posts`);
		if (!response.ok) {
			throw new Error(
				`HTTP error! status: ${response.status} - ${response}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error: any) {
		throw new Error(`Error fetching posts: ${error.message}`);
	}
}

async function fetchPostById(id: string): Promise<Post> {
	try {
		const response = await fetch(`${API_URL}/posts/${id}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error: any) {
		throw new Error(`Error fetching post: ${error.message}`);
	}
}

async function createPost(postData: any) {}

async function updatePost(id: number, postData: any) {}

async function deletePost(id: number) {
	try {
		const response = await fetch(`${API_URL}/posts/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		if (response.status === 204) return null;
		return response.json();
	} catch (error: any) {
		throw new Error(`Error deleting post: ${error.message}`);
	}
}

export { fetchAllPosts, fetchPostById, deletePost };
