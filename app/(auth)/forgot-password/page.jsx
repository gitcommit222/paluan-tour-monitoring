"use client";
import { forgotPasswordSchema } from "@/lib/formSchema";
import { logo } from "@/public";
import { Button, FloatingLabel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useForgotPassword } from "@/hooks/useAuth";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const { mutateAsync: forgotPassword, isLoading } = useForgotPassword();

  const onSubmit = async (data) => {
    try {
      await toast.promise(forgotPassword({ email: data.email }), {
        loading: "Sending reset link...",
        success: "Password reset link has been sent to your email",
        error: "Failed to send reset link. Please try again.",
      });
    } catch (error) {
      setError("root", {
        message: "Failed to send reset link. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen backdrop-blur-md">
      <div className="w-[400px] shadow-md rounded-lg p-5 bg-gray-800">
        <div className="flex items-center justify-center mb-5">
          <Image src={logo} height={150} width={200} alt="logo" />
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FloatingLabel
              variant="standard"
              label="Email"
              type="email"
              className={`text-white ${
                errors.email && "text-red-500 border-red-500"
              }`}
              autoComplete="off"
              name="email"
              {...register("email")}
              helperText={errors.email && errors.email.message}
            />
          </div>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
          <div className="space-y-2">
            <Button
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
            <div className="w-full">
              <p className="text-white text-[14px]">
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-500 hover:underline text-[14px] hover:text-primary text-end"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
