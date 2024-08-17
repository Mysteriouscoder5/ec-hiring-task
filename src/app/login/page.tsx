"use client";
import Form from "@/components/Form";
import axios from "axios";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "https://intern-task-api.bravo68web.workers.dev/auth/login";
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        url,
        {
          email,
          password,
        },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container h-svh grid place-content-center place-items-center">
      <div className="flex flex-col gap-10 justify-center items-center w-full">
        <h1 className="capitalize font-bold text-3xl">login</h1>
        <Form type="login" />
        {/* <form
          onSubmit={handleSubmit}
          className="border-2 border-white rounded-lg p-10"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-md font-medium capitalize">
                Email :
              </label>
              <input
                type="text"
                className="bg-black border-2 border-white rounded-lg p-2 font-medium text-lg placeholder:opacity-25 outline-none"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-md font-medium capitalize"
              >
                Password :
              </label>
              <input
                type="password"
                className="bg-black border-2 border-white rounded-lg p-2 font-medium text-lg placeholder:opacity-25 outline-none"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-xl capitalize font-semibold rounded-lg p-2 border-2 border-white w-full mt-16 bg-white text-black"
          >
            submit
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Page;
