import { useEffect, useState } from "react";
import { VscGithubInverted, VscEye, VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { IoAlertCircle } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { getSession, signIn } from "next-auth/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loader from "@/components/Loader";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function Auth() {
  const [variant, setVariant] = useState("login");
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);

  const { query } = useRouter();
  const { isLoading } = useCurrentUser();

  const validationSchema = yup.object().shape({
    name:
      variant === "register"
        ? yup
            .string()
            .min(3, "Name must contain atleast 3 characters")
            .required("Name is required")
        : yup.string(),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const { values, handleBlur, errors, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },

      validationSchema,

      onSubmit: async (values, { setSubmitting, resetForm }) => {
        const login = async () => {
          try {
            setActive(true);
            await signIn("credentials", {
              email: values.email,
              password: values.password,
              callbackUrl: "/profiles",
            });
          } catch (error) {
            setSubmitting(false);
            resetForm();
            return console.log(error);
          }
        };

        const register = async () => {
          try {
            setActive(true);
            await axios.post("/api/register", values);
            await login();
          } catch (error) {
            setSubmitting(false);
            resetForm();
            return toast.error(error.response.data.error);
          }
        };

        variant === "login" && (await login());
        variant === "register" && (await register());
        setActive(false);
      },
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-[url(/assets/hero.jpg)] h-full bg-fixed relative bg-cover bg-no-repeat">
          <div className="absolute w-full h-full bg-black md:bg-opacity-50">
            <nav className="px-12 pt-5 pb-2">
              <img className="h-12" src="/assets/logo.png" alt="netflix_logo" />
            </nav>

            <div className="flex justify-center">
              <div className="self-center w-full px-16 bg-black rounded-lg md:px-12 py-7 bg-opacity-70 md:max-w-md">
                <h2 className="mb-3 text-3xl font-semibold">
                  {variant === "login" ? "Sign In" : "Register"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="w-full">
                    {query?.error && (
                      <span className="border flex items-center justify-center text-sm px-4 border-red-700 py-1">
                        <BsDot className="text-3xl" /> {query?.error}
                      </span>
                    )}
                  </div>

                  {variant === "register" && (
                    <div className="relative">
                      <input
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="name"
                        type="text"
                        name="name"
                        className="inputStyles peer"
                        placeholder=" "
                      />

                      <label htmlFor="name" className="inputLabel">
                        Username
                      </label>

                      {errors.name && touched.name && (
                        <p className="mt-1 ml-0.5 flex items-center gap-1 text-xs text-red-700">
                          <IoAlertCircle className="text-[1rem]" />{" "}
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="relative">
                    <input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="email"
                      type="email"
                      name="email"
                      className="inputStyles peer"
                      placeholder=" "
                    />

                    <label htmlFor="email" className="inputLabel">
                      Email
                    </label>

                    {errors.email && touched.email && (
                      <p className="mt-1 ml-0.5 flex items-center gap-1 text-xs text-red-700">
                        <IoAlertCircle className="text-[1rem]" /> {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="password"
                      name="password"
                      className="inputStyles peer"
                      type={show ? "text" : "password"}
                      placeholder=" "
                    />

                    <label htmlFor="password" className="inputLabel">
                      Password
                    </label>

                    <div
                      onClick={() => setShow(!show)}
                      className="absolute top-3 right-3 p-1.5 cursor-pointer text-[1.2rem] transition-all rounded-full hover:bg-gray-400/50"
                    >
                      {show ? <VscEyeClosed /> : <VscEye />}
                    </div>

                    {errors.password && touched.password && (
                      <p className="mt-1 ml-0.5 flex items-center gap-1 text-xs text-red-700">
                        <IoAlertCircle className="text-[1rem]" />{" "}
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={active}
                    className="w-full py-3 mt-5 bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-900 disabled:bg-opacity-60 disabled:cursor-wait"
                  >
                    {variant === "login" ? "Login" : "Create"}
                  </button>
                  <fieldset className="mx-1 mt-4 border-t border-slate-300">
                    <legend className="px-4 mx-auto text-xs text-white">
                      OR
                    </legend>
                  </fieldset>
                  <div className="flex items-center justify-center gap-6 mb-2 text-2xl transition hover:opacity-80">
                    <div
                      onClick={() =>
                        signIn("google", { callbackUrl: "/profiles" })
                      }
                      className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer"
                    >
                      <FcGoogle />
                    </div>

                    <div
                      onClick={() =>
                        signIn("github", { callbackUrl: "/profiles" })
                      }
                      className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80 text-zinc-900"
                    >
                      <VscGithubInverted />
                    </div>
                  </div>
                  <p className="text-center text-neutral-500 text-[1rem]">
                    {variant === "login"
                      ? "First time using Netflix?"
                      : "Already have an account?"}

                    <span
                      onClick={() =>
                        setVariant(variant === "login" ? "register" : "login")
                      }
                      className="ml-1 text-white cursor-pointer hover:underline"
                    >
                      {variant === "login" ? "Create an account" : "Login here"}
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <Toaster position="bottom-center" />
        </div>
      )}
    </>
  );
}

export default Auth;
