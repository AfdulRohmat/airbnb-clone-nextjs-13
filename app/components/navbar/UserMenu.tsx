"use client";
import React, { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import LoginModal from "../modals/LoginModal";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // Open Rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal, useRentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* TITLE */}
        <div
          onClick={() => {onRent()}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-200 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        {/* MENU */}
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2border-[1px]  border-neutral-200  flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <div className="hidden md:block mr-3">
            <Avatar src={currentUser?.image} />
          </div>
          <AiOutlineMenu />
        </div>
      </div>

      {/* TOGGLE MENU */}
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white verflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="My Trips" onCLick={() => {}} />
                <MenuItem label="My favorites" onCLick={() => {}} />
                <MenuItem label="My reservations" onCLick={() => {}} />
                <MenuItem label="My properties" onCLick={() => {}} />
                <MenuItem label="Airbnb your home" onCLick={() => {rentModal.onOpen()}} />
                <hr />
                <MenuItem label="Logout" onCLick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onCLick={() => {
                    loginModal.onOpen();
                  }}
                />
                <MenuItem
                  label="Sign Up"
                  onCLick={() => {
                    loginModal.onOpen();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
