import { Button, Card, Modal } from "@mantine/core";
import IndividualExercisePage from "../../Pages/IndividualExercisePage/IndividualExercisePage";
import Search from "../Search/Search";
import {
  GetAllExercisesAPI,
  GetExercisesByNameAPI,
} from "../../Services/ExerciseService";
import { useEffect, useState } from "react";
import { Exercise } from "../../Models/Exercies";
import { toast } from "react-toastify";
import exerciseImage from "../../Assets/dumbbell.png";
import { AddExercisesToWorkoutApi } from "../../Services/WorkoutsService";
import { AddExercisesToWorkoutDto } from "../../Models/Workouts";

interface Props {
  workoutId: number;
  opened: boolean;
  close: () => void;
  onExerciseAdded: () => void;
}

const AddExerciseModal = ({ workoutId, opened, close, onExerciseAdded }: Props) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [clicked, setClicked] = useState<{ [id: number]: boolean }>({});

  const onSearchSubmit = (search: string) => {
    GetExercisesByNameAPI(search)
      .then((response) => {
        if (response?.data) {
          setExercises(response.data);
        } else {
          toast.warn("No exercises found");
        }
      })
      .catch((error) => {
        toast.warn("Failed to get exercies");
      });
  };

  const SetClickedExercise = (exerciseId: number) => {
    setClicked((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const AddExercisesToWorkout = () => {
    const exercisesToAdd = Object.keys(clicked)
      .map(Number)
      .filter((key) => clicked[key]);
    const addExercisesToWorkoutDto: AddExercisesToWorkoutDto = {
      exerciseIds: exercisesToAdd,
    };

    AddExercisesToWorkoutApi(String(workoutId), addExercisesToWorkoutDto)
      .then((response) => {
        if (response?.status === 200) {
          toast.success("Exercises added successfully!");
          onExerciseAdded();
        } else {
          toast.warn("Exercises could not be added");
        }
      })
      .catch((error) => {
        toast.warn("Exercises failed to be added to workout");
      });

    close();
    setClicked(prev => Object.fromEntries(Object.keys(prev).map(key => [key, false])))
  };

  useEffect(() => {
    GetAllExercisesAPI()
      .then((response) => {
        if (response?.data) {
          setExercises(response.data);
        } else {
          toast.warn("No exercises found");
        }
      })
      .catch((error) => {
        toast.warn("Failed to get exercises");
      });
  }, []);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Exercise"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        transitionProps={{ transition: "rotate-left" }}
      >
        <Search onSearch={onSearchSubmit} placeholder="Search Exercise" />

        <div className="mt-4 flex-col">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              shadow="md"
              padding="xl"
              radius="md"
              withBorder
              className="mb-10"
            >
              <div className="flex flex-row items-center">
                <img src={exerciseImage} className="h-20 w-20 mr-4" />
                <h1 className="font-bold">{exercise.name}</h1>
                <Button
                  className="ml-auto text-xl pb-1 font-mono"
                  bg={clicked[exercise.id] ? "green" : "blue"}
                  radius="xl"
                  size="xs"
                  onClick={() => SetClickedExercise(exercise.id)}
                >
                  {clicked[exercise.id] ? "✓" : "+"}
                </Button>
              </div>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button bg="red" onClick={() => AddExercisesToWorkout()}>
              Add {Object.values(clicked).filter(Boolean).length} Exercises
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddExerciseModal;
