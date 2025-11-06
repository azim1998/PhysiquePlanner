import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ExercisesPage from "../Pages/ExercisesPage/ExercisesPage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ExerciseDetailPage from "../Pages/ExerciseDetailPage/ExerciseDetailPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import WorkoutsPage from "../Pages/WorkoutsPage/WorkoutsPage";
import WorkoutDetailPage from "../Pages/WorkoutDeatilPage/WorkoutDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "exercises", element: <ExercisesPage /> },
      { path: "exercises/:exerciseId", element: <ExerciseDetailPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "workouts", element: <WorkoutsPage /> },
      { path: "workouts/:workoutId", element: <WorkoutDetailPage/>}
    ],
  },
]);
