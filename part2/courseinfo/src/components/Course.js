const Course = ({course}) => (
  <>
    <Header course = {course} />
    <Content course = {course} />
  </>
)

const Header = ({ course }) => (
  <>
    <h2>{course.name}</h2>
  </>
)

const Content = ({ course }) => (
  <div>
    {course.parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
    <Total course = {course} />
  </div>
)

const Part = ({ name, exercises }) => (
  <>
    <p>{name} {exercises}</p>
  </>
)

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <p><b>total of {total} exercises</b></p>
    </>
  )}

export default Course;