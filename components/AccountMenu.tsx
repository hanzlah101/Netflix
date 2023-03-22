import React from "react";
import { signOut } from "next-auth/react";

interface AccountMenuProps {
  visible?: boolean;
  name: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, name }) => {
  if (!visible) return null;

  return (
    <div className="w-56 bg-black absolute top-14 right-0 py-5 flex-col border border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/assets/profile.png"
            alt="profile_image"
          />

          <p className="text-sm group-hover/item:underline">{name}</p>
        </div>

        <hr className="h-px bg-gray-600 border-0 mt-3" />

        <div
          onClick={() => signOut()}
          className="flex mt-2 items-center justify-center text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
