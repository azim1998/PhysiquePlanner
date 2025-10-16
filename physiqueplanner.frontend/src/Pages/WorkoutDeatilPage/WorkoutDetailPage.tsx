import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Workout } from "../../Models/Workouts";
import {
  GetWorkoutAPI,
  RemoveExerciseFromWorkoutAPI,
} from "../../Services/WorkoutsService";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CloseButton,
  Grid,
  GridCol,
  Text,
  Tooltip,
} from "@mantine/core";
import exerciseImage from "../../Assets/dumbbell.png";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AddExerciseModal from "../../Components/AddExerciseModal/AddExerciseModal";
import { MdDelete } from "react-icons/md";
import RemoveItemModal from "../../Components/RemoveItemModal/RemoveItemModal";

interface Props {}

const WorkoutDetailPage = (props: Props) => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const [workout, setWorkout] = useState<Workout>();
  const [addExerciseModalOpened, addExerciseModalHandlers] =
    useDisclosure(false);
  const [removeExerciseModalOpened, removeExerciseModalHandlers] =
    useDisclosure(false);

  const fetchExercises = () => {
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
  };

  const removeExercise = (workoutId: string, exerciseId: string) => {
    RemoveExerciseFromWorkoutAPI(workoutId, exerciseId).then((response) => {
      if (response?.status === 200) {
        toast.success("Exercise successfully removed");
        fetchExercises();
      } else {
        toast.warn("Exercise could not be removed");
      }
    });

    removeExerciseModalHandlers.close();
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="mx-30 mt-10">
      <h1 className="font-bold text-4xl pb-2">{workout?.name}</h1>
      <p className="text-lg">{workout?.description}</p>
      <div>
        {workout?.workoutExercises.map((exercise, index) => (
          <Card
            key={exercise.exerciseId}
            shadow="md"
            padding="xl"
            radius="md"
            withBorder
            className="w-auto mb-5"
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

                <GridCol span="content">
                  <RemoveItemModal
                    opened={removeExerciseModalOpened}
                    close={removeExerciseModalHandlers.close}
                    onItemRemoveConfirmation={() =>
                      removeExercise(workoutId!, String(exercise.exerciseId))
                    }
                  />
                  <Tooltip label="Remove Exercise" color="gray">
                    <Button
                      variant="subtle"
                      color="gray"
                      onClick={removeExerciseModalHandlers.open}
                    >
                      <MdDelete size={20} />
                    </Button>
                  </Tooltip>
                </GridCol>
              </div>
            </Grid>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <AddExerciseModal
          workoutId={workout?.id!}
          opened={addExerciseModalOpened}
          close={addExerciseModalHandlers.close}
          onExerciseAdded={() => fetchExercises()}
        />
        <Button mt={10} onClick={addExerciseModalHandlers.open}>
          + Add Exercise
        </Button>
      </div>
    </div>
  );
};

export default WorkoutDetailPage;
