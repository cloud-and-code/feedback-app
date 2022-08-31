import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <div className='about-page'>
        <h2>About this project</h2>
        <p>
          This is a project built with React to leave feedback for a product or
          service.
        </p>
        <p>Version: 1.0</p>

        <Link to='/'>Back to home</Link>
      </div>
    </Card>
  )
}

export default AboutPage
