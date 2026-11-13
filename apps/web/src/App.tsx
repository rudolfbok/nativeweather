import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import TOSPage from "./pages/TOS";
import PolicyPage from "./pages/Policy";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/tos" element={<TOSPage />} />
			<Route path="/policy" element={<PolicyPage />} />
		</Routes>
	);
};

export default App;
