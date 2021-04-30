import React, { FC } from "react"
import { Posting } from "../../typings"
import PostingCard from "./PostingCard"

type Props = { postings: Posting[] }

const PostingList: FC<Props> = ({ postings }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center w-full max-w-4xl">
        {postings.map((posting: Posting) => (
          <PostingCard posting={posting} key={posting.title} />
        ))}
      </div>
    </div>
  )
}

export default PostingList
