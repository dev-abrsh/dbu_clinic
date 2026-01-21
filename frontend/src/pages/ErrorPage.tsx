import Navbar from "@/components/Header/Navbar";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<>
			<Navbar />
			<div className="p-20 font-[poppins]">
				<h1 className="text-4xl font-bold">Oops</h1>
				<p className="mt-4 text-xl  font-semibold opacity-50">
					{isRouteErrorResponse(error)
						? "This page doesn't exist"
						: "Sorry an unexpected error occurred"}
				</p>
			</div>
		</>
	);
};

export default ErrorPage;
