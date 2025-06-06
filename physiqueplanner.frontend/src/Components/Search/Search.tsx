import { useForm } from "react-hook-form";


interface Props {
    searchExercise: (exerciseName: string) => void;
}

interface FormInput {
    exerciseName: string
}

const Search = ({ searchExercise }: Props) => {
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit = (exerciseName: string) => {
    searchExercise(exerciseName);
  }

  return (
    <form className="flex justify-center" onSubmit={handleSubmit(({exerciseName}) => onSubmit(exerciseName))}>
        <input {...register("exerciseName")} placeholder="Search Exercise" className="border rounded-sm px-2 mx-2"/>
    </form>
  );
};

export default Search;
