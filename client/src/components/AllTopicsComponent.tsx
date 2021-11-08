import { useQuery } from "@apollo/client"
import React, { useState, useContext, ChangeEvent } from "react"
import { GET_TOPICS } from "../graphql/topicGQL"
import { TopicInterface } from "../redux/models"
import LoadingComponent from "./LoadingComponent"
import TopicItemComponent from "./TopicItemComponent"
import refetchIcon from "../assets/refetch.svg"
import DeletePopupComponent from "./DeletePopupComponent"
import { OptionsTopicContext } from "../context/OptionsTopicContext"
import OptionsTopicComponent from "./OptionsTopicComponent"

const AllTopicsComponent = () => {
  const { loading, data, refetch } = useQuery(GET_TOPICS)
  const [isPopupShow, setIsPopupShow] = useState<boolean>(false)
  const [idTopicDelete, setIdTopicDelete] = useState<string>("")
  const { topics, addMany, removeAll } = useContext(OptionsTopicContext)

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

  const toggleSelectTopic = () => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        addMany(data.topics)
      } else {
        removeAll()
      }
    }
  }

  if (loading) return <LoadingComponent />

  return (
    <>
      {isPopupShow && (
        <DeletePopupComponent
          onDispatch={handleDeleteTopic}
          topicId={idTopicDelete}
        />
      )}
      {topics.length > 0 && <OptionsTopicComponent refetchData={refetch} />}
      <div className="w-100 rounded border-light pb-5">
        {/* header */}
        <div className="table-grid-wrapper title">
          <div className="table-grid-item-checkbox">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={toggleSelectTopic()}
            />
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

        {data.topics.map((topic: TopicInterface, i: number) => (
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

export default AllTopicsComponent
