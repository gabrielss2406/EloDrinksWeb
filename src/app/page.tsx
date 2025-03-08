"use client";

import dynamic from "next/dynamic";

const UserList = dynamic(() => import("@/components/UserList"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserList />
    </div>
  );
}
