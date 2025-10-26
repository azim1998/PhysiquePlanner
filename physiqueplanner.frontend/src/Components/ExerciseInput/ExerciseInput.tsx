import React, { useState } from "react";
import { NumberInput } from "@mantine/core";

interface Props {
  draftItem: string | number;
  onSave: (updatedItem: number) => void;
}

const ExerciseInput = ({ draftItem, onSave }: Props) => {
  const [draft, setDraft] = useState<string | number>(draftItem);

  return (
    <div>
      <NumberInput
        size="md"
        min={0}
        max={99}
        value={draft}
        onChange={setDraft}
        styles={{ input: { textAlign: "center", width: "5rem", fontWeight: "bold" } }}
        onKeyDown={(e) => e.key === "Enter" && onSave(Number(draft))
        }
        onBlur={() => onSave(Number(draft))}
      />
    </div>
  );
};

export default ExerciseInput;
