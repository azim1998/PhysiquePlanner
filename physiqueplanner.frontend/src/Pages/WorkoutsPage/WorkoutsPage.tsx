import {
  Button,
  Card,
  Group,
  Image,
  SegmentedControl,
  SimpleGrid,
  Switch,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  CreateWorkoutAPI,
  GetAllPublicWorkoutsAPI,
  GetPublicWorkoutsByNameAPI,
  GetUserWorkoutsAPI,
} from "../../Services/WorkoutsService";
import { Workout, WorkoutCreationDto } from "../../Models/Workouts";
import { toast } from "react-toastify";
import exerciseImage from "../../Assets/dumbbell.png";
import Search from "../../Components/Search/Search";
import { Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { error } from "console";
import { useDisclosure } from "@mantine/hooks";
import { create } from "domain";
import CreateItemModal from "../../Components/CreateItemModal/CreateItemModal";

interface Props {}

const WorkoutsPage = (props: Props) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [view, setView] = useState<string>("public");
  const [createWorkoutModalOpened, createWorkoutModalHandlers] = useDisclosure(false);
  const navigate = useNavigate();

  useEffect(() => {
    view == "public"
      ? GetAllPublicWorkoutsAPI()
          .then((response) => {
            if (response?.data) {
              setWorkouts(response.data);
            } else {
              toast.warn("No workouts found");
            }
          })
          .catch((e) => {
            toast.warn("Failed to get workouts");
          })
      : GetUserWorkoutsAPI()
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
  }, [view]);

  const onSearchSubmit = (search: string) => {
    GetPublicWorkoutsByNameAPI(search)
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

  const handleCreateWorkout = (newItem: WorkoutCreationDto) => {
    const newWorkout: WorkoutCreationDto = {
      name: newItem.name,
      description: newItem.description,
      isPrivate: newItem.isPrivate
    }

    CreateWorkoutAPI(newWorkout).then((response) => {
      if (response?.status == 201 && response?.data) {
        console.log(response.data)
        toast.success("Workout Created")
        navigate(`/workouts/${response.data.id}`)
      } else {
        toast.warn("Workout could not be created")
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4">
          {/* Spacer div matches button width */}
          <div className="w-36" />

          <h1 className="text-5xl font-semibold text-center flex-1">
            Workouts
          </h1>

          <Button radius="md" color="teal" onClick={() => createWorkoutModalHandlers.open()}>
            Create Workout
          </Button>

          <CreateItemModal opened={createWorkoutModalOpened} close={createWorkoutModalHandlers.close} handleCreate={(newItem) => handleCreateWorkout(newItem)}/>
        </div>
        <SegmentedControl
          value={view}
          onChange={setView}
          color="blue"
          data={[
            { label: "Public Workouts", value: "public" },
            { label: "My Workouts", value: "mine" },
          ]}
        />

        <Search onSearch={onSearchSubmit} placeholder="Search Workouts" />
      </div>
      <SimpleGrid cols={3} className="mx-30 mt-10">
        {workouts?.length > 0 ? (
          workouts.map((workout) => (
            <Link to={`/workouts/${workout.id}`}>
              <Card
                key={workout.name}
                shadow="md"
                padding="xl"
                radius="md"
                withBorder
                className="w-8/12 h-75"
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
            </Link>
          ))
        ) : (
          <h1>No workouts found</h1>
        )}
      </SimpleGrid>
    </div>
  );
};

export default WorkoutsPage;
