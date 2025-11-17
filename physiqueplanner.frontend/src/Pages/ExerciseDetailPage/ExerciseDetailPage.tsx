import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetExerciseByIdAPI } from "../../Services/ExerciseService";
import { Exercise } from "../../Models/Exercies";
import { toast } from "react-toastify";
import exerciseImage from "../../Assets/dumbbell.png";
import PageLoader from "../../Components/PageLoader/PageLoader";
import { LuFileSearch } from "react-icons/lu";

interface Props {}

const ExerciseDetailPage = (props: Props) => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState<Exercise>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    GetExerciseByIdAPI(exerciseId!)
      .then((response) => {
        if (response) {
          setExercise(response.data!);
          setIsLoading(false);
        } else {
          toast("Exercise could not be found");
          setIsLoading(false);
        }
      })
      .catch((e) => {
        toast.warn("Failed to get exercise");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {exercise ? (
            <div>
              <h1 className="font-bold text-4xl pb-2">{exercise?.name}</h1>
              <div className="flex items-start">
                {exercise?.muscles.map((muscle) => (
                  <p
                    key={muscle.id}
                    className="text-lg border-transparent rounded-xl px-1 bg-gray-200 mr-3"
                  >
                    {muscle.name}
                  </p>
                ))}
              </div>
              <h1 className="pt-4 text-2xl italic">Description</h1>
              <p className="text-lg">{exercise?.description}</p>
              <img
                className="w-1/2 border-2 rounded-3xl p-4 shadow-lg shadow-indigo-500/40"
                src={exerciseImage}
                alt="exercise"
              ></img>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 mx-auto">
              <LuFileSearch size={60} className="mb-2 text-gray-500" />
              <h1 className="font-bold text-xl">Exercise could not be found</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExerciseDetailPage;
