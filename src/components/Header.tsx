"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

type Props = {};

const Header = (props: Props) => {
  const [user, setUser] = useState({ sub: "", iat: NaN, exp: NaN });
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
  return <div className="font-semibold text-xl">Logged in as {user?.sub}</div>;
};

export default Header;
