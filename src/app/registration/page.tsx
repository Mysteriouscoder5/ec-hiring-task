import Form from "@/components/Form";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container h-svh grid place-content-center place-items-center">
      <div className="flex flex-col gap-10 justify-center items-center w-full">
        <h1 className="capitalize font-bold text-3xl">registration</h1>
        <Form type="registration" />
      </div>
    </div>
  );
};

export default page;
