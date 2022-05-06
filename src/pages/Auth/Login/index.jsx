import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "../auth.css";
import { loginService } from "services/";
import { useToast } from "custom-hooks/useToast";
import { useAuth } from "contexts/";

const Login = () => {
	const initialFormData = {
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const { authDispatch, isAuth } = useAuth();
	const { showToast } = useToast();

	useEffect(() => {
		if (isAuth) {
			navigate(-1);
		}
	}, []);

	const handleFormDataChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const showPasswordIcon = showPassword ? (
		<VisibilityOffIcon />
	) : (
		<VisibilityIcon />
	);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await loginService(formData);
			showToast("Login successfull.", "success");
			const { encodedToken, foundUser } = data;
			authDispatch({
				action: {
					type: "INIT_AUTH",
					payload: { authUser: foundUser, authToken: encodedToken },
				},
			});
			localStorage.setItem("stream-tunes-token", encodedToken);
			localStorage.setItem(
				"stream-tunes-user",
				JSON.stringify(foundUser)
			);

			setFormData(initialFormData);
			navigate(location?.state?.from ?? -1);
            
		} catch (error) {
			showToast("Login Failed. Please try again later", "error");
		}
	};

	const { email, password } = formData;
	const handleChangePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleLoginWithTestCredentials = (event) => {
		setFormData({
			email: "adarshbalika@gmail.com",
			password: "adarshBalika123",
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
								/>
								Remember me
							</label>
							<div className="btn btn-link btn-primary btn-forgot-psd text-sm">
								Forgot password?
							</div>
						</div>
						<div className="auth-button-container mt-1 flex-col flex-align-center">
							<div className="login-button-container flex-col flex-align-center flex-justify-center">
								<input
									type="submit"
									className={`btn btn-primary btn-full-width px-0-75 py-0-25 btn-full-width text-sm flex-wrap`}
									value="Login"
								/>
								<input
									type="submit"
									className={`btn btn-primary btn-outline btn-full-width px-0-75 py-0-25 btn-full-width flex-wrap text-sm`}
									value="Login with Test Credentials"
									onClick={handleLoginWithTestCredentials}
								/>
							</div>
							<Link
								to="/signup"
								className={`btn btn-link btn-primary mt-0-75 flex-row flex-justify-center flex-align-center text-sm btn-new-account`}
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
