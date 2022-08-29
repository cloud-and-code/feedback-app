import PropTypes from 'prop-types'

function FeedbackStats({ feedback }) {
  // calculate the average of all ratings
  let avg =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating
    }, 0) / feedback.length

  // make the average have one decimal place
  avg = avg.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average rating: {isNaN(avg) ? 0 : avg} </h4>
    </div>
  )
}

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
}

export default FeedbackStats
