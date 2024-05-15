import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import axios from "axios";

const CustomNavbar = () => {
  const router = useRouter();
  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <Navbar color="light" light expand="md">
      <Link href="/" passHref>
        <NavLink>Home</NavLink>
      </Link>
      <Nav className="ml-auto" navbar>
        {isLoggedIn && isAdmin && (
          <NavItem>
            <Link href="/admin-dashboard" passHref>
              <NavLink>Admin Dashboard</NavLink>
            </Link>
          </NavItem>
        )}
        {isLoggedIn && !isAdmin && (
          <NavItem>
            <Link href="/client-dashboard" passHref>
              <NavLink>Client Dashboard</NavLink>
            </Link>
          </NavItem>
        )}
        {!isLoggedIn && (
          <NavItem>
            <Link href="/login" passHref>
              <NavLink>Login</NavLink>
            </Link>
          </NavItem>
        )}
        {isLoggedIn && (
          <NavItem>
            <Button color="link" onClick={handleLogout}>
              Logout
            </Button>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
