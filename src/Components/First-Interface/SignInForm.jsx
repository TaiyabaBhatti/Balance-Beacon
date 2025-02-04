import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import Button from "../Common Components/Button";
import { useForm } from "react-hook-form";
import app from "../../Configuration/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "./validatePassword";
import { NotificationPopup } from "../Noifications/NotificationPopup";
import {
  setDoc,
  doc,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import LoadingAnim from "../Common Components/LoadingAnim";
const auth = getAuth(app);
const db = getFirestore(app);

export default function SignInForm({ accountPage }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    validate,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  // No need for state management
  // const [user, setUser] = useState({
  // username:"",
  // password:"",
  // email:"",
  // confirmPassword:""
  // });

  // const inputHandler = (event) => {
  //     const {name,value} = event.target;
  //     setUser((prevData) => {
  //     return {...prevData,[name]:value}
  //     })
  //     }

  const signIn = async (data) => {
    const passwordError = validatePassword(data.password);
    console.log(passwordError);
    if (passwordError) {
      setError("password", { type: "manual", message: passwordError });
      return;
    }
    let user;
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential) {
        setLoading(false);

        user = userCredential.user;
        const userData = {
          username: data.username,
        };

        const docRef = doc(db, "Users", user.uid);
        const profileCollRef = collection(docRef, "profile");
        const response = await addDoc(profileCollRef, userData);

        NotificationPopup("Successfully Signed In", "success");
        console.log("Successfully signed in");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err.message);

      if (user) {
        await deleteUser(user);
      }

      if (err.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "Email is already in use.",
        });
      } else if (err.code === "auth/invalid-email") {
        setError("email", {
          type: "manual",
          message: "Invalid email address.",
        });
      } else {
        setError("general", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
      }

setLoading(false)

    }
  };

  return (
    <>
      <section className="relative">
        <div
          className={` ${
            loading ? "blur-sm" : ""
          }  w-[calc(100vh-150px)] md:w-[555px] m-auto relative rounded-2xl px-12 py-6   bg-opacity-25 flex flex-col bg-white  gap-y-8 `}
        >
          <div>
            <h1 className="font-semibold text-4xl text-center text-white">
              Sign Up
            </h1>
          </div>

          <form
            className="flex flex-col gap-y-2 "
            action="post"
            onSubmit={handleSubmit(signIn)}
          >
            {errors.general && (
              <p role="alert" className="text-red-500 text-xs">
                {errors.general.message}
              </p>
            )}

            <div className="flex flex-col gap-y-1 ">
              <label
                htmlFor="username"
                className=" font-medium text-xl text-white"
              >
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                aria-invalid={errors.username ? "true" : "false"}
                type="text"
                autoComplete="username"
                placeholder="Username123"
                id="username"
                className="outline-none rounded-2xl px-5 py-3"
              />
              {errors.username?.type === "required" && (
                <p role="alert" className="text-red-500 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1 ">
              <label htmlFor="email" className="font-medium text-xl text-white">
                Email
              </label>
              <input
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Email Address is required",
                })}
                type="email"
                autoComplete="email"
                placeholder="info@gmail.com"
                id="email"
                className="rounded-2xl px-5 py-3 outline-none"
              />
              {errors.email && (
                <p role="alert" className="text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1 ">
              <label
                htmlFor="password"
                className="font-medium text-xl text-white"
              >
                Password
              </label>
              <input
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                autoComplete="password"
                placeholder="Enter your password"
                id="password"
                className="outline-none rounded-2xl px-5 py-3"
              />
              {errors.password && (
                <p role="alert" className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="confirmPassword"
                className="font-medium text-xl text-white"
              >
                Confirm Password
              </label>
              <input
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                {...register("confirmPassword", {
                  required: "Confirm ypur password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                autoComplete="confirmPassword"
                placeholder="Re-enter your password"
                id="confirmPassword"
                className="outline-none rounded-2xl px-5 py-3"
              />
              {errors.confirmPassword && (
                <p role="alert" className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button text={"Sign Up"} type={"submit"} properties={"bg-light-purple text-greyish-purple"}/>
          </form>

          <span className="text-white  text-right font-medium text-sm ">
            Already have an account?{" "}
            <button className="font-bold" onClick={accountPage}>

              Login
            </button>
          </span>
        </div>

        {loading && <LoadingAnim />}
      </section>
    </>
  );
}
