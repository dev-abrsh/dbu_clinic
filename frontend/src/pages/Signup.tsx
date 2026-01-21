import { SignupForm } from "@/components/Authentication/SignupForm";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Signup = () => {
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
			<SignupForm />
		</div>
	);
};

export default Signup;
