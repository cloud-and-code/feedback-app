import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

// use children as props because the provider will be wrapped around other components
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
      id: 2,
      rating: 9,
      text: 'This is awesome stuff.',
    },
    {
      id: 3,
      rating: 8,
      text: 'Hello large programming world!',
    },
  ])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch data from db.json
  const fetchFeedback = async () => {
    //const res = await fetch('/feedback?_sort=id&_order=desc')
    //const data = await res.json()

    //setFeedback(data)
    setIsLoading(false)
  }

  // add feedback
  const addFeedback = async newFeedback => {
    // talk to the backend
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    // state is immutable; copy has to be created; add new feedback and all current feedback to new array with spread operator
    setFeedback([data, ...feedback])
  }

  // delete feedback
  const deleteFeedback = async id => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      })

      setFeedback(feedback.filter(item => item.id !== id))
    }
  }

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    setFeedback(
      feedback.map(item => (item.id === id ? { ...item, ...data } : item))
    )
  }

  // set feedback in edit mode
  const editFeedback = item => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
