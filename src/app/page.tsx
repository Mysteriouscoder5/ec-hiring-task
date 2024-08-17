import Header from "@/components/Header";
import Products from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Header />
      <Products />
    </main>
  );
}
