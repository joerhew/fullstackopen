const Courses = ({ courses }) => (
  <>
    {courses.map(course =>
      <Course key={course.id} course={course} />)}
  </>
)

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </>
  )
}

export default App