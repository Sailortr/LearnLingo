import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import login from "../../assets/login.svg";
import AuthModal from "../Auth/AuthModal";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openModal = (mode) => {
    setAuthMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const isAuthenticated = !!currentUser;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-[20px] font-bold text-gray-900">
              <img src={Logo} alt="LearnLingo logo" className="h-133 w-28" />
            </Link>
          </div>

          <nav className="flex items-center">
            <ul className="flex items-center gap-[28px] list-none">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => navStyle(isActive)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teachers"
                  className={({ isActive }) => navStyle(isActive)}
                >
                  Teachers
                </NavLink>
              </li>
              {isAuthenticated && (
                <li>
                  <NavLink
                    to="/favorites"
                    className={({ isActive }) => navStyle(isActive)}
                  >
                    Favorites
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center">
            {isAuthenticated ? (
              <ul className="flex items-center gap-[16px] list-none">
                <li>
                  <a
                    onClick={handleLogout}
                    className="flex items-center gap-4 text-sm text-gray-800 hover:text-[#9FB7CE] transition font-medium cursor-pointer text-[16px] font-bold" // gap-16, gap-4 olarak düzeltildi
                  >
                    <img src={login} alt="Logout icon" className="h-5 w-5" />
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="flex items-center gap-[16px] list-none">
                <li>
                  <a
                    onClick={() => openModal("login")}
                    className="flex items-center gap-4 text-sm text-gray-800 hover:text-[#9FB7CE] transition font-medium cursor-pointer text-[16px] font-bold" // gap-16, gap-4 olarak düzeltildi
                  >
                    <img src={login} alt="Login icon" className="h-5 w-5" />
                    <span>Log in</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => openModal("register")}
                    className="w-[166px] h-[48px] px-[44px]
             flex items-center justify-center 
             bg-[#9FB7CE] 
             text-white text-base font-bold leading-6 
             rounded-[12px] 
             border-none outline-none ring-0 
             hover:bg-[#b1c8dc] transition-colors duration-200"
                  >
                    Registration
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={authMode}
        onFormSubmitSuccess={() => {
          closeModal();
        }}
      />
    </header>
  );
};

const navStyle = (isActive) =>
  `text-base font-semibold pb-1 border-b-2 transition duration-150 ${
    isActive
      ? "text-[#9FB7CE] border-[#9FB7CE]"
      : "text-gray-800 border-transparent hover:text-[#9FB7CE] hover:border-[#9FB7CE]"
  }`;

export default Header;
