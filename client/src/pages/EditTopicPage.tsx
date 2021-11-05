import React, {
  RefObject,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useHistory, useParams } from "react-router-dom"
import LoadingComponent from "../components/LoadingComponent"
import { GET_A_TOPIC, UPDATE_CONTENT_TOPIC } from "../graphql/topicGQL"
import { useAppSelector } from "../redux/hooks"
import { TopicType } from "../redux/models"
import { authSelector } from "../redux/reducer/authReducer"

interface ParamsType {
  id: string
}

const EditTopicPage = () => {
  const params = useParams<ParamsType>()
  const { user } = useAppSelector(authSelector)
  const { loading, data } = useQuery(GET_A_TOPIC, {
    variables: { topicId: params.id },
  })
  const [updateContentTopic] = useMutation(UPDATE_CONTENT_TOPIC)
  const history = useHistory()
  const textareaRef: RefObject<any> = React.useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("topic.title")
  const [content, setContent] = useState<string>("topic.content")
  const [topicType, setTopicType] = useState<Array<string>>([])

  useEffect(() => {
    if (data !== undefined) {
      const topicResponse = data.topic
      const { topic } = topicResponse
      setTitle(topic.title)
      setContent(topic.content)
      setTopicType(topic.topicType)
    }
  }, [data])

  const inputTextareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }
  const inputTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const isChecked = (type: string) => {
    const existType = topicType.filter((t) => t.localeCompare(type) === 0)
    return existType.length !== 0 ? true : false
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
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const topic = { title, content, creator: user?.info?._id, topicType }
    const updateTopic = {
      id: data.topic.topic._id,
      updateTopicTitle2: title,
      updateTopicContent2: content,
      updateTopicTopicType2: topicType,
    }
    updateContentTopic({ variables: updateTopic })
    history.push("/topics/your-topic")
  }

  if (loading) return <LoadingComponent />

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="py-4 mt-4 border-bottom">
            <div className="sub-text text-bold opacity-50">
              Topic of {user?.info?.name}
            </div>
            <div className="page-title">Edit The Topic</div>
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

              <div className="form-group d-flex mb-4">
                <select
                  value={data.topic.topic.duyet ? data.topic.topic.duyet : 0}
                  className="form-select me-3"
                  disabled
                >
                  <option value={0}>Chưa Duyệt</option>
                  <option value={1}>Đã Duyệt</option>
                  <option value={2}>Cần chỉnh sửa</option>
                </select>
                <select
                  value={data.topic.topic.enable ? data.topic.topic.enable : 0}
                  className="form-select ms-3"
                  disabled
                >
                  <option value={0}>Disable</option>
                  <option value={1}>Enable</option>
                </select>
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

export default EditTopicPage
