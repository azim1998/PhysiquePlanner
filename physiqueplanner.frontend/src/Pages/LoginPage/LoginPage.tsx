import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { Button, Card, TextInput, PasswordInput } from "@mantine/core";

interface LoginFormInput {
  userName: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const { loginUser } = useAuth();

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    loginUser(data.userName, data.password);
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[400px]" shadow="sm" radius="md" withBorder>
        <h1 className="text-center text-4xl font-semibold mb-6">Sign In</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Username"
            placeholder="Enter username"
            {...register("userName")}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            {...register("password")}
            required
          />

          <Button type="submit" radius="md" variant="outline" color="black">
            Sign In
          </Button>
        </form>

        <div className="flex justify-center mt-4 text-sm">
          <span>New to PhysiquePlanner?</span>
          <Link to="/register" className="text-blue-600 ml-1 hover:underline">
            Create an account
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
