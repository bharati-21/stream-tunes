import axios from "axios";

const signupService = (formData) => axios.post("/api/auth/signup", formData);

export { signupService };
