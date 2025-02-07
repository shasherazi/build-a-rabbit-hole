"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/action";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const [userProfilePicture, setUserProfilePicture] = useState("/user.svg");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.user_metadata?.avatar_url) {
        setUserProfilePicture(user.user_metadata.avatar_url);
      }
    };

    fetchUser();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        if (session.user.user_metadata?.avatar_url) {
          setUserProfilePicture(session.user.user_metadata.avatar_url);
        }
      } else {
        setUserProfilePicture("/user.svg");
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/rabbithole.png"
              alt="rabbithole logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">
              Rabbithole
            </span>
          </Link>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/rabbitholes" className="ml-4">
              <Button>See your rabbitholes</Button>
            </Link>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 rounded-full">
                    <Image
                      src={userProfilePicture}
                      alt="User profile"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                      priority
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => signout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  <Image
                    src={userProfilePicture}
                    alt="User profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full mr-2"
                    priority
                  />
                  <span>User Profile</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/rabbitholes"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              See your rabbitholes
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
