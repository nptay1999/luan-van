export interface UserInterface {
  _id?: string
  username?: string
  password?: string
  userType?: number
  info?: UserInfoInterface
  createdAt?: string
  updatedAt?: string
}

export interface UserInfoInterface {
  _id?: string
  name?: string
  avatar?: string
  email?: string
  phone?: string
  identification?: string
  account?: UserInterface
  topics?: TopicInterface[]
  createdAt?: string
  updatedAt?: string
}

export interface TopicInterface {
  _id?: string
  title?: string
  content?: string
  enable?: boolean
  duyet?: number
  topicType?: string[]
  creator?: UserInfoInterface
  createdAt?: string
  updatedAt?: string
}

export interface ScheduleEventInterface {
  _id?: string
  title?: string
  timeStart?: string
  timeEnd?: string
  hotStop?: boolean
  numberOfTopics?: number
  topics?: TopicsOfEventInterface[]
  comfirm?: ComfirmSvTopicGvInterface[]
  createdAt?: string
  updatedAt?: string
}

export interface TopicsOfEventInterface {
  _id?: string
  topic?: TopicInterface
  sinhvien?: UserInfoInterface[]
  event?: ScheduleEventInterface
  createdAt?: string
  updatedAt?: string
}

export interface ComfirmSvTopicGvInterface {
  _id?: string
  topic?: TopicInterface
  sinhvien?: UserInfoInterface
  gianvien?: UserInfoInterface
  event?: ScheduleEventInterface
  createdAt?: string
  updatedAt?: string
}

export interface AuthenticationInterface {
  user?: UserInterface
  token?: string
  tokenExpiration?: number
}

export interface LoginResponseInterface {
  code: number
  message: string
  success: boolean
  token?: string
  tokenExpiration?: number
  user?: UserInterface
}
