import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({coursePart}: PartProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <i>{coursePart.description}</i>
        </div>
      )
    case "group":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <i>project exercises {coursePart.groupProjectCount}</i>
        </div>
      )
    case "background":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <i>{coursePart.description}</i><br />
          <span>submit to {coursePart.backgroundMaterial}</span>
        </div>
      )
    case "special":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <i>{coursePart.description}</i><br />
          <span>required skills: {coursePart.requirements.join(", ")}</span>
        </div>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;