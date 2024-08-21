import { cookies } from "next/headers";
import HomePage from "./_components/HomePage";
import { redirect } from "next/navigation";

export default function Home() {
  const jwtToken = cookies().get("token");
  const token = jwtToken?.value as string;

  if (!token) redirect("/login");

  return (
    <div className="w-full">
      <HomePage />
    </div>
  );
}
