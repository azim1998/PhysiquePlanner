import { Link } from "react-router-dom";
import exerciseImage from "../../Assets/dumbbell.png";
import { Exercise } from "../../Services/Exercises/Exercies";
import "./Card.css";

interface Props {
  exercise: Exercise;
}

const Card = ({ exercise }: Props) => {
  return (
    <Link to={`/exercises/${exercise.id}`}>
      <div className="flex flex-col items-center text-center">
      <img className="w-8/12 border-2 rounded-3xl p-4 shadow-lg shadow-indigo-500/40" src={exerciseImage} alt="exercise"></img>
      <h3 className="font-bold pt-4">{exercise.name}</h3>
      {exercise.muscles?.map((muscle) => (
        <h3 key={`${exercise.name}-${muscle.name}`}>{muscle.name}</h3>
      ))}
      </div>
    </Link>
  );
};

export default Card;
