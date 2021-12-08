import React, { useState, useEffect, ChangeEvent, FormEvent } from "react"
import "flatpickr/dist/themes/material_green.css"
import Flatpickr from "react-flatpickr"
import { GET_TOPICS } from "../graphql/topicGQL"
import { useQuery } from "@apollo/client"
import LoadingComponent from "../components/LoadingComponent"
import { TopicInterface } from "../redux/models"
import TopicItemCardComponent from "../components/TopicItemCardComponent"

const CreateEventPage = () => {
  const { loading, data } = useQuery(GET_TOPICS)
  const [title, setTitle] = useState("")
  const [numberOfTopics, setNumberOfTopics] = useState(4)
  const [timeStart, setTimeStart] = useState(new Date())
  const [timeEnd, setTimeEnd] = useState(new Date())
  const [topics, setTopics] = useState<Array<string>>([])
  const [duyetTopics, setDuyetTopics] = useState<Array<TopicInterface>>([])

  useEffect(() => {
    console.log("render", { duyetTopics })
    if (data !== undefined) {
      const pubTopics = data.topics.filter((topic: TopicInterface) => {
        return topic.duyet === 1
      })
      setDuyetTopics([...pubTopics])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onTimeStartChange = (date: Date[]) => {
    setTimeStart(date[0])
  }
  const onTimeEndChange = (date: Date[]) => {
    setTimeEnd(date[0])
  }

  const toggleTopic = (topicId: string) => {
    const topicIdExist = checkTopicExist(topicId)
    if (topicIdExist) {
      const filterTopics = topics.filter((topic) => topic !== topicId)
      setTopics([...filterTopics])
    } else setTopics([...topics, topicId])
  }

  const checkTopicExist = (topicId: string) => {
    const filterTopics = topics.filter(
      (topic) => topic.localeCompare(topicId) === 0
    )
    if (filterTopics.length !== 0) return true
    else return false
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ title, timeStart, timeEnd, numberOfTopics, topics })
  }

  if (loading) return <LoadingComponent />

  return (
    <div className="suggest-topic container">
      <div className="row">
        <div className="col-12">
          <div className="py-4 mt-4 border-bottom">
            <div className="sub-text text-bold opacity-50">New Event</div>
            <div className="page-title">Create a new event</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="py-4">
            <form onSubmit={submitHandler}>
              <div className="form-group mb-4">
                <label htmlFor="title" className="form-label">
                  Event name
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  id="title"
                  className="form-control input-normal-color-custom"
                />
              </div>

              <div className="row mb-4">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="timestart" className="form-label">
                      Start date
                    </label>
                    <Flatpickr
                      data-enable-time
                      value={timeStart}
                      onChange={onTimeStartChange}
                      options={{ dateFormat: "M d" }}
                      className="form-control input-normal-color-custom flatpickr-input"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label htmlFor="timestart" className="form-label">
                      End date
                    </label>
                    <Flatpickr
                      data-enable-time
                      value={timeEnd}
                      onChange={onTimeEndChange}
                      options={{
                        minDate: timeStart,
                        dateFormat: "M d",
                      }}
                      className="form-control input-normal-color-custom flatpickr-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="num" className="form-label">
                  Số lượng đề tài tối đa mà sinh viên đăng ký
                </label>
                <input
                  type="number"
                  name="num"
                  value={numberOfTopics}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNumberOfTopics(+e.target.value)
                  }
                  id="num"
                  className="form-control input-normal-color-custom"
                />
              </div>

              <div className="row mb-4">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="mb-2">Select topics (đã duyệt)</div>
                  {topics.length > 0 && (
                    <div className="text-primary">{topics.length} Selected</div>
                  )}
                </div>
                {duyetTopics.map((topic, i) => (
                  <div
                    className="col-2 mb-2"
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={toggleTopic.bind(this, topic._id || "")}
                  >
                    <TopicItemCardComponent
                      topic={topic}
                      active={checkTopicExist(topic._id || "")}
                    />
                  </div>
                ))}
              </div>

              <div className="form-group d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEventPage
