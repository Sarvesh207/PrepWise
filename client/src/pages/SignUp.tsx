import React from "react";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="flex h-[700px] w-full">
      {/* Left Image */}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* Form Section */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-white font-medium">Sign up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Create an account to get started
          </p>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* FIRST NAME */}
          <div className="w-full">
            <div
              className={`flex items-center bg-transparent border 
              ${errors.firstName ? "border-red-400" : "border-gray-300/60"} 
              h-12 rounded-full overflow-hidden pl-6 gap-2`}
            >
              <input
                type="text"
                placeholder="First Name"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* LAST NAME */}
          <div className="w-full mt-4">
            <div
              className={`flex items-center bg-transparent border 
              ${errors.lastName ? "border-red-400" : "border-gray-300/60"} 
              h-12 rounded-full overflow-hidden pl-6 gap-2`}
            >
              <input
                type="text"
                placeholder="Last Name"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="w-full mt-6">
            <div
              className={`flex items-center bg-transparent border 
              ${errors.email ? "border-red-400" : "border-gray-300/60"} 
              h-12 rounded-full overflow-hidden pl-6 gap-2`}
            >
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>

              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="w-full mt-6">
            <div
              className={`flex items-center bg-transparent border 
              ${errors.password ? "border-red-400" : "border-gray-300/60"} 
              h-12 rounded-full overflow-hidden pl-6 gap-2`}
            >
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>

              <input
                type="password"
                placeholder="Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message: "Must contain 1 uppercase & 1 number",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <a className="text-indigo-400 hover:underline" href="#">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
