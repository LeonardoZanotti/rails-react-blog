import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Post List</Link>
				</li>
				<li>
					<Link to="/new">New Post</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
