import React, { createContext, useState, ReactNode } from "react"
import { TopicInterface } from "../redux/models"

interface defaultValueType {
  topics: TopicInterface[]
  addTopicId: (topic: TopicInterface) => void
  removeTopicId: (topic: TopicInterface) => void
  removeAll: () => void
  addMany: (topicsm: TopicInterface[]) => void
}

interface PropTypes {
  children: ReactNode
}

const defaultValue = {
  topics: [],
  addTopicId: (topic: TopicInterface) => {},
  removeTopicId: (topic: TopicInterface) => {},
  removeAll: () => {},
  addMany: (topicsm: TopicInterface[]) => {},
}

export const OptionsTopicContext = createContext<defaultValueType>(defaultValue)

const OptionsTopicProvider = ({ children }: PropTypes) => {
  const [topics, setTopics] = useState<TopicInterface[]>([])

  const addTopicId = (topic: TopicInterface) => {
    setTopics([...topics, topic])
  }

  const removeTopicId = (topic: TopicInterface) => {
    const newTopics = topics.filter(
      (_topic: TopicInterface) =>
        (_topic._id || "").localeCompare(topic._id || "") !== 0
    )
    setTopics([...newTopics])
  }

  const removeAll = () => {
    setTopics([])
  }

  const addMany = (topicsm: TopicInterface[]) => {
    setTopics([...topics, ...topicsm])
  }

  const value = {
    topics,
    addTopicId,
    removeTopicId,
    removeAll,
    addMany,
  }

  return (
    <OptionsTopicContext.Provider value={value}>
      {children}
    </OptionsTopicContext.Provider>
  )
}

export default OptionsTopicProvider
