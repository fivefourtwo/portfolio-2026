import { getEntry, isApproved, showDrafts } from './entries'
import styles from './Copy.module.css'

// Renders the text of a copy entry. Outside production a draft gets a highlight and a
// badge with its ID; approved text always renders as plain text.
const Copy = ({ id }) => {
  const entry = getEntry(id)
  if (!entry) return null
  if (!showDrafts || isApproved(entry)) return entry.text

  return (
    <span className={styles.draft} data-copy-id={id} data-copy-status={entry.status}>
      {entry.text}
    </span>
  )
}

export default Copy
