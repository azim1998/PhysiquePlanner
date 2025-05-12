import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetExerciseByIdAPI } from "../../Services/Exercises/ExerciseService";
import { Exercise } from "../../Services/Exercises/Exercies";
import { toast } from "react-toastify";

interface Props {}

const IndividualExercisePage = (props: Props) => {
  const { exerciseId } = useParams()
  const [exercise, setExercise] = useState<Exercise>()

  useEffect(() => {
    console.log("exerciseId:",{exerciseId})
    GetExerciseByIdAPI(exerciseId!)
    .then((response) => {
        if (response) {
            setExercise(response.data);
        } else {
            toast("Exercise could not be found");
        }
    })
    .catch((e) => {
        toast.warn("Failed to get exercise")
    })
  },[])

  return <div>{exercise?.name}</div>;
};

export default IndividualExercisePage;
