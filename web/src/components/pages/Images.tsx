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
			<div className="absolute top-2 left-[27.1%] font-bold">
				<h1 className="text-center">
					Use the below input to paste a link to an image.
				</h1>
				<h2>The link can be anything, as long as it returns an image.</h2>
			</div>
			<img
				src={imageUrl}
				alt="Image from URL will be displayed here."
				className="w-auto h-[70%] absolute left-[30%] top-14"
			/>
			<div>
				<input
					type="text"
					value={imageUrl}
					onChange={handleInputChange}
					placeholder="Enter image URL"
					className="absolute left-[27%] bottom-[10%] border-[2px] border-black text-left w-[42%] h-[5%] p-3"
				/>
			</div>
		</>
	);
};

export default Images;
