import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth, db } from "../../config/firebase";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import Input from '@/components/inputs/Input';
import { AntDesign, Feather } from "@expo/vector-icons";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { doc, serverTimestamp, setDoc } from "firebase/firestore/lite";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues,
  });

  const [isOpen, setIsOpen] = useState(true);

  /**
   * populates a default user object in the 'user' collection
   * @param user firebase auth User object. Stores user email.
   */
  const createUserProfile = async (user:User) => {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      fullName: '',
      username: '', // Add username field
      email: user.email,
      year: 0,
      studentId: 0,
      program: '',
      orgsFollowed: [], // Initialize as an empty array
      createdAt: serverTimestamp(),
      excOf: [],
      friends: [],
      interests: [],
      registeredEvents: [],
      bookmarkedEvents: [],
    });
  }

  const onSubmit = async (values: FormValues) => {
    if (values.password === values.confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        await createUserProfile(user);
        router.replace("/onboarding/Step1");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords don't match.");
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
        bg-white
        px-8
        p-4"
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
        font-bold
      "
        >
          Sign Up
        </Text>
        <Input
          label="Email"
          placeholder="Enter email"
          control={control}
          name="email"
          rules={{ required: "Please enter an email" }}
          errors={errors}
        />
        <Input
          label="Password"
          placeholder="Enter password"
          control={control}
          name="password"
          secureTextEntry
          rules={{
            required: "Please enter a password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          errors={errors}
        />
        <Input
          label="Confirm Password"
          placeholder="Enter your password again"
          control={control}
          name="confirmPassword"
          secureTextEntry
          rules={{
            required: "Please confirm your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          errors={errors}
        />
        <Button
          variant="dark"
          label="Sign up"
          onPress={handleSubmit(onSubmit)}
          className="mt-4"
        />
        <Text className="mt-4">
          Already have an account?{" "}
          <Text
            className="text-gray-800 underline underline-offset-1"
            onPress={() => router.push("/auth/LogIn")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </Modal>
  );
};

export default SignUp;
