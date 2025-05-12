import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ExercisesPage from "../Pages/ExercisesPage/ExercisesPage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import IndividualExercisePage from "../Pages/IndividualExercisePage/IndividualExercisePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "exercises", element: <ExercisesPage /> },
      { path: "exercises/:exerciseId", element: <IndividualExercisePage /> }
    ],
  },
]);
