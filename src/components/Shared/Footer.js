import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-6 mt-8 text-white bg-gray-800">
      <div className="container flex flex-col items-center justify-between mx-auto sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold">Capex Reservation</p>
          <p className="mt-1 text-gray-400">
            © {new Date().getFullYear()} Capex Reservation. All rights reserved.
          </p>
        </div>
        <nav className="mt-4 sm:mt-0">
          <ul className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <li>
              <Link href="/">
                <div className="hover:underline">Home</div>
              </Link>
            </li>
            <li>
              <Link href="/user">
                <div className="hover:underline">User Dashboard</div>
              </Link>
            </li>
            <li>
              <Link href="/admin">
                <div className="hover:underline">Admin Dashboard</div>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy">
                <div className="hover:underline">Privacy Policy</div>
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service">
                <div className="hover:underline">Terms of Service</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
