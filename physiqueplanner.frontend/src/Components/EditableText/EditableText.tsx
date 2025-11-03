import { TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface Props {
  editableText: string;
  onSave: (draft: string) => void;
  className?: string;
}

const EditableText = ({ editableText, onSave, className = "" }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(editableText);

  const handleOnSave = (value: string) => {
    // if (isEditing) setIsEditing(false);
    onSave(value);
  };

  useEffect(() => {
    editableText && setDraft(editableText)
  },[editableText])

  return (
    // <div
    //   className="w-content"
    //   onClick={() => !isEditing && setIsEditing(true)}
    // >
    //   {isEditing ? (
    //     <TextInput
    //       value={draft}
    //       onChange={(event) => setDraft(event.currentTarget.value)}
    //       onBlur={() => handleOnSave(draft)}
    //       onKeyDown={(event) => event.key === "Enter" && handleOnSave(draft)}
    //       variant="unstyled" // removes Mantine border/background
    //       classNames={{
    //         wrapper: "p-0 m-0", // remove outer wrapper spacing
    //         input: `${className} p-0 m-0 bg-transparent outline-none focus:outline-none focus:ring-0 text-inherit font-inherit text-current cursor-text leading-[inherit] h-auto min-h-[1em]`,
    //       }}
    //     />
    //   ) : (
    //     <h1 className={className}>{editableText}</h1>
    //   )}
    // </div>
    <TextInput
      value={draft}
      onChange={(event) => setDraft(event.currentTarget.value)}
      onBlur={() => handleOnSave(draft)}
      onKeyDown={(event) => event.key === "Enter" && handleOnSave(draft)}
      variant="unstyled" // removes Mantine border/background
      classNames={{
        input: `${className}`,
      }}
    />
  );
};

export default EditableText;
