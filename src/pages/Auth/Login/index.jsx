import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "../auth.css";
import { loginService } from "services/";
import { useToast, useDocumentTitle } from "custom-hooks";
import { useAuth } from "contexts/";

const Login = () => {
	const initialFormData = {
		email: "",
		password: "",
		rememberMe: false,
	};

	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const { authDispatch, isAuth, authLoading } = useAuth();
	const { showToast } = useToast();

	const setDocumentTitle = useDocumentTitle();

	useEffect(() => {
		if (isAuth) {
			navigate(-1, { replace: true });
		}
		setDocumentTitle("StreamTunes | Login");
	}, []);

	const handleFormDataChange = (event) => {
		const { name, value, checked } = event.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: name === "rememberMe" ? checked : value,
		}));
	};

	const showPasswordIcon = showPassword ? (
		<VisibilityOffIcon />
	) : (
		<VisibilityIcon />
	);

	const handleFormSubmit = async (event) => {
		setIsLoggingIn(true);
		event.preventDefault();
		try {
			const { data } = await loginService(formData);

			const { encodedToken, foundUser } = data;
			setDocumentTitle;
			authDispatch({
				action: {
					type: "SET_AUTH_LOADING",
					payload: { authLoading: true },
				},
			});

			authDispatch({
				action: {
					type: "INIT_AUTH",
					payload: { authUser: foundUser, authToken: encodedToken },
				},
			});
			if (rememberMe) {
				localStorage.setItem("stream-tunes-token", encodedToken);
				localStorage.setItem(
					"stream-tunes-user",
					JSON.stringify(foundUser)
				);
			}

			setFormData(initialFormData);
			showToast("Login successfull.", "success");
			authDispatch({
				action: {
					type: "SET_AUTH_LOADING",
					payload: { authLoading: false },
				},
			});
			navigate(location?.state?.from ?? -1);
		} catch (error) {
			setIsLoggingIn(false);
			if (error.message.includes("404"))
				showToast("Username not found!", "error");
			else showToast("Login Failed. Please try again later", "error");
		}
	};

	const { email, password, rememberMe } = formData;
	const handleChangePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleLoginWithTestCredentials = (event) => {
		setFormData({
			email: process.env.REACT_APP_GUEST_USER_EMAIL,
			password: process.env.REACT_APP_GUEST_USER_PASSWORD,
			rememberMe: true,
		});
	};

	return (
		<section className="main auth-main flex-col flex-align-center flex-justify-center mx-auto py-2 px-3">
			<div className="auth-wrapper">
				<section className="auth-container login-container mx-auto mb-1 px-1-5 py-2">
					<h3 className="text-center text-uppercase auth-head mb-1">
						Login
					</h3>
					<form
						className="auth-form px-1 flex-col flex-align-center flex-justify-center"
						onSubmit={handleFormSubmit}
					>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-login-email"
							>
								Email
								<input
									type="email"
									name="email"
									id="input-login-email"
									className="input-text text-sm px-0-75 py-0-25 mt-0-25"
									placeholder="janedoe@gmail.com"
									value={email}
									disabled={isLoggingIn}
									onChange={handleFormDataChange}
									required
								/>
							</label>
							<span className="text-message mt-0-5"></span>
						</div>
						<div className="input-group input-default mt-1-5 mb-1 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto text-sm"
								htmlFor="input-login-psd"
							>
								Password
								<span className="password-input-toggler">
									<input
										type={`${
											showPassword ? "text" : "password"
										}`}
										id="input-login-psd"
										disabled={isLoggingIn}
										className="input-text px-0-75 py-0-25 mt-0-25 text-sm"
										placeholder="********"
										name="password"
										value={password}
										onChange={handleFormDataChange}
										autoComplete="off"
										required
									/>
									<button
										type="button"
										className={`btn btn-icon icon-show-psd`}
										onClick={handleChangePasswordVisibility}
										disabled={isLoggingIn}
									>
										<span className="icon mui-icon">
											{showPasswordIcon}
										</span>
									</button>
								</span>
							</label>
							<span className="text-message mt-0-5"></span>
						</div>
						<div className="psd-mgmt-container mt-2 flex-row flex-align-center flex-justify-between flex-wrap">
							<label
								htmlFor="checkbox-remember"
								className="flex-row input-checkbox-remember flex-align-center text-sm"
							>
								<input
									type="checkbox"
									className="input-checkbox text-reg"
									id="checkbox-remember"
									checked={rememberMe}
									disabled={isLoggingIn}
									name="rememberMe"
									onChange={handleFormDataChange}
								/>
								Remember me
							</label>
						</div>
						<div className="auth-button-container mt-1 flex-col flex-align-center">
							<div className="login-button-container flex-col flex-align-center flex-justify-center">
								<input
									type="submit"
									className={`btn btn-primary btn-full-width px-0-75 py-0-25 btn-full-width text-sm flex-wrap ${
										isLoggingIn ? "btn-disabled" : ""
									}`}
									disabled={isLoggingIn}
									value="Login"
								/>
								<input
									type="submit"
									className={`btn-primary btn-outline btn-full-width px-0-75 py-0-25 btn-full-width flex-wrap btn-test-login text-sm ${
										isLoggingIn ? "btn btn-disabled" : "btn"
									}`}
									value="Login with Test Credentials"
									disabled={isLoggingIn}
									onClick={handleLoginWithTestCredentials}
								/>
							</div>
							<Link
								to="/signup"
								className={`btn-link btn-primary mt-0-75 flex-row flex-justify-center flex-align-center text-sm btn-new-account ${
									isLoggingIn ? "btn link-disabled" : "btn"
								}`}
							>
								Create a new account
								<span className="icon mui-icon icon-chevron-right">
									<ChevronRightIcon />
								</span>
							</Link>
						</div>
					</form>
				</section>
			</div>
		</section>
	);
};

export { Login };
