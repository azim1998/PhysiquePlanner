import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Workout } from "../../Models/Workouts";
import { GetWorkoutAPI } from "../../Services/WorkoutsService";
import { toast } from "react-toastify";
import { Box, Card, Grid, GridCol, Paper, Text } from "@mantine/core";
import exerciseImage from "../../Assets/dumbbell.png";
import { Link } from "react-router-dom";

interface Props {}

const WorkoutDetailPage = (props: Props) => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    GetWorkoutAPI(workoutId!)
      .then((response) => {
        if (response?.data) {
          console.log(response.data);
          setWorkout(response.data);
        } else {
          toast.warn("No workout found");
        }
      })
      .catch((e) => {
        toast.warn("Failed to get workout");
      });
  }, []);

  return (
    <div className="mx-30 mt-10">
      <h1 className="font-bold text-4xl pb-2">{workout?.name}</h1>
      <p className="text-lg">{workout?.description}</p>
      <div>
        {workout?.workoutExercises.map((exercise, index) => (
          <Card
            key={workout.name}
            shadow="md"
            padding="xl"
            radius="md"
            withBorder
            className="w-auto"
          >
            <Grid gutter={30} className="flex flex-row items-center">
              <div className="flex items-center">
                <Grid.Col span="content" className="border-r border-gray-300 ">
                  <Text c="dimmed">Exercise {index + 1}</Text>
                  <Text size="lg" fw={500}>
                    {exercise.exerciseName}
                  </Text>
                  <Text td="line-through">Equipment: Add this??</Text>
                  <Link to={`/exercises/${exercise.exerciseId}`}>
                    <Text td="underline" fs="italic">
                      View Details
                    </Text>
                  </Link>
                </Grid.Col>

                <Grid.Col span="content">
                  <Link to={`/exercises/${exercise.exerciseId}`}>
                    <img
                      src={exerciseImage}
                      alt="workoutImage"
                      className="w-32 h-32 object-contain"
                    />
                  </Link>
                </Grid.Col>
              </div>

              <div className="flex ml-auto ">
                <GridCol
                  span="content"
                  className="flex flex-col items-center justify-center border-r border-gray-300"
                >
                  <Text fw={700} size="xl">
                    {exercise.sets}
                  </Text>
                  <Text size="md" c="dimmed">
                    SETS
                  </Text>
                </GridCol>

                <GridCol
                  span="content"
                  className="flex flex-col items-center justify-center border-r border-gray-300"
                >
                  <Text fw={700} size="xl">
                    {exercise.reps}
                  </Text>
                  <Text size="md" c="dimmed">
                    REPS
                  </Text>
                </GridCol>

                <GridCol
                  span="content"
                  className="flex flex-col items-center justify-center"
                >
                  <Text fw={700} size="xl">
                    Add this?
                  </Text>
                  <Text size="md" c="dimmed">
                    REST
                  </Text>
                </GridCol>
              </div>

              {/* <GridCol span="content">
                <Paper
                  withBorder
                  shadow="none"
                  radius="lg"
                  bg="#e7e7e7"
                  w="fit-content"
                  px="5"
                  py="1"
                >
                  <Text fw={500} size="sm">
                    {`${exercise.sets} sets x ${exercise.reps} reps`}
                  </Text>
                </Paper>
              </GridCol> */}
            </Grid>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetailPage;
