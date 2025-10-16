import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

interface Props {
  opened: boolean;
  close: () => void;
  onItemRemoveConfirmation: () => void;
}

const RemoveExerciseModal = ({ opened, close, onItemRemoveConfirmation }: Props) => {
  return (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered>
      <h1 className="text-center font-bold">
        Are you sure you want to delete this?
      </h1>

      <div className="flex flex-row justify-center space-x-4 mt-5">
        <Button variant="subtle" color="gray" onClick={close}>
            No
        </Button>
        <Button color="red" onClick={onItemRemoveConfirmation}>
            Yes
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveExerciseModal;
