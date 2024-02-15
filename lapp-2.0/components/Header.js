"use client";

import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { PiSignOutFill } from "react-icons/pi";

function Header() {
  return (
    <div className="w-full h-20 bg-[#f7f6f3] flex flex-row justify-between items-center sticky top-0 z-40 border-solid border-b-[0.5px] border-b-[#00000054]">
      <div className="h-full ml-12 flex items-center hover:cursor-pointer">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
            className="object-contain w-auto h-auto"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-row items-center mr-8 gap-2 max-w-[310px]">
        <span
          onClick={() => signOut()}
          className="hover:cursor-pointer rounded-full p-2"
        >
          <PiSignOutFill size={27} color="#e7914e" />
        </span>
        <span>
          <Avatar
            src={"https://avatars.githubusercontent.com/u/46631807"}
            className="border border-solid border-[#d5d5d5]"
          />
        </span>

        <div className="hidden sm:block">
          <Typography className="text-[17px] font-medium" color={"#313131"}>
            Elvin Shahsuvarli
          </Typography>
          <Typography className="text-base font-medium text-ellipsis overflow-hidden whitespace-nowrap text-[#999998]">
            Senior Frontend Developer
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Header;
