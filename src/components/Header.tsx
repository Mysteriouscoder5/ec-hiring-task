"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { deleteCookie } from "cookies-next";

type Props = {};

const Header = (props: Props) => {
  const [user, setUser] = useState({ sub: "", iat: NaN, exp: NaN });
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let token = localStorage.getItem("token");
        let result = token?.replace(/"/g, "");
        const url = "https://intern-task-api.bravo68web.workers.dev/api/me";
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${result}`,
          },
        });
        setUser(data?.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="flex items-center justify-center gap-10">
      <p className="font-semibold text-xl">Logged in as {user?.sub}</p>
      <button
        type="submit"
        title="logout"
        onClick={() => {
          localStorage.removeItem("token");
          deleteCookie("token");
          router.push("/login");
        }}
      >
        <MdLogout className="size-6" />
      </button>
    </div>
  );
};

export default Header;
