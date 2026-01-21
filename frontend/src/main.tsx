import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { UserAuthProvider } from "./hooks/UserAuthProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserAuthProvider>
			<RouterProvider router={routes} />
		</UserAuthProvider>
	</StrictMode>
);
