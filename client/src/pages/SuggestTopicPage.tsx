import { useMutation } from "@apollo/client"
import React, { ChangeEvent, RefObject, useState, FormEvent } from "react"
import { Redirect } from "react-router-dom"
import LoadingComponent from "../components/LoadingComponent"
import { CREATE_TOPIC } from "../graphql/topicGQL"
import { useAppSelector } from "../redux/hooks"
import { AuthenticationInterface, TopicType } from "../redux/models"
import { authSelector } from "../redux/reducer/authReducer"

const SuggestTopic = () => {
  // Declare variables
  const { user }: AuthenticationInterface = useAppSelector(authSelector)
  const [createTopic, { loading, error, data }] = useMutation(CREATE_TOPIC)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [topicType, setTopicType] = useState<Array<string>>([])
  const textareaRef: RefObject<any> = React.useRef<HTMLInputElement>(null)

  // Logic Proccessing
  const inputTextareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  const inputTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const toggleTopicType = (type: string) => {
    const existType = topicType.filter((t) => t.localeCompare(type) === 0)
    if (existType.length !== 0) {
      const newTopicType = topicType.filter((t) => t.localeCompare(type) !== 0)
      setTopicType(newTopicType)
    } else {
      const newTopicType = [...topicType, type]
      setTopicType(newTopicType)
    }
  }

  const isChecked = (type: string) => {
    const existType = topicType.filter((t) => t.localeCompare(type) === 0)
    return existType.length !== 0 ? true : false
  }

  const resetForm = () => {
    setTitle("")
    setContent("")
    setTopicType([])
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const topic = { title, content, creator: user?.info?._id, topicType }
    createTopic({ variables: { ...topic } })
    resetForm()
    console.log({ topic })
  }

  // Display handle
  if (loading) return <LoadingComponent />
  if (error) {
    console.log(error)
    return <Redirect to="/suggest-topic" />
  }
  if (data !== undefined) {
    return <Redirect to="/topics/your-topic" />
  }

  return (
    <div className="suggest-topic container">
      <div className="row">
        <div className="col-12">
          <div className="py-4 mt-4 border-bottom">
            <div className="sub-text text-bold opacity-50">New Topic</div>
            <div className="page-title">Create a new topic</div>
          </div>
        </div>
        <div className="col-12">
          <div className="py-4 border-bottom">
            <form onSubmit={submitHandler}>
              <div className="form-group mb-4">
                <label htmlFor="title" className="form-label">
                  Topic name
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  className="form-control input-normal-color-custom"
                  onChange={inputTitleHandler}
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="creator" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  id="creator"
                  className="form-control input-normal-color-custom"
                  value={user?.info?.name ? user?.info?.name : "Creator"}
                  disabled
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="content" className="form-label">
                  Topic content
                  <div className="sub-text">
                    This is how others will learn about the topic, so make it
                    good!
                  </div>
                </label>
                <textarea
                  id="content"
                  className="input-textarea form-control input-normal-color-custom"
                  value={content}
                  onChange={inputTextareaHandler}
                  ref={textareaRef}
                ></textarea>
              </div>

              <div className="form-group d-flex mb-4">
                {TopicType.map((type, i) => (
                  <div className="form-check me-4" key={i}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={type}
                      id={type}
                      checked={isChecked(type)}
                      onClick={toggleTopicType.bind(this, type)}
                      onChange={() => {}}
                    />
                    <label className="form-check-label" htmlFor={type}>
                      {type}
                    </label>
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

export default SuggestTopic
