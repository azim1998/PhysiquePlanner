import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserAPI } from "../../Services/AccountsService";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

interface Props {}

interface RegisterFormInput {
  userName: string;
  email: string;
  password: string;
}

const RegisterPage = (props: Props) => {
  const { register, handleSubmit } = useForm<RegisterFormInput>();
  const { user, registerUser } = useAuth();
  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    registerUser(data.userName, data.email, data.password);
  };

  return (
    <div>
      <div className="flex justify-center mt-10">
        <div className="border p-6 w-fit rounded shadow-md bg-white">
          <h1 className="text-center text-5xl font-semibold py-4">
            Register Page
          </h1>
          <form
            className="flex flex-col gap-3 mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="border rounded-lg pl-2"
              {...register("userName")}
              placeholder="User Name"
            />
            <input
              className="border rounded-lg pl-2"
              {...register("email")}
              placeholder="Email Address"
            />
            <input
              className="border rounded-lg pl-2"
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <input
              className="text-white text-center w-max mx-auto border-2 rounded-lg px-3 py-1.25 bg-gradient-to-r from-slate-900 to-slate-700 transition duration-300 hover:text-black"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex gap-1 border p-6 w-fit rounded shadow-md bg-white">
          <div>Already have an account?</div>
          <Link className="text-blue-700 hover:underline " to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
