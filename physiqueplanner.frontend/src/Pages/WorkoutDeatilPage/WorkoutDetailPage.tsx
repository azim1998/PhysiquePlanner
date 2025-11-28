import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Workout, WorkoutUpdateDto } from "../../Models/Workouts";
import {
  GetWorkoutAPI,
  PartiallyUpdateWorkoutAPI,
  RemoveExerciseFromWorkoutAPI,
  SaveWorkoutAPI,
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
import { FaClock, FaRegUser, FaSave, FaShare } from "react-icons/fa";
import { LuBicepsFlexed, LuFileSearch } from "react-icons/lu";
import RemoveItemModal from "../../Components/RemoveItemModal/RemoveItemModal";
import { WorkoutExercise } from "../../Models/WorkoutExercise";
import ExerciseInput from "../../Components/ExerciseInput/ExerciseInput";
import EditableText from "../../Components/EditableText/EditableText";
import PageLoader from "../../Components/PageLoader/PageLoader";
import { CiBookmarkPlus } from "react-icons/ci";

interface Props {}

const WorkoutDetailPage = (props: Props) => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const [workout, setWorkout] = useState<Workout>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addExerciseModalOpened, addExerciseModalHandlers] =
    useDisclosure(false);
  const [removeExerciseModalOpened, removeExerciseModalHandlers] =
    useDisclosure(false);
  const isReadOnly = workout?.owner === "System";

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
    setWorkout((prev) =>
      prev
        ? {
            ...prev,
            difficulty: newDifficulty,
          }
        : prev
    );

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
    if (workout?.isPublished) {
      toast.warn(
        "Workout has already been shared, please update and try again"
      );
    } else {
      ShareWorkoutAPI(workoutId!).then((response) => {
        if (response?.success) {
          toast.success("Workout shared successfully");
        } else {
          toast.warn("Workout could not be shared");
        }
      });
    }
  };

  const handleSaveWorkout = (workoutId: string) => {
    SaveWorkoutAPI(workoutId).then((response) => {
      if (response?.success && response.data) {
        toast.success("Workout saved to My Workouts");
        //Do I need data
      } else {
        toast.warn("Workout could not be saved");
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
                  className="!font-bold !text-3xl !w-fit"
                  editableText={workout?.name!}
                  onSave={(newName) => handleNameChange(newName)}
                  isReadOnly={isReadOnly}
                />
                {isReadOnly ? (
                  <Tooltip label="Save Workout" color="teal">
                    <Button
                      variant="subtle"
                      color="gray"
                      className="ml-auto"
                      onClick={() => handleSaveWorkout(workout.id.toString())}
                    >
                      <FaSave size={30} />
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip label="Share Workout" color="teal">
                    <Button
                      className="ml-auto"
                      variant="subtle"
                      color="gray"
                      onClick={() => handleShareWorkout()}
                    >
                      <FaShare size={20} />
                    </Button>
                  </Tooltip>
                )}
              </div>
              <EditableText
                className="!text-lg !flex !w-fit"
                editableText={workout?.description!}
                onSave={(newDesc) => handleDescriptionChange(newDesc)}
                isReadOnly={isReadOnly}
              />
              <div className="flex items-center">
                <h1 className="text-lg pr-2">Difficulty:</h1>
                <Rating
                  value={workout.difficulty}
                  onChange={(newDifficulty) =>
                    handleDifficultyChange(newDifficulty)
                  }
                  readOnly={isReadOnly}
                />
              </div>
              <Group>
                <FaClock size={20} />
                <h1>Duration (mins)</h1>
                <ExerciseInput
                  draftItem={workout.duration}
                  onSave={(newDuration) => handleDurationChange(newDuration)}
                  isReadOnly={isReadOnly}
                />

                <LuBicepsFlexed size={20} className="ml-5" />
                <h1>Workout Type</h1>
                <Select
                  data={["Strength", "Cardio", "Crossfit", "Bodybuilding"]}
                  allowDeselect={false}
                  value={workout.workoutType}
                  onChange={(newType) => handleWorkoutTypeChange(newType!)}
                  disabled={isReadOnly}
                />
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
                            isReadOnly={isReadOnly}
                          />
                          <Text size="md" c="dimmed">
                            SETS
                          </Text>
                        </GridCol>

                        <GridCol
                          span="content"
                          className="flex flex-col items-center justify-center"
                        >
                          <ExerciseInput
                            draftItem={exercise.reps}
                            onSave={(updatedReps) =>
                              handleExerciseChange({
                                ...exercise,
                                reps: updatedReps,
                              })
                            }
                            isReadOnly={isReadOnly}
                          />
                          <Text size="md" c="dimmed">
                            REPS
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
                          {!isReadOnly && (
                            <Tooltip label="Remove Exercise" color="gray">
                              <Button
                                variant="subtle"
                                color="gray"
                                onClick={removeExerciseModalHandlers.open}
                              >
                                <MdDelete size={20} />
                              </Button>
                            </Tooltip>
                          )}
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
                {!isReadOnly && (
                  <Button mt={10} onClick={addExerciseModalHandlers.open}>
                    + Add Exercise
                  </Button>
                )}
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
