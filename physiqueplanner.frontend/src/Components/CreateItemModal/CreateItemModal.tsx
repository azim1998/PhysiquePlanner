import { Button, Checkbox, Modal, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { WorkoutCreationDto } from "../../Models/Workouts";
import { useForm } from "react-hook-form";

interface Props {
  opened: boolean;
  close: () => void;
  handleCreate: (newItem: WorkoutCreationDto) => void;
}

const CreateItemModal = ({ opened, close, handleCreate }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkoutCreationDto>();

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        reset();
      }}
      title="Create Workout"
      centered
    >
      <form onSubmit={handleSubmit((data) => handleCreate(data))}>
        <div className="flex flex-col gap-4">
          {/* Workout Name */}
          <div className="flex flex-col">
            <label className="font-bold mb-1">Workout Name:</label>
            <TextInput
              {...register("name", { required: "Name is required" })}
              placeholder="Enter workout name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Workout Description */}
          <div className="flex flex-col">
            <label className="font-bold mb-1">Workout Description:</label>
            <TextInput
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          
          {/* Submit Button */}
          <Button type="submit" className="mt-2">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateItemModal;
