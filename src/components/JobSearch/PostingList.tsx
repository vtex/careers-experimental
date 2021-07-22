import React, { FC, useState } from "react"
import { Posting } from "../../typings"
import PostingCard from "./PostingCard"

type Props = { postings: Posting[] }

const PostingList: FC<Props> = ({ postings }) => {
  const [numberOfItemsShown, setNumberOfItemsShown] = useState(10);

  const showMore = () => {
    if (numberOfItemsShown + 10 <= postings.length) {
      setNumberOfItemsShown(numberOfItemsShown + 10)
    } else {
      setNumberOfItemsShown(postings.length)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="postings-list-container w-full">
          {postings.map((posting: Posting, index) => {
            if (index <= numberOfItemsShown - 1) {
              return <PostingCard posting={posting} key={posting.slug} />
            }

            return null;
          })}
        </div>
        <div className="w-full">
          <p className="showing-postings-count">
            Showing
            {' '}
            <span>
              {postings.length < numberOfItemsShown
                ? postings.length
                : numberOfItemsShown}
            </span>
            {' '}
            out of
            {' '}
            <span>{postings.length}</span>
          </p>
          {!(numberOfItemsShown >= postings.length) && (
            <button
              className="rounded-md bg-rebel text-sm uppercase text-white py-3 mt-4 load-more-btn"
              onClick={showMore}
            >
              load more jobs
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostingList
