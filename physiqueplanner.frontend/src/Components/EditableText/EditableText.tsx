import { TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface Props {
  editableText: string;
  onSave: (draft: string) => void;
  className?: string;
  isReadOnly: boolean;
}

const EditableText = ({ editableText, onSave, className = "", isReadOnly }: Props) => {
  const [draft, setDraft] = useState<string>(editableText);

  const handleOnSave = (value: string) => {
    onSave(value);
  };

  useEffect(() => {
    editableText && setDraft(editableText)
  },[editableText])

  return (
    <TextInput
      value={draft}
      onChange={(event) => setDraft(event.currentTarget.value)}
      onBlur={() => handleOnSave(draft)}
      onKeyDown={(event) => event.key === "Enter" && handleOnSave(draft)}
      //variant="unstyled" // removes Mantine border/background
      classNames={{
        input: `${className}`,
      }}
      disabled={isReadOnly}
    />
  );
};

export default EditableText;
