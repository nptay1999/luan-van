import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_TOPICS } from "../graphql/topicGQL"
import { useAppSelector } from "../redux/hooks"
import { TopicInterface } from "../redux/models"
import { authSelector } from "../redux/reducer/authReducer"
import LoadingComponent from "./LoadingComponent"
import TopicItemComponent from "./TopicItemComponent"
import refetchIcon from "../assets/refetch.svg"
import DeletePopupComponent from "./DeletePopupComponent"

const MyTopicsComponent = () => {
  const { loading, data, refetch } = useQuery(GET_TOPICS)
  const { user } = useAppSelector(authSelector)
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false)
  const [idTopicDelete, setIdTopicDelete] = useState<string>("")

  const togglePopup = (value: boolean, id: string) => {
    setIsPopupShow(value)
    setIdTopicDelete(id)
  }

  const handleDeleteTopic = (action: boolean) => {
    setIsPopupShow(false)
    if (action) {
      refetch()
    }
  }

  if (loading) return <LoadingComponent />

  const creator = user?.info?._id
  const myTopicLists = data.topics.filter((topic: TopicInterface) => {
    if (creator === undefined) return false
    return topic.creator?._id?.localeCompare(creator) === 0
  })

  return (
    <>
      {isPopupShow && (
        <DeletePopupComponent
          onDispatch={handleDeleteTopic}
          topicId={idTopicDelete}
        />
      )}
      <div className="w-100 rounded border-light pb-5">
        {/* header */}
        <div className="table-grid-wrapper title">
          <div className="table-grid-item-checkbox">
            <input type="checkbox" className="form-check-input" />
          </div>
          <div className="table-grid-item-title">TITLE</div>
          <div className="table-grid-item-duyet">DUYET</div>
          <div className="table-grid-item-enable">ENABLE</div>
          <div className="table-grid-item-creator">CREATOR</div>
          <div className="table-grid-item-lastupdate">LAST UPDATE</div>
          <div className="table-grid-item-menu">
            <img
              src={refetchIcon}
              alt="icon"
              width="24px"
              style={{ cursor: "pointer" }}
              onClick={() => refetch()}
            />
          </div>
        </div>

        {myTopicLists.map((topic: TopicInterface, i: number) => (
          <TopicItemComponent
            topic={topic}
            onClickToDelete={togglePopup}
            key={i}
          />
        ))}
      </div>
    </>
  )
}

export default MyTopicsComponent
