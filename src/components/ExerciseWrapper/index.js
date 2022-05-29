export const ExerciseWrapper = ({title, message, input, children}) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{message}</h3>
      <br />
      <h3>{input}</h3>
      {children}
    </div>
  )
}