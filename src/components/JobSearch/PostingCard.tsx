import React, { FC } from "react"
import { Posting } from "../../typings"

type Props = { posting: Posting }

const PostingCard: FC<Props> = ({
  posting: { title, department, team, continent, country, city, slug },
}) => {
  const postingLink = `https://careers.vtex.com/postings/${slug}`
  const postingTitle = title?.split('–').reverse().slice(1).reverse().join('–');
  const postingLocation = [city, country, continent].filter((item) => item !== null);

  return (
    <a href={postingLink} className="w-full">
      <div
        style={{ borderBottom: "1px solid #ccc" }}
        className="posting-card mt-2 w-full p-6 flex flex-col border-gray-300 border-solid hover:shadow-lg cursor-pointer"
      >
        <p className="posting-card-title">{postingTitle}</p>
        <span className="posting-card-team">{`${
          team?.length ? team : ''
        }${
          team?.length && department?.length ? ' · ' : ''
        }${department?.length ? department : ''}`}</span>
        <span className="posting-card-location">{postingLocation.join(' · ')}</span>
        <span
          className="text-sm mt-2 underline uppercase posting-card-apply-now"
        >
          Apply Now
        </span>
      </div>
    </a>
  )
}

export default PostingCard
