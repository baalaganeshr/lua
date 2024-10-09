// App.tsx
import {
	Router,
	Routes,
	Route,
	useNavigate,
	HomePage,
	Images,
} from "./imports";
const NavigationButtons: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="absolute left-2 top-4 flex flex-col space-y-4">
			<button
				className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-lg"
				onClick={() => navigate("/")}
			>
				Home
			</button>
			<button
				className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-lg"
				onClick={() => navigate("/images")}
			>
				Images
			</button>
		</div>
	);
};

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
