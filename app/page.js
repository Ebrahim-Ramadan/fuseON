import Image from "next/image";

export default async function Home() {
  const users = await fetch("http://localhost:3000/api/users");
  const data = await users.json();
console.log('data', data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     ass
    </main>
  );
}
