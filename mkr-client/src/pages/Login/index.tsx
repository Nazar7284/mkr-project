import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createUser, loginUser } from "src/api/auth";
import DynamicForm, {
  FieldConfig,
} from "src/components/DynamicForm/DynamicForm";
import Header from "src/components/Header/Header";
import useModal from "src/hooks/useModal";
import LoginModal from "src/ui/LoginModal";
import * as Yup from "yup";

const Auth = () => {
  const loginModal = useModal();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("userId", data);
      window.location.reload();
    },
    onError: (error) => {
      console.error("Error during login:", error);
      alert("Login failed, please try again");
    },
  });

  const registrateMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      localStorage.setItem("userId", data);
      window.location.reload();
    },
    onError: (error) => {
      console.error("Error during login:", error);
      alert("Login failed, please try again");
    },
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="ml-16 flex h-full min-h-screen w-full flex-1 items-center justify-center bg-slate-600 px-14 py-8 text-white">
      <LoginModal {...loginModal} onComplete={() => {}} />
      <div
        className={`transform-style-preserve-3d relative transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className={`backface-hidden absolute inset-0 flex items-center justify-center rounded-lg shadow-lg`}
        >
          <LoginCard
            handleFlip={handleFlip}
            onComplete={loginMutation.mutate}
          />
        </div>
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 flex transform items-center justify-center rounded-lg shadow-lg`}
        >
          <SignUpCard
            handleFlip={handleFlip}
            onComplete={registrateMutation.mutate}
          />
        </div>
      </div>
    </div>
  );
};

const LoginCard = ({
  handleFlip,
  onComplete,
}: {
  handleFlip: () => void;
  onComplete: any;
}) => {
  const fields: FieldConfig[] = [
    {
      name: "userName",
      label: "Username",
      initialValue: "",
      color: "white",
      validation: Yup.string()
        .required("Username is required")
        .min(2, "Minimum 2 characters"),
    },
    {
      name: "password",
      label: "Password",
      initialValue: "",
      color: "white",
      type: "password",
      validation: Yup.string()
        .required("Password is required")
        .min(2, "Minimum 2 characters"),
    },
  ];

  const handleSubmitForm = async (formData: any) => {
    onComplete(formData);
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-lg font-semibold">Login</h2>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleFlip}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          &larr; Sign up
        </button>
      </div>
      <DynamicForm fields={fields} onSubmit={handleSubmitForm} />
    </div>
  );
};

const SignUpCard = ({
  handleFlip,
  onComplete,
}: {
  handleFlip: () => void;
  onComplete: any;
}) => {
  const fields: FieldConfig[] = [
    {
      name: "RegisterUserName",
      label: "Username",
      initialValue: "",
      color: "white",
      validation: Yup.string()
        .required("Username is required")
        .min(2, "Minimum 2 characters"),
    },
    {
      name: "RegisterPassword",
      label: "Password",
      initialValue: "",
      color: "white",
      type: "password",
      validation: Yup.string()
        .required("Password is required")
        .min(2, "Minimum 2 characters"),
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      initialValue: "",
      color: "white",
      type: "password",
      validation: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    },
  ];

  const handleSubmitForm = async (formData: any) => {
    console.log(formData);
    const { userName, password } = formData;
    onComplete({ userName, password });
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-lg font-semibold">Sign Up</h2>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleFlip}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Login &rarr;
        </button>
      </div>
      <DynamicForm fields={fields} onSubmit={handleSubmitForm} />
    </div>
  );
};

export default Auth;
