import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" z-50 bg-white shadow-sm">
      <nav className="flex items-center justify-between p-6 bg-white max-w-7xl mx-auto w-full border-b border-gray-300">
        <Link href={"/"}>
          <h1 className="bold text-2xl font-extrabold">TriplanIQ</h1>
        </Link>
        <Link
          href="/triplaniq"
          className="bg-primary text-on-primary px-5 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors"
        >
          Plan your trip Now
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
