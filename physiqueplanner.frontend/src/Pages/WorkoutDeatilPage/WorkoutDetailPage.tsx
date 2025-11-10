import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ExerciseSelectionDto,
  Workout,
  WorkoutUpdateDto,
} from "../../Models/Workouts";
import {
  GetWorkoutAPI,
  PartiallyUpdateWorkoutAPI,
  RemoveExerciseFromWorkoutAPI,
  ShareWorkoutAPI,
} from "../../Services/WorkoutsService";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Grid,
  GridCol,
  Switch,
  Text,
  Tooltip,
} from "@mantine/core";
import exerciseImage from "../../Assets/dumbbell.png";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AddExerciseModal from "../../Components/AddExerciseModal/AddExerciseModal";
import { MdDelete } from "react-icons/md";
import { FaShareFromSquare  } from "react-icons/fa6";
import RemoveItemModal from "../../Components/RemoveItemModal/RemoveItemModal";
import { WorkoutExercise } from "../../Models/WorkoutExercise";
import ExerciseInput from "../../Components/ExerciseInput/ExerciseInput";
import EditableText from "../../Components/EditableText/EditableText";

interface Props {}

const WorkoutDetailPage = (props: Props) => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const [workout, setWorkout] = useState<Workout>();
  const [isPrivate, setIsPrivate] = useState<boolean | undefined>(
    workout?.isPrivate
  );
  const [addExerciseModalOpened, addExerciseModalHandlers] =
    useDisclosure(false);
  const [removeExerciseModalOpened, removeExerciseModalHandlers] =
    useDisclosure(false);

  const fetchExercises = () => {
    GetWorkoutAPI(workoutId!)
      .then((response) => {
        if (response?.success && response.data) {
          console.log(response.data);
          setWorkout(response.data);
        } else {
          toast.warn(response?.message);
        }
      })
      .catch((e) => {
        toast.warn("Failed to get workout");
      });
  };

  const partiallyUpdateWorkout = (updatedWorkout: WorkoutUpdateDto) => {
    PartiallyUpdateWorkoutAPI(workoutId!, updatedWorkout).then((response) => {
      if (response?.success && response.data) {
        toast.success(response.message);
        setWorkout(response.data);
      } else {
        toast.warn("Workout could not be updated");
      }
    });
  }

  const removeExercise = (workoutId: string, exerciseId: string) => {
    RemoveExerciseFromWorkoutAPI(workoutId, exerciseId).then((response) => {
      if (response?.success) {
        toast.success(response.message);
        fetchExercises();
      } else {
        toast.warn("Exercise could not be removed");
      }
    });

    removeExerciseModalHandlers.close();
  };

  const handleExerciseChange = (targetExercise: WorkoutExercise) => {
    const updatedWorkout: WorkoutUpdateDto = {
      workoutExercises: [
        {
          exerciseId: targetExercise.exerciseId,
          reps: targetExercise.reps,
          sets: targetExercise.sets,
        },
      ],
    };

    partiallyUpdateWorkout(updatedWorkout);
  };

  const handleNameChange = (newName: string) => {
    const updatedWorkout: WorkoutUpdateDto = {
      name: newName
    }

    partiallyUpdateWorkout(updatedWorkout);
  }

  const handleDescriptionChange = (newDesc: string) => {
    const updatedWorkout: WorkoutUpdateDto = {
      description: newDesc
    }

    partiallyUpdateWorkout(updatedWorkout)
  }

  const handleVisibilityChange = (newVisibility: boolean) => {
    setIsPrivate(newVisibility);

    const updatedWorkout: WorkoutUpdateDto = {
      isPrivate: newVisibility,
    };

    partiallyUpdateWorkout(updatedWorkout);
  };

  const handleShareWorkout = () => {
    ShareWorkoutAPI(workoutId!).then((response) => {
      if (response?.success) {
        toast.success("Workout shared successfully")
      } else {
        toast.warn("Workout could not be shared")
      }
    })
  }
  
  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    if (workout) {
      setIsPrivate(workout.isPrivate);
    }
  }, [workout]);

  return (
    <div className="mx-30 mt-10">
      <div className="flex flex-row pb-2">
        <EditableText className="!font-bold !text-3xl" editableText={workout?.name!} onSave={(newName) => handleNameChange(newName)}  />
        <Button className="ml-auto" onClick={() => handleShareWorkout()}>
          <FaShareFromSquare  size={20} />
        </Button>
      </div>
      <EditableText className="!text-lg !pb-3 !f lex" editableText={workout?.description!} onSave={(newDesc) => handleDescriptionChange(newDesc)}/>
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
                  <ExerciseInput
                    draftItem={exercise.sets}
                    onSave={(updatedSets) =>
                      handleExerciseChange({ ...exercise, sets: updatedSets })
                    }
                  />
                  <Text size="md" c="dimmed">
                    SETS
                  </Text>
                </GridCol>

                <GridCol
                  span="content"
                  className="flex flex-col items-center justify-center border-r border-gray-300"
                >
                  <ExerciseInput
                    draftItem={exercise.reps}
                    onSave={(updatedReps) =>
                      handleExerciseChange({
                        ...exercise,
                        reps: updatedReps,
                      })
                    }
                  />
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
