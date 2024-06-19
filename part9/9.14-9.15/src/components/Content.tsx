import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {courseParts.map((part, index) => (
        <Part key={index} coursePart={part} />
      ))}
    </div>
  );
};

export default Content;