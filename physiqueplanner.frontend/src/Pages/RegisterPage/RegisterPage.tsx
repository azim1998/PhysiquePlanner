import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { Button, Card, TextInput, PasswordInput } from "@mantine/core";

interface RegisterFormInput {
  userName: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterFormInput>();
  const { registerUser } = useAuth();

  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    registerUser(data.userName, data.email, data.password);
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[400px]" shadow="sm" radius="md" withBorder>
        <h1 className="text-center text-4xl font-semibold mb-6">Create Account</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Username"
            placeholder="Enter username"
            {...register("userName")}
            required
          />

          <TextInput
            label="Email"
            placeholder="Enter email"
            {...register("email")}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            {...register("password")}
            required
          />

          <Button type="submit" radius="md" variant="outline" color="black">
            Register
          </Button>
        </form>

        <div className="flex justify-center mt-4 text-sm">
          <span>Already have an account?</span>
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
