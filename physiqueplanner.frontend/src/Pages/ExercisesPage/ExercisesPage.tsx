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
    <div>
      <h1 className="text-center text-5xl font-semibold">Exercises</h1>
      <Search onSearch={onSearchSubmit} placeholder="Search Exercise" />
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing="xl"
        className="mt-4 px-4 max-w-5xl text-center mx-auto"
      >
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
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
          ))
        ) : (
          <h1 className="text-center text-5xl font-semibold pt-4">
            No Exercises Found
          </h1>
        )}
      </SimpleGrid>
    </div>
  );
};

export default ExercisesPage;
