import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Workout, WorkoutUpdateDto } from "../../Models/Workouts";
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
  Group,
  Rating,
  Select,
  Text,
  Tooltip,
} from "@mantine/core";
import exerciseImage from "../../Assets/dumbbell.png";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AddExerciseModal from "../../Components/AddExerciseModal/AddExerciseModal";
import { MdDelete } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaClock, FaRegUser } from "react-icons/fa";
import { LuBicepsFlexed, LuFileSearch } from "react-icons/lu";
import RemoveItemModal from "../../Components/RemoveItemModal/RemoveItemModal";
import { WorkoutExercise } from "../../Models/WorkoutExercise";
import ExerciseInput from "../../Components/ExerciseInput/ExerciseInput";
import EditableText from "../../Components/EditableText/EditableText";
import PageLoader from "../../Components/PageLoader/PageLoader";

interface Props {}

const WorkoutDetailPage = (props: Props) => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const [workout, setWorkout] = useState<Workout>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addExerciseModalOpened, addExerciseModalHandlers] =
    useDisclosure(false);
  const [removeExerciseModalOpened, removeExerciseModalHandlers] =
    useDisclosure(false);

  const fetchExercises = () => {
    setIsLoading(true);
    GetWorkoutAPI(workoutId!)
      .then((response) => {
        if (response?.success && response.data) {
          console.log(response.data);
          setWorkout(response.data);
          setIsLoading(false);
        } else {
          toast.warn(response?.message);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        toast.warn("Failed to get workout");
        setIsLoading(false);
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
  };

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
    setWorkout((prev) =>
      prev
        ? {
            ...prev,
            name: newName,
          }
        : prev
    );

    const updatedWorkout: WorkoutUpdateDto = {
      name: newName,
    };

    partiallyUpdateWorkout(updatedWorkout);
  };

  const handleDescriptionChange = (newDesc: string) => {
    setWorkout((prev) =>
      prev
        ? {
            ...prev,
            description: newDesc,
          }
        : prev
    );

    const updatedWorkout: WorkoutUpdateDto = {
      description: newDesc,
    };

    partiallyUpdateWorkout(updatedWorkout);
  };

  const handleDifficultyChange = (newDifficulty: number) => {
    console.log(workout?.workoutType);
    setWorkout((prev) =>
      prev
        ? {
            ...prev,
            difficulty: newDifficulty,
          }
        : prev
    );

    console.log(workout?.workoutType);
    const updatedWorkout: WorkoutUpdateDto = {
      difficulty: newDifficulty,
    };

    console.log(updatedWorkout.workoutType);
    partiallyUpdateWorkout(updatedWorkout);
  };

  const handleDurationChange = (newDuration: number) => {
    setWorkout((prev) =>
      prev
        ? {
            ...prev,
            duration: newDuration,
          }
        : prev
    );

    const updatedWorkout: WorkoutUpdateDto = {
      duration: newDuration,
    };

    partiallyUpdateWorkout(updatedWorkout);
  };

  const handleWorkoutTypeChange = (newType: string) => {
    setWorkout((prev) =>
      prev
        ? {
            ...prev,
            workoutType: newType,
          }
        : prev
    );

    const updatedWorkout: WorkoutUpdateDto = {
      workoutType: newType,
    };

    partiallyUpdateWorkout(updatedWorkout);
  };

  const handleShareWorkout = () => {
    ShareWorkoutAPI(workoutId!).then((response) => {
      if (response?.success) {
        toast.success("Workout shared successfully");
      } else {
        toast.warn("Workout could not be shared");
      }
    });
  };

  useEffect(() => {
    fetchExercises();
    console.log(workout);
  }, []);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {workout ? (
            <div>
              <div className="flex flex-row pb-2">
                <EditableText
                  className="!font-bold !text-3xl"
                  editableText={workout?.name!}
                  onSave={(newName) => handleNameChange(newName)}
                />
                <Button
                  className="ml-auto"
                  onClick={() => handleShareWorkout()}
                >
                  <FaShareFromSquare size={20} />
                </Button>
              </div>
              <EditableText
                className="!text-lg !pb-3 !flex"
                editableText={workout?.description!}
                onSave={(newDesc) => handleDescriptionChange(newDesc)}
              />
              <div className="flex items-center">
                <h1 className="text-lg pr-2">Difficulty:</h1>
                <Rating
                  value={workout.difficulty}
                  onChange={(newDifficulty) =>
                    handleDifficultyChange(newDifficulty)
                  }
                />
              </div>
              <Group>
                <FaClock size={20} />
                <h1>Duration (mins)</h1>
                <ExerciseInput
                  draftItem={workout.duration}
                  onSave={(newDuration) => handleDurationChange(newDuration)}
                />

                <LuBicepsFlexed size={20} className="ml-5" />
                <h1>Workout Type</h1>
                <Select
                  data={["Strength", "Cardio", "Crossfit", "Bodybuilding"]}
                  allowDeselect={false}
                  value={workout.workoutType}
                  onChange={(newType) => handleWorkoutTypeChange(newType!)}
                />
                <FaRegUser size={20} className="ml-5" />
                <h1>Creator: {workout?.owner}</h1>
              </Group>
              <Group></Group>

              <div className="pt-4">
                {workout.workoutExercises.map((exercise, index) => (
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
                        <Grid.Col
                          span="content"
                          className="border-r border-gray-300 "
                        >
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
                              handleExerciseChange({
                                ...exercise,
                                sets: updatedSets,
                              })
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
                              removeExercise(
                                workoutId!,
                                String(exercise.exerciseId)
                              )
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
                  workoutId={workout.id}
                  opened={addExerciseModalOpened}
                  close={addExerciseModalHandlers.close}
                  onExerciseAdded={() => fetchExercises()}
                />
                <Button mt={10} onClick={addExerciseModalHandlers.open}>
                  + Add Exercise
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 mx-auto">
              <LuFileSearch size={60} className="mb-2 text-gray-500" />
              <h1 className="font-bold text-xl">Workout could not be found</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WorkoutDetailPage;
