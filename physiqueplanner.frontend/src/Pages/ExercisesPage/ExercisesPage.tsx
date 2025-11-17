import React, { useEffect, useState } from "react";
import {
  GetAllExercisesAPI,
  GetExercisesByNameAPI,
} from "../../Services/ExerciseService";
import { Exercise } from "../../Models/Exercies";
import { toast } from "react-toastify";
import "./ExercisesPage.css";
import Search from "../../Components/Search/Search";
import { Card, SimpleGrid, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import exerciseImage from "../../Assets/dumbbell.png";
import { LuFileSearch } from "react-icons/lu";
import PageLoader from "../../Components/PageLoader/PageLoader";

interface Props {}

const ExercisesPage = (props: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    GetAllExercisesAPI()
      .then((response) => {
        if (response?.success && response?.data) {
          setExercises(response.data);
          setIsLoading(false);
        } else {
          toast.warning("No exercises found");
          setExercises([])
          setIsLoading(false);
        }
      })
      .catch((e) => {
        toast.warning("Failed to get exercises");
        setExercises([])
        setIsLoading(false);
      });
  }, []);

  const onSearchSubmit = (search: string) => {
    GetExercisesByNameAPI(search)
      .then((response) => {
        if (response?.success && response?.data) {
          setExercises(response.data);
          setIsLoading(false);
        } else {
          toast.warning("No exercises found");
          setExercises([])
          setIsLoading(false);
        }
      })
      .catch((e) => {
        toast.warning("Failed to get exercises");
        setExercises([])
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-semibold pb-3">Exercises</h1>
      <Search onSearch={onSearchSubmit} placeholder="Search Exercise" />
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {exercises.length > 0 ? (
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing="xl"
              className="mt-4 px-4 max-w-5xl text-center mx-auto"
            >
              {exercises.map((exercise) => (
                <Card
                  key={exercise.id}
                  shadow="md"
                  padding="xl"
                  radius="md"
                  withBorder
                  className=""
                >
                  <Card.Section>
                    <Link to={`/exercises/${exercise.id}`}>
                      <img
                        src={exerciseImage}
                        alt="workoutImage"
                        className="max-h-48 w-auto object-contain block mx-auto"
                      />
                    </Link>
                  </Card.Section>
                  <Text fw={500}>{exercise.name}</Text>
                  <Text size="sm" c="dimmed">
                    {exercise.description}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 mx-auto">
              <LuFileSearch size={60} className="mb-2 text-gray-500" />
              <h1 className="font-bold text-xl">No exercises found</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExercisesPage;
