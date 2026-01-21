import { SigninForm } from "@/components/Authentication/LoginForm";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Signin = () => {
	const { loggedIn, role, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	if (loggedIn) {
		// Redirect to appropriate dashboard
		if (role === "doctor") {
			return <Navigate to="/Doctor_dashboard" replace />;
		} else if (role === "admin") {
			return <Navigate to="/admins_dashboard" replace />;
		} else {
			return <Navigate to="/dashboard" replace />;
		}
	}

	return (
		<div>
			<SigninForm />
		</div>
	);
};

export default Signin;
