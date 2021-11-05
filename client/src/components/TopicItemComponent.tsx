import React from "react"
import { useHistory } from "react-router-dom"
import dropdownMenu from "../assets/dropdown-menu.svg"
import { Duyet, TopicInterface } from "../redux/models"

interface PropTypes {
  topic: TopicInterface
  onClickToDelete: (value: boolean, id: string) => void
}

const defaultAvatar =
  "https://dashkit-react.vercel.app/img/avatars/profiles/avatar-1.jpg"

const TopicItemComponent = ({ topic, onClickToDelete }: PropTypes) => {
  const history = useHistory()
  const updateDate = new Date(topic.updatedAt ? +topic.updatedAt : Date.now())

  const displayDate = `${updateDate.getHours()}:${updateDate.getMinutes()} - ${updateDate.getDate()}/${
    updateDate.getMonth() + 1
  }/${updateDate.getFullYear()}`

  const onClickToEdit = () => {
    history.push(`/edit-topic/${topic._id}`)
  }

  return (
    <div className="table-grid-wrapper item">
      <div className="table-grid-item-checkbox">
        <input type="checkbox" className="form-check-input" />
      </div>
      <div className="table-grid-item-title">{topic.title}</div>
      <div className="table-grid-item-duyet">
        {Duyet[topic.duyet ? topic.duyet : 0]}
      </div>
      <div className="table-grid-item-enable">
        {topic.enable ? "Yes" : "No"}
      </div>
      <div className="table-grid-item-creator">
        <div className="d-flex align-items-center">
          <img
            src={topic.creator?.avatar ? topic.creator?.avatar : defaultAvatar}
            alt="images"
            className="rounded-circle me-2"
            width="26px"
          />
          <span>
            {topic.creator?.name ? topic.creator?.name : "Default Author"}
          </span>
        </div>
      </div>
      <div className="table-grid-item-lastupdate">{displayDate}</div>
      <div className="table-grid-item-menu">
        <div className="dropdown">
          <img
            src={dropdownMenu}
            alt="icon"
            className="dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            width="4px"
            style={{ cursor: "pointer" }}
          />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li onClick={onClickToEdit}>
              <span
                className="dropdown-item"
                style={{ cursor: "pointer", color: "yellowgreen" }}
              >
                Edit
              </span>
            </li>
            <li>
              <span
                className="dropdown-item"
                style={{ cursor: "pointer", color: "#e90000" }}
                onClick={onClickToDelete.bind(null, true, topic._id || "")}
              >
                Delete
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TopicItemComponent
