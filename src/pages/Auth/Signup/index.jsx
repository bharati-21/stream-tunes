import { Link, useNavigate } from "react-router-dom";
import { React, useEffect, useReducer, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { signupService } from "services/";
import { useToast, useDocumentTitle } from "custom-hooks";
import { useAuth } from "contexts/";
import "../auth.css";
import { isFormDataValid } from "utils";

const Signup = () => {
	const initialFormData = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const initialErrorState = {
		firstNameError: null,
		lastNameError: null,
		passwordError: null,
		confirmPasswordError: null,
	};

	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSigningUp, setIsSigningUp] = useState(false);
	const [error, setError] = useState(null);

	const errorReducer = (state, { type, payload: { error, errorValue } }) => {
		switch (type) {
			case "RESET_ERROR_STATES":
				return { ...initialErrorState };
			case "SET_ERROR":
				return { ...state, [error]: errorValue };
		}
	};

	const [formDataError, setFormDataError] = useReducer(
		errorReducer,
		initialErrorState
	);

	const navigate = useNavigate();

	const { showToast } = useToast();
	const { authDispatch, isAuth } = useAuth();

	const setDocumentTitle = useDocumentTitle();
	useEffect(() => {
		if (isAuth) {
			navigate(-1, { replace: true });
		}
		setDocumentTitle("StreamTunes | Signup");
	}, []);

	const handleFormDataChange = (event) => {
		const { name, value } = event.target;
		if (formDataError[name + "Error"]) {
			setFormDataError({
				type: "SET_ERROR",
				payload: { error: name + "Error", errorValue: null },
			});
		}
		if (error) {
			setError(null);
		}
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const showPasswordIcon = showPassword ? (
		<VisibilityOffIcon />
	) : (
		<VisibilityIcon />
	);
	const showConfirmPasswordIcon = showConfirmPassword ? (
		<VisibilityOffIcon />
	) : (
		<VisibilityIcon />
	);

	const { firstName, lastName, email, password, confirmPassword } = formData;

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (
			!isFormDataValid(
				firstName,
				lastName,
				password,
				confirmPassword,
				setFormDataError,
				setError
			)
		) {
			return;
		}
		setIsSigningUp(true);

		try {
			const { data } = await signupService(formData);
			const { encodedToken, createdUser } = data;
			authDispatch({
				action: {
					type: "INIT_AUTH",
					payload: { authUser: createdUser, authToken: encodedToken },
				},
			});

			setFormData(initialFormData);
			showToast("Sign up successful!", "success");

			navigate(-1);
		} catch (error) {
			setIsSigningUp(false);
			if (error.message.includes("422")) {
				showToast("Email already registered.", "error");
			} else
				showToast("Sign up failed. Please try again later.", "error");
		}
	};

	const handleChangePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);
	const handleChangeConfirmPasswordVisibility = () =>
		setShowConfirmPassword(
			(prevShowConfirmPassword) => !prevShowConfirmPassword
		);

	const {
		firstNameError,
		lastNameError,
		passwordError,
		confirmPasswordError,
	} = formDataError;

	return (
		<section className="auth-main flex-col flex-align-center flex-justify-center mx-auto py-2 px-3">
			<div className="auth-wrapper">
				<article className="auth-container signup-container mx-auto mb-1 px-1-5 py-2">
					<h3 className="text-center text-uppercase auth-head mb-2">
						Sign Up
					</h3>
					<form
						className="auth-form px-1"
						onSubmit={handleFormSubmit}
					>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-signup-fname"
							>
								First Name
								<input
									type="text"
									id="input-signup-fname"
									className="input-text text-sm px-0-75 py-0-25 mt-0-25"
									placeholder="Jane"
									name="firstName"
									disabled={isSigningUp}
									onChange={handleFormDataChange}
									value={firstName}
									required
								/>
							</label>
							{firstNameError && (
								<span className="my-0-25 error-color text-red-500 text-xs">
									{firstNameError}
								</span>
							)}
						</div>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-signup-lname"
							>
								Last Name
								<input
									type="text"
									id="input-signup-lname"
									className="input-text text-sm px-0-75 py-0-25 mt-0-25"
									placeholder="Doe"
									name="lastName"
									disabled={isSigningUp}
									onChange={handleFormDataChange}
									value={lastName}
									required
								/>
							</label>
							{lastNameError && (
								<span className="error-color text-red-500 text-xs">
									{lastNameError}
								</span>
							)}
						</div>
						<div className="input-group input-default mt-1-5 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto"
								htmlFor="input-login-email"
							>
								Email
								<input
									type="email"
									id="input-login-email"
									className="input-text text-sm px-0-75 py-0-25 mt-0-25"
									placeholder="janedoe@example.com"
									name="email"
									disabled={isSigningUp}
									onChange={handleFormDataChange}
									value={email}
									required
								/>
							</label>
						</div>
						<div className="input-group input-default mt-1-5 mb-1 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto text-sm"
								htmlFor="input-psd"
							>
								Password
								<span className="password-input-toggler">
									<input
										type={`${
											showPassword ? "text" : "password"
										}`}
										id="input-psd"
										className="input-text px-0-75 py-0-25 mt-0-25 text-sm"
										placeholder="********"
										autoComplete="off"
										name="password"
										onChange={handleFormDataChange}
										value={password}
										disabled={isSigningUp}
										required
									/>
									<button
										type="button"
										className={`btn btn-icon icon-show-psd`}
										onClick={handleChangePasswordVisibility}
										disabled={isSigningUp}
									>
										<span className="icon mui-icon">
											{showPasswordIcon}
										</span>
									</button>
								</span>
							</label>
							{passwordError && (
								<span className="error-color text-red-500 text-xs">
									{passwordError}
								</span>
							)}
						</div>
						<div className="input-group input-default mt-1-5 mb-1 mx-auto">
							<label
								className="text-label text-reg flex-col mx-auto text-sm"
								htmlFor="input-psd"
							>
								Confirm Password
								<span className="password-input-toggler">
									<input
										type={`${
											showConfirmPassword
												? "text"
												: "password"
										}`}
										id="input-confirm-psd"
										className="input-text px-0-75 py-0-25 mt-0-25 text-sm"
										placeholder="********"
										autoComplete="off"
										name="confirmPassword"
										onChange={handleFormDataChange}
										value={confirmPassword}
										required
										disabled={isSigningUp}
									/>
									<button
										type="button"
										className={`btn btn-icon icon-show-psd`}
										onClick={
											handleChangeConfirmPasswordVisibility
										}
										disabled={isSigningUp}
									>
										<span className="icon mui-icon">
											{showConfirmPasswordIcon}
										</span>
									</button>
								</span>
							</label>
							{confirmPassword && (
								<span className="error-color text-red-500 text-xs">
									{confirmPasswordError}
								</span>
							)}
						</div>
						{error ? (
							<div className="my-2 error-color">{error}</div>
						) : null}
						<div className="psd-mgmt-container mt-2 flex-row flex-align-center flex-justify-between flex-wrap">
							<label
								htmlFor="checkbox-remember"
								className="flex-row input-checkbox-remember flex-align-center text-sm"
							>
								<input
									type="checkbox"
									className="input-checkbox text-reg"
									id="checkbox-remember"
									required
									disabled={isSigningUp}
								/>
								I accept terms and conditions
							</label>
						</div>

						<div className="auth-button-container mt-1 flex-col flex-align-center">
							<input
								type="submit"
								value="Sign Up"
								disabled={isSigningUp}
								className={`btn btn-primary px-0-75 text-sm py-0-25 btn-full-width`}
							/>
							<Link
								to="/login"
								className={`btn btn-primary mt-0-75 text-sm btn-existing-account ${
									isSigningUp
										? "btn-link link-disabked"
										: "btn-link"
								}`}
							>
								Already have an account? Login
								<span className="icon mui-icon icon-chevron-right">
									<ChevronRightIcon />
								</span>
							</Link>
						</div>
					</form>
				</article>
			</div>
		</section>
	);
};

export { Signup };
