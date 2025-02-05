import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>hi</h1>
      <Link href="/new">
        <p>Create new rabbit hole</p>
      </Link>
    </div>
  );
}
