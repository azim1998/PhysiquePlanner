import { Card, Group, Image, SimpleGrid, Switch } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  GetAllPublicWorkoutsAPI,
  GetWorkoutsByNameAPI,
} from "../../Services/WorkoutsService";
import { Workout } from "../../Models/Workouts";
import { toast } from "react-toastify";
import exerciseImage from "../../Assets/dumbbell.png";
import Search from "../../Components/Search/Search";
import { Text } from "@mantine/core";

interface Props {}

const WorkoutsPage = (props: Props) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    GetAllPublicWorkoutsAPI()
      .then((response) => {
        if (response?.data) {
          setWorkouts(response.data);
        } else {
          toast.warn("No workouts found");
        }
      })
      .catch((e) => {
        toast.warn("Failed to get workouts");
      });
  }, []);

  const onSearchSubmit = (search: string) => {
    GetWorkoutsByNameAPI(search)
      .then((response) => {
        if (response?.data) {
          setWorkouts(response.data);
        } else {
          toast.warning("No workouts found");
        }
      })
      .catch((e) => {
        toast.warn("Failed to get workouts");
      });
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-semibold py-4">Workouts</h1>
      <Search onSearch={onSearchSubmit} placeholder="Search Workouts" />
      <SimpleGrid cols={3} className="mx-30 mt-10">
        {workouts?.length > 0 ? (
          workouts.map((workout) => (
            <Card
              key={workout.name}
              shadow="md"
              padding="xl"
              radius="md"
              withBorder
              className="w-8/12"
            >
            <img
                src={exerciseImage}
                alt="workoutImage"
                className="w-auto h-auto object-contain"
              />
              
            <Text fw={500}>{workout.name}</Text>
            <Text size="sm" c="dimmed">
              {workout.description}
            </Text>
            </Card>
          ))
        ) : (
          <h1>No workouts found</h1>
        )}
      </SimpleGrid>
    </div>
  );
};

export default WorkoutsPage;
