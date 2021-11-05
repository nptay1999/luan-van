import { useMutation } from "@apollo/client"
import React from "react"
import { DELETE_TOPIC } from "../graphql/topicGQL"
import LoadingComponent from "./LoadingComponent"

interface PropTypes {
  onDispatch: (action: boolean) => void
  topicId: string
}

const DeletePopupComponent = ({ topicId, onDispatch }: PropTypes) => {
  const [deleteTopic, { loading }] = useMutation(DELETE_TOPIC)

  const onCancel = () => {
    onDispatch(false)
  }
  const onApply = () => {
    deleteTopic({ variables: { deleteTopicId2: topicId } })
    onDispatch(true)
  }

  if (loading) return <LoadingComponent />

  return (
    <div className="popup rounded py-3 px-3">
      <div className="display-6 text-center mb-3">Are you sure?</div>
      <div className="sub-text text-center mb-3">
        Do you really want to delete this Topic? This process cannot be undone.
      </div>
      <div className="d-flex align-items-center justify-content-around">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onApply}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeletePopupComponent
