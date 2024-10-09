import { useState } from "react";

const Images = () => {
	const [imageUrl, setImageUrl] = useState(
		"https://r2.fivemanage.com/pub/earoojlnb06p.png"
	);

	const handleInputChange = (event: any) => {
		setImageUrl(event.target.value);
	};
	return (
		<>
			<img
				src={imageUrl}
				alt="Image from URL will be displayed here."
				className="w-[25%] h-[25%] border-0 absolute left-[38%] top-[40%] cursor-default"
			/>
			<div>
				<input
					type="text"
					value={imageUrl}
					onChange={handleInputChange}
					placeholder="Enter image URL"
					className="absolute left-[35%] top-[70%] w-[30%] h-[5%] border-[2px] border-black"
				/>
			</div>
		</>
	);
};

export default Images;
