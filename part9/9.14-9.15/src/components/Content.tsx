interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <div key={index}>
          <p>{part.name} {part.exerciseCount}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;