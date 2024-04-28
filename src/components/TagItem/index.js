const TagItem = props => {
  const {tagItemDetails, onClickSelectTag} = props
  const {displayText} = tagItemDetails
  const onClickSelectedTag = () => {
    onClickSelectTag(displayText)
  }

  return (
    <li className="section2-li">
      <button
        type="button"
        className="section2-tags-btn"
        onClick={onClickSelectedTag}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
