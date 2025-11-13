import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetExerciseByIdAPI } from "../../Services/ExerciseService";
import { Exercise } from "../../Models/Exercies";
import { toast } from "react-toastify";
import exerciseImage from "../../Assets/dumbbell.png"

interface Props {}

const ExerciseDetailPage = (props: Props) => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState<Exercise>();

  useEffect(() => {
    console.log(exercise);
    GetExerciseByIdAPI(exerciseId!)
      .then((response) => {
        if (response) {
          setExercise(response.data!);
        } else {
          toast("Exercise could not be found");
        }
      })
      .catch((e) => {
        toast.warn("Failed to get exercise");
      });
  }, []);

  return (
    <div>
      <h1 className="font-bold text-4xl pb-2">{exercise?.name}</h1>
      <div className="flex items-start">
        {exercise?.muscles.map((muscle) => (
          <p key={muscle.id} className="text-lg border-transparent rounded-xl px-1 bg-gray-200 ">{muscle.name}</p>
        ))}
      </div>
      <h1 className="pt-4 text-2xl italic">Description</h1>
      <p className="text-lg">{exercise?.description}</p>
      <img className="w-1/2 border-2 rounded-3xl p-4 shadow-lg shadow-indigo-500/40" src={exerciseImage} alt="exercise"></img>
    </div>
  );
};

export default ExerciseDetailPage;
