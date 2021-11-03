import React, { ChangeEvent, RefObject, useState, FormEvent } from "react"

const SuggestTopic = () => {
  const [content, setContent] = useState<string>("")
  const textareaRef: RefObject<any> = React.useRef<HTMLInputElement>(null)
  const inputTextareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ content })
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
                  className="form-control input-normal-color-custom"
                />
              </div>
              <div className="form-group">
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
                  onChange={inputTextareaHandler}
                  ref={textareaRef}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuggestTopic
