import React, { useEffect, useState } from "react";
import {
  GetAllExercisesAPI,
  GetExercisesByNameAPI,
} from "../../Services/Exercises/ExerciseService";
import { Exercise } from "../../Services/Exercises/Exercies";
import { toast } from "react-toastify";
import Card from "../../Components/Card/Card";
import "./ExercisesPage.css";
import Search from "../../Components/Search/Search";

interface Props {}

const ExercisesPage = (props: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    GetAllExercisesAPI()
      .then((response) => {
        if (response?.data) {
          setExercises(response.data);
        } else toast.warning("No exercises found");
      })
      .catch((e) => {
        toast.warning("Failed to get exercises");
      });
  }, []);

  const onSearchSubmit = (search: string) => {
    GetExercisesByNameAPI(search)
      .then((response) => {
        if (response?.data) {
          setExercises(response.data);
        } else {
          toast.warning("No exercises found");
        }
      })
      .catch((e) => {
        toast.warning("Failed to get exercises");
      });
  };

  return (
    <div className="mx-30 mt-10">
      <h1 className="text-center text-5xl font-semibold py-4">Exercises</h1>
      <Search searchExercise={onSearchSubmit} />
      <div className="card-container">
        {exercises.length > 0 ? (
          exercises.map((exercise) => <Card key={exercise.id} exercise={exercise} />)
        ) : (
          <h1 className="text-center text-5xl font-semibold pt-4">
            No Exercises Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;
