interface Props {
	title: string;
	num: number;
}

const Card = ({ title, num }: Props) => {
	return (
		<div className="flex flex-col place-items-center justify-center w-full">
			<div className="mb-5 bg-blue-50 flex flex-row w-full max-w-xs h-fit justify-center gap-4 md:gap-12 p-6 md:p-10 border rounded-2xl md:shadow-xl">
				<div className="text-center">
					<h5 className="text-lg md:text-xl text-blue-600 mb-2">{title}</h5>
					<p className="text-3xl md:text-4xl font-bold text-gray-700">{num}</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
