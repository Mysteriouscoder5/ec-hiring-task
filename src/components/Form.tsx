"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";

type Props = {
  type: "login" | "registration";
};

const Form = ({ type }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url =
        type === "login"
          ? "https://intern-task-api.bravo68web.workers.dev/auth/login"
          : "https://intern-task-api.bravo68web.workers.dev/auth/signup";

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        url,
        {
          email,
          password,
        },
        config
      );
      switch (type) {
        case "login":
          if (data?.token) {
            if (typeof window !== undefined) {
              localStorage.setItem("token", JSON.stringify(data?.token));
              setCookie("token", JSON.stringify(data?.token));
              router.push("/");
            }
          }
        case "registration":
          if (data?.data?.result === "OK") router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-white rounded-lg p-10 "
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-lg font-medium capitalize">
            Email :
          </label>
          <input
            type="text"
            className="bg-black border-2 border-white rounded-lg p-2 font-medium text-lg outline-none"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-lg font-medium capitalize">
            Password :
          </label>
          <input
            type="password"
            className="bg-black border-2 border-white rounded-lg p-2 font-medium text-lg outline-none"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {type === "registration" ? (
        <div className="mt-6">
          <Link
            href={"/login"}
            type="button"
            className="text-lg cursor-pointer"
          >
            Already registered ?{" "}
            <span className="text-orange-500 text-lg">Login</span>
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <Link
            href={"/registration"}
            type="button"
            className="text-lg cursor-pointer"
          >
            Not registered yet ?{" "}
            <span className="text-orange-500 text-lg">Sign up</span>
          </Link>
        </div>
      )}
      <button
        type="submit"
        className="text-xl capitalize font-semibold rounded-lg p-2 border-2 border-white w-full mt-16 bg-white text-black"
      >
        submit
      </button>
    </form>
  );
};

export default Form;
