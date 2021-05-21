import React, { FC } from "react"
import { Posting } from "../../typings"

type Props = { posting: Posting }

const PostingCard: FC<Props> = ({ posting: { title, department, team, location, slug }}) => {
  return (
    <div
      style={{borderBottom: '1px solid #ccc'}}
      className="posting-card mt-2 w-full p-6 flex flex-col border-gray-300 border-solid hover:shadow-lg cursor-pointer"
    >
      <p className="posting-card-title">{title}</p>
      <span className="posting-card-team">{`${team} - ${department}`}</span>
      <span className="posting-card-location">{location}</span>
      <a
        href={`https://careers.vtex.com/postings/${slug}`}
        className="text-sm mt-2 underline uppercase posting-card-apply-now"
      >
          Apply Now
      </a>
  </div>
  );
}

export default PostingCard
