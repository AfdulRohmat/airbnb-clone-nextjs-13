"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { toast } from "react-hot-toast";

interface RegisterModalProps {}

const RegisterModal: React.FC<RegisterModalProps> = (props) => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle Submit Register
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onToggle = useCallback(() => {
    registerModal.onClose();
  }, [registerModal]);

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
        {/* Input email */}
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        {/* Input nama */}
        <Input
          id="name"
          label="name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        {/* Input password */}
        <Input
          id="password"
          label="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="password"
        />
      </div>
    </>
  );

  const footerContent = (
    <>
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        {/* Login with Google */}
        <Button
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => {}}
        />

        {/* Login with Github */}
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => {}}
        />

        {/* Go to Login */}
        <div className="text-neutral-500 text-center mt-4 font-light">
          <p>
            Already have an account ?{" "}
            <span
              onClick={() => onToggle()}
              className="text-neutral-800 cursor-pointer hover:underline font-semibold"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
