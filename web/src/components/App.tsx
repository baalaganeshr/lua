// App.tsx
import {
	Router,
	Routes,
	Route,
	useNavigate,
	useLocation,
	HomePage,
	Images,
} from "./imports"; // These are just a bunch of imports that are used in the app.
// Found in the imports.ts file.

// This is a component that will be used to navigate between the pages.
const NavigationButtons: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const getButtonClass = (path: string) => {
		return location.pathname === path
			? "bg-blue-700 text-white p-2 rounded-lg"
			: "bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-lg";
	};

	return (
		<div className="absolute left-2 top-4 flex flex-col space-y-4">
			<button className={getButtonClass("/")} onClick={() => navigate("/")}>
				Home
			</button>
			<button
				className={getButtonClass("/images")}
				onClick={() => navigate("/images")}
			>
				Images
			</button>
		</div>
	);
};

// This is the main component that will be rendered.
const App: React.FC = () => {
	return (
		<Router>
			<div className="absolute left-[26%] top-[23%] w-[52%] h-[52%] bg-gray-500 border-[2px] border-black">
				<NavigationButtons />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/images" element={<Images />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
