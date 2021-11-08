import { ApolloQueryResult, useMutation } from "@apollo/client"
import React, { useContext, Fragment } from "react"
import close from "../assets/close.svg"
import { OptionsTopicContext } from "../context/OptionsTopicContext"
import { UPDATE_STATE_TOPIC } from "../graphql/topicGQL"

interface PropTypes {
  refetchData: () => Promise<ApolloQueryResult<any>>
}

const OptionsTopicComponent = ({ refetchData }: PropTypes) => {
  const { topics, removeAll } = useContext(OptionsTopicContext)
  const [updateStateTopic, { loading }] = useMutation(UPDATE_STATE_TOPIC)

  const enableOne = () => {
    const topic = topics[0]
    updateStateTopic({
      variables: { topicId: topic._id, enable: true, duyet: topic.duyet },
    })
    refetchData()
    removeAll()
  }
  const disableOne = () => {
    const topic = topics[0]
    updateStateTopic({
      variables: { topicId: topic._id, enable: false, duyet: topic.duyet },
    })
    refetchData()
    removeAll()
  }
  const boDuyetOne = () => {
    const topic = topics[0]
    updateStateTopic({
      variables: { topicId: topic._id, enable: topic.enable, duyet: 0 },
    })
    refetchData()
    removeAll()
  }
  const duyetOne = () => {
    const topic = topics[0]
    updateStateTopic({
      variables: { topicId: topic._id, enable: topic.enable, duyet: 1 },
    })
    refetchData()
    removeAll()
  }
  const needEditOne = () => {
    const topic = topics[0]
    updateStateTopic({
      variables: { topicId: topic._id, enable: topic.enable, duyet: 2 },
    })
    refetchData()
    removeAll()
  }

  const enableAll = () => {
    if (window.confirm("Bạn sẽ kích hoạt tất cả?")) {
      topics.forEach((topic) => {
        updateStateTopic({
          variables: { topicId: topic._id, enable: true, duyet: topic.duyet },
        })
      })
      refetchData()
      removeAll()
    }
  }
  const disableAll = () => {
    if (window.confirm("Bạn sẽ bỏ kích hoạt tất cả?")) {
      topics.forEach((topic) => {
        updateStateTopic({
          variables: { topicId: topic._id, enable: false, duyet: topic.duyet },
        })
      })
      refetchData()
      removeAll()
    }
  }
  const boDuyetAll = () => {
    if (window.confirm("Bạn bỏ duyệt tất cả?")) {
      topics.forEach((topic) => {
        updateStateTopic({
          variables: { topicId: topic._id, enable: topic.enable, duyet: 0 },
        })
      })
      refetchData()
      removeAll()
    }
  }
  const duyetAll = () => {
    if (window.confirm("Bạn sẽ duyệt tất cả?")) {
      topics.forEach((topic) => {
        updateStateTopic({
          variables: { topicId: topic._id, enable: topic.enable, duyet: 1 },
        })
      })
      refetchData()
      removeAll()
    }
  }
  const needEditAll = () => {
    if (window.confirm("Bạn yêu cầu chỉnh sửa tất cả?")) {
      topics.forEach((topic) => {
        updateStateTopic({
          variables: { topicId: topic._id, enable: topic.enable, duyet: 2 },
        })
      })
      refetchData()
      removeAll()
    }
  }

  if (loading)
    return (
      <div className="options-topic">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )

  return (
    <div className="options-topic rounded d-flex align-items-center justify-content-between p-3">
      <div>{topics.length} topic(s) </div>
      <div className="options d-flex align-items-center">
        {topics.length > 1 && (
          <Fragment>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm me-2"
              style={{ cursor: "pointer" }}
              onClick={boDuyetAll}
            >
              Bỏ duyệt tất cả
            </button>
            <button
              type="button"
              className="btn btn-outline-success btn-sm me-2"
              style={{ cursor: "pointer" }}
              onClick={duyetAll}
            >
              Duyệt tất cả
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm me-2"
              style={{ cursor: "pointer" }}
              onClick={needEditAll}
            >
              Cần chỉnh sửa tất cả
            </button>
            <button
              type="button"
              className="btn btn-outline-info btn-sm me-2"
              style={{ cursor: "pointer" }}
              onClick={enableAll}
            >
              Enable tất cả
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm me-2"
              style={{ cursor: "pointer" }}
              onClick={disableAll}
            >
              Disable tất cả
            </button>
          </Fragment>
        )}

        {topics.length === 1 && (
          <Fragment>
            {topics[0].duyet !== 0 && (
              <button
                type="button"
                className="btn btn-outline-primary btn-sm me-2"
                style={{ cursor: "pointer" }}
                onClick={boDuyetOne}
              >
                Bỏ duyệt
              </button>
            )}
            {topics[0].duyet !== 1 && (
              <button
                type="button"
                className="btn btn-outline-success btn-sm me-2"
                style={{ cursor: "pointer" }}
                onClick={duyetOne}
              >
                Duyệt
              </button>
            )}
            {topics[0].duyet !== 2 && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm me-2"
                style={{ cursor: "pointer" }}
                onClick={needEditOne}
              >
                Cần chỉnh sửa
              </button>
            )}
            {!topics[0].enable && (
              <button
                type="button"
                className="btn btn-outline-info btn-sm me-2"
                style={{ cursor: "pointer" }}
                onClick={enableOne}
              >
                Enable
              </button>
            )}
            {topics[0].enable && (
              <button
                type="button"
                className="btn btn-outline-dark btn-sm me-2"
                style={{ cursor: "pointer" }}
                onClick={disableOne}
              >
                Disable
              </button>
            )}
          </Fragment>
        )}

        <img
          src={close}
          alt="icon"
          width="24px"
          style={{ cursor: "pointer" }}
          onClick={() => removeAll()}
        />
      </div>
    </div>
  )
}

export default OptionsTopicComponent
