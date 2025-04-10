import { useState } from "react";
import useTheme from "../providers/ThemeProvider";

export default function LoginForm({
  onLogin,
}: {
  onLogin: (user: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!/^\+?\d{7,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      onLogin({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const inputClass = (error: string) =>
    `pl-3 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
      error
        ? "border-red-500"
        : theme?.name === "dark"
          ? "border-gray-600 bg-gray-700 text-gray-200"
          : "border-gray-300"
    }`;

  const labelClass = `block text-sm font-medium mb-1 ${
    theme?.name === "dark" ? "text-gray-400" : "text-gray-700"
  }`;

  return (
    <div
      className={`max-w-md mx-auto p-8 rounded-lg shadow-md border ${
        theme?.name === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-300"
          : "bg-white border-gray-100 text-gray-800"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          theme?.name === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass(errors.name)}
            placeholder="Enter your username"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass(errors.email)}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className={labelClass}>
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClass(errors.phoneNumber)}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass(errors.password)}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            theme?.name === "dark"
              ? "bg-indigo-700 text-gray-100 hover:bg-indigo-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
