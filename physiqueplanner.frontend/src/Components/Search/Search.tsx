import { useForm } from "react-hook-form";

interface Props {
  onSearch: (query: string) => void;
  placeholder: string;
}

interface FormInput {
  query: string;
}

const Search = ({ onSearch, placeholder }: Props) => {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit = handleSubmit((data) => onSearch(data.query));

  return (
    <form className="flex justify-center" onSubmit={onSubmit}>
      <input
        {...register("query")}
        placeholder={placeholder}
        className="border rounded-sm px-2 mx-2"
      />
    </form>
  );
};

export default Search;
