// app/auth/LogIn.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../config/firebase";
import Input from "../../components/inputs/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
};

const LogIn = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log(user);
      // redirecting logic managed in /app/_layout.tsx
    } catch (error) {
      console.log("Unable to log in.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
        router.replace("/auth");
      }}
    >
      <View
        className="
        flex-1 
        justify-center 
        items-center 
        bg-white p-4"
      >
        <TouchableOpacity
          onPress={() => {
            setIsOpen(false);
            router.replace("/auth");
          }}
          className="absolute top-40 right-8"
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text
          className="
            text-2xl 
            font-bold"
        >
          Log In
        </Text>
        <Input
          label="Email"
          placeholder="Enter email"
          control={control}
          name="email"
          rules={{ required: "Please enter a valid email" }}
          errors={errors}
        />
        <Input
          label="Password"
          placeholder="Enter password"
          control={control}
          name="password"
          secureTextEntry
          rules={{ required: "Please enter a valid email" }}
          errors={errors}
        />
        <Button
          variant="dark"
          label="Log in"
          className="mt-4"
          onPress={handleSubmit(onSubmit)}
        />
        <Text className="mt-4">
          First time using clubhub?{" "}
          <Text
            className="text-gray-800 underline underline-offset-1"
            onPress={() => router.push("/auth/SignUp")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </Modal>
  );
};

export default LogIn;
