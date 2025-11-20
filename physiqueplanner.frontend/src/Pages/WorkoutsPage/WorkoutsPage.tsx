import {
  Button,
  Card,
  Group,
  Image,
  Rating,
  SegmentedControl,
  SimpleGrid,
  Switch,
  Tooltip,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  CreateWorkoutAPI,
  DeleteWorkoutAPI,
  GetAllPublicWorkoutsAPI,
  GetPublicWorkoutsByNameAPI,
  GetUserWorkoutsAPI,
  GetUserWorkoutsByNameAPI,
  SaveWorkoutAPI,
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
import { CiBookmarkPlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { LuBicepsFlexed, LuFileSearch } from "react-icons/lu";
import PageLoader from "../../Components/PageLoader/PageLoader";
import { useAuth } from "../../Context/AuthContext";
import { FaSave } from "react-icons/fa";

interface Props {}

const WorkoutsPage = (props: Props) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [view, setView] = useState<string>("public");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createWorkoutModalOpened, createWorkoutModalHandlers] =
    useDisclosure(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    view == "public"
      ? GetAllPublicWorkoutsAPI()
          .then((response) => {
            if (response?.success && response?.data) {
              setWorkouts(response.data);
              setIsLoading(false);
            } else {
              toast.warn("No workouts found");
              setWorkouts([]);
              setIsLoading(false);
            }
          })
          .catch((e) => {
            toast.warn("Failed to get workouts");
            setIsLoading(false);
          })
      : GetUserWorkoutsAPI()
          .then((response) => {
            if (response?.success && response?.data) {
              setWorkouts(response.data);
              setIsLoading(false);
            } else {
              toast.warn("No workouts found");
              setWorkouts([]);
              setIsLoading(false);
            }
          })
          .catch((e) => {
            toast.warn("Failed to get workouts");
            setWorkouts([]);
            setIsLoading(false);
          });
  }, [view]);

  const onSearchSubmit = (search: string) => {
    view == "public"
      ? GetPublicWorkoutsByNameAPI(search)
          .then((response) => {
            if (response?.success && response?.data) {
              setWorkouts(response.data);
              setIsLoading(false);
            } else {
              toast.warning("No workouts found");
              setWorkouts([]);
              setIsLoading(false);
            }
          })
          .catch((e) => {
            toast.warn("Failed to get workouts");
            setWorkouts([]);
            setIsLoading(false);
          })
      : GetUserWorkoutsByNameAPI(search)
          .then((response) => {
            if (response?.success && response?.data) {
              setWorkouts(response.data);
              setIsLoading(false);
            } else {
              toast.warning("No workouts found");
              setWorkouts([]);
              setIsLoading(false);
            }
          })
          .catch((e) => {
            toast.warn("Failed to get workouts");
            setWorkouts([]);
            setIsLoading(false);
          });
  };

  const handleCreateWorkout = (newItem: WorkoutCreationDto) => {
    const newWorkout: WorkoutCreationDto = {
      name: newItem.name,
      description: newItem.description
    };

    CreateWorkoutAPI(newWorkout).then((response) => {
      if (response?.success && response?.data) {
        console.log(response.data);
        toast.success("Workout Created");
        navigate(`/workouts/${response.data.id}`);
      } else {
        toast.warn("Workout could not be created");
      }
    });
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

  const handleDeleteUserWorkout = (workoutId: string) => {
    DeleteWorkoutAPI(workoutId).then((response) => {
      if (response?.success) {
        toast.success("Workout removed successfully");
        setWorkouts((prev) =>
          prev.filter((w) => w.id.toString() !== workoutId)
        );
      } else {
        toast.warn("Workout could not be removed");
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4">
          {/* Spacer div matches button width */}
          <div className="w-36" />

          <h1 className="text-5xl font-semibold text-center flex-1">
            Workouts
          </h1>

          {isLoggedIn() ? (
            <Button
              radius="md"
              color="teal"
              onClick={() => createWorkoutModalHandlers.open()}
            >
              Create Workout
            </Button>
          ) : (
            <div className="w-36"></div>
          )}

          <CreateItemModal
            opened={createWorkoutModalOpened}
            close={createWorkoutModalHandlers.close}
            handleCreate={(newItem) => handleCreateWorkout(newItem)}
          />
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

      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="mx-auto">
          {workouts?.length > 0 ? (
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing="xl"
              className="mt-4 px-4 max-w-5xl text-center"
            >
              {workouts.map((workout) => (
                <Card
                  key={workout.id}
                  shadow="md"
                  padding="xl"
                  radius="md"
                  withBorder
                  className="flex items-center"
                >
                  <Card.Section className="mb-5">
                    <Link to={`/workouts/${workout.id}`}>
                      <img
                        src={exerciseImage}
                        alt="workoutImage"
                        className="max-h-48 w-auto object-contain block mx-auto"
                      />
                    </Link>
                  </Card.Section>

                  <h1 className="font-bold">{workout.name}</h1>
                  <h1>{workout.description}</h1>

                  <div className="flex flex-row items-center gap-2">
                    <h1 className="font-semibold">Difficulty:</h1>
                    <Rating value={workout.difficulty} />
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <LuBicepsFlexed />
                    <h1>{workout.workoutType}</h1>
                  </div>

                  {view == "public" ? (
                    <>
                      <Tooltip label="Save Workout" color="teal">
                        <Button
                          variant="subtle"
                          color="gray"
                          className="mx-auto"
                          onClick={() =>
                            handleSaveWorkout(workout.id.toString())
                          }
                        >
                          <FaSave size={30} />
                        </Button>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip label="Delete Workout" color="red">
                        <Button
                          variant="subtle"
                          color="gray"
                          onClick={() =>
                            handleDeleteUserWorkout(workout.id.toString())
                          }
                        >
                          <MdDelete size={20} />
                        </Button>
                      </Tooltip>
                    </>
                  )}
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 mx-auto">
              <LuFileSearch size={60} className="mb-2 text-gray-500" />
              <h1 className="font-bold text-xl">No workouts found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
