import React, { FC } from "react"
import { Posting } from "../../typings"

type Props = { posting: Posting }

const PostingCard: FC<Props> = ({ posting: { title, department, team, location, slug }}) => {
  return <div style={{borderBottom: '1px solid #ccc'}} className="mt-2 w-full p-6 flex flex-col border-gray-300 border-solid hover:shadow-lg cursor-pointer">
    <span className="text-black text-xl pb-2">
      {title}
    </span>
    <span className="text-gray-400">{`${team} - ${department}`}</span>
    <span className="text-gray-400">{location}</span>
    <a href={`https://careers.vtex.com/${slug}`} className="text-sm mt-2 underline uppercase text-gray-600">Apply Now</a>
  </div>
}

export default PostingCard
