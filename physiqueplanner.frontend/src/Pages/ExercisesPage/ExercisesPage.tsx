import React, { useEffect, useState } from "react";
import { GetAllExercisesAPI } from "../../Services/Exercises/ExerciseService";
import { Exercise } from "../../Services/Exercises/Exercies";
import { toast } from "react-toastify";
import Card from "../../Components/Card/Card";
import "./ExercisesPage.css";

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

  return (
    <div>
      <h2>These are the exercises:</h2>
      <div className="card-container">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <Card exercise={exercise} />
          ))
        ) : (
          <p>No Exercises Found</p>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;
