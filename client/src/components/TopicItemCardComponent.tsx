import React from "react"
import { TopicInterface } from "../redux/models"
import classnames from "classnames"

interface PropTypes {
  topic: TopicInterface
  active: boolean
}

const TopicItemCardComponent = ({ topic, active }: PropTypes) => {
  return (
    <div className={classnames("card", { "border-primary": active })}>
      <div className="card-header d-flex align-items-center mb-2">
        <img
          src={topic.creator?.avatar}
          alt="img"
          className="rounded-circle me-2"
          width="28px"
        />
        <span style={{ fontSize: "0.825rem" }}>{topic.creator?.name}</span>
      </div>
      <div className={classnames("card-body", { "text-primary": active })}>
        <b className="card-title" style={{ fontSize: "1rem" }}>
          {topic.title}
        </b>
      </div>
      <ul className="list-group list-group-flush ">
        {topic.topicType?.map((type, j) => (
          <li
            className={classnames("list-group-item", {
              "text-primary": active,
            })}
            key={j}
            style={{ fontSize: ".825rem" }}
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopicItemCardComponent
