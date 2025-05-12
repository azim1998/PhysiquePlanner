import { Link } from "react-router-dom";
import exerciseImage from "../../Assets/dumbbell.png";
import { Exercise } from "../../Services/Exercises/Exercies";
import "./Card.css";

interface Props {
  exercise: Exercise;
}

const Card = ({ exercise }: Props) => {
  return (
    <Link className="card" to={`/exercises/${exercise.id}`}>
      <img className="exercise-image" src={exerciseImage} alt="exercise"></img>
      <h3>{exercise.name}</h3>
      <p>{exercise.description}</p>
    </Link>
  );
};

export default Card;
