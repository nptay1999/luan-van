import { useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { GET_A_TOPIC } from "../graphql/topicGQL"
import LoadingComponent from "../components/LoadingComponent"
import ReactMarkdown from "react-markdown"

interface ParamsType {
  id: string
}

const TopicDetailPage = () => {
  const params = useParams<ParamsType>()
  const { loading, data } = useQuery(GET_A_TOPIC, {
    variables: { topicId: params.id },
  })

  if (loading) return <LoadingComponent />

  return (
    <div className="container detail-topic">
      <div className="row">
        <div className="col-12 mb-5">
          <div className="py-4 mt-4 border-bottom">
            <div className="sub-text text-bold opacity-50">OVERVIEW</div>
            <div className="page-title">Topic detail</div>
          </div>
        </div>

        <div className="col-12">
          <h5 style={{ color: "#2424d3" }} className="mb-4 display-5">
            Đề tài: {data.topic.topic.title || "Topic title"}
          </h5>

          <div className="d-flex align-items-center justify-content-between mb-4">
            <b>Giáo viên: {data.topic.topic.creator.name || "Creator"}</b>
            <b>Email: {data.topic.topic.creator.email || "Email"}</b>
          </div>

          <div className="mb-2">
            <b style={{ color: "blue" }}>Chi tiết nội dung:</b>
          </div>
          <div>
            <ReactMarkdown children={data.topic.topic.content} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicDetailPage
