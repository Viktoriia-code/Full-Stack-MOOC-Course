const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      {course.parts.map(course => 
        <Part key={course.id} course={course} />,
      )}
      <b>total of {totalExercises} exercises</b>
    </div>
  )
}

const Part = ({ course }) => {
  return (
    <p>{course.name} {course.exercises}</p>
  )
}

const Course = ({ course }) => {
  return (
  <>
    <Header course={course} />
    <Content course={course} />
  </>
  )
}

export default Course
