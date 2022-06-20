import { useState } from "react"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Heading from "../../Heading/Heading"
import Icon from "components/Icon/Icon"
import Link from "next/link"
import TagsSelection from "components/TagsSelection/TagsSelection"
import { IOption } from "type"

interface TagsProps {
  tags: IOption[]
  tagOptions: IOption[]
  onSetTags: (tags: IOption[]) => void
}

const Tags = (props: TagsProps) => {
  const { tags = [], tagOptions, onSetTags } = props
  const [showTagsModal, setShowTagsModal] = useState(false)
  const [localTags, setLocalTags] = useState(tags)

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="tags-color" />
          Tags
        </div>
        <a onClick={() => setShowTagsModal(true)}>Add tags</a>
      </div>
      <div className="flex flex-wrap gap-y-2">
        {Array.isArray(tags) &&
          tags.map((item) => (
            <div key={item.value} className="mt-3 flex items-center w-full md:w-1/2 lg:w-1/3 pr-1">
              <>
                <Icon icon="dot" /> {item.label}
              </>
            </div>
          ))}
      </div>
      <Modal
        title="Tags"
        visible={showTagsModal}
        width={500}
        mobilePosition="center"
        onClose={() => {
          setLocalTags(tags)
          setShowTagsModal(false)
        }}
      >
        <TagsSelection
          selectedList={tags}
          options={tagOptions}
          onCancel={() => {
            setLocalTags(tags)
            setShowTagsModal(false)
          }}
          onSubmit={() => {
            onSetTags(localTags)
            setShowTagsModal(false)
          }}
        />
      </Modal>
    </div>
  )
}

export default Tags
