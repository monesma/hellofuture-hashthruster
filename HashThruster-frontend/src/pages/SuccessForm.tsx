import { Link } from "react-router-dom"

const SuccessForm = () => {
  return (
    <section className='successProject'>
        <h1>Congratulations, your project has been submitted</h1>
        <Link to="/dashboard">Back to dashboard</Link>
    </section>
  )
}

export default SuccessForm