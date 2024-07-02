import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import NavBar from "./components/NavBar";

function App() {
	return (
		<Router>
			<div className="app">
				<h1>React on Rails blog</h1>
				<p>Find this application layout in frontend/src/app.tsx</p>
				<NavBar />
				<AppRoutes />
			</div>
		</Router>
	);
}

export default App;
