// App.tsx
import {
	React,
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
		<div>
			<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/images")}>Images</button>
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
