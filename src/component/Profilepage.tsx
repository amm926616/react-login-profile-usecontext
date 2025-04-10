import {
  ArrowLeftOnRectangleIcon,
  EnvelopeIcon,
  UserCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import LoginForm from "./LoginForm";
import useUser from "../providers/UserProvider";
import useTheme from "../providers/ThemeProvider";
import { useEffect } from "react";

export default function ProfilePage() {
  const context = useUser();
  const { theme, changeTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = theme.colors.background;
      document.body.style.color = theme.colors.text;
    }
  }, [theme]);

  const handleLogin = (user: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    context.login(user);
  };

  const toggleTheme = () => {
    changeTheme(
      theme?.name === "light"
        ? {
            name: "dark",
            colors: {
              primary: "#0d6efd",
              secondary: "#adb5bd",
              background: "#212529",
              text: "#f8f9fa",
            },
          }
        : {
            name: "light",
            colors: {
              primary: "#007bff",
              secondary: "#6c757d",
              background: "#f8f9fa",
              text: "#212529",
            },
          },
    );
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors ${
        theme?.name === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className={`shadow rounded-lg overflow-hidden ${
            theme?.name === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`px-6 py-8 sm:px-10 sm:py-12 ${
              theme?.name === "dark" ? "bg-blue-700" : "bg-blue-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Profile Page</h1>
              <button
                onClick={toggleTheme}
                className={`text-sm font-semibold ${
                  theme?.name === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                } px-4 py-2 rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-${
                  theme?.name === "dark" ? "blue-500" : "blue-300"
                } focus:ring-offset-2`}
              >
                Toggle Theme
              </button>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10">
            {context?.user?.isLogin ? (
              <div
                className={`space-y-4 p-6 rounded-lg shadow-sm border ${
                  theme?.name === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="space-y-2">
                  <h3
                    className={`text-lg font-medium ${
                      theme?.name === "dark" ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    Profile Information
                  </h3>

                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {context.user.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {context.user.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {context.user.phoneNumber}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => context.logout()}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 ${
                    theme?.name === "dark"
                      ? "bg-red-700 hover:bg-red-600 text-gray-100"
                      : "bg-red-600 text-white hover:bg-red-700"
                  } px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <LoginForm onLogin={handleLogin} />
            )}

            <div className="flex justify-center py-12">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div
                    className={`h-4 rounded ${
                      theme?.name === "dark" ? "bg-gray-600" : "bg-gray-200"
                    } w-3/4`}
                  ></div>
                  <div className="space-y-2">
                    <div
                      className={`h-4 rounded ${
                        theme?.name === "dark" ? "bg-gray-600" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-4 rounded ${
                        theme?.name === "dark" ? "bg-gray-600" : "bg-gray-200"
                      } w-5/6`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
