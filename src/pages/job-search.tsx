import React, { FC, useMemo } from "react"
import Select from 'react-select'
import { useQueryParam, StringParam } from "use-query-params";

import Header from "../components/Header"
import PostingList from "../components/JobSearch/PostingList"
import { useAllPostings } from "../hooks/useAllPostings"

const JobSearch: FC = () => {
  const postings = useAllPostings()

  const [selectedLocations, setSelectedLocations] = useQueryParam("locations", StringParam);

  // All of this should be extracted to a Filter components
  const agregate = useMemo(() => {
    return postings && postings.reduce((acc, { location }) => {
     if (!acc[location]){
       acc[location] = 0
     } 

     acc[location]++ 

     return acc
    }, {})
  }, [postings])

  const locationOptions = useMemo(() => {
    return agregate ? Object.keys(agregate).map(loc => ({
      value: loc,
      label: `${loc} (${agregate[loc]})`
    })) : []
  }, [agregate])

  const searchLabel = `We have 193 jobs in 26 locations in 29 areas of work in 7 seniority levels`
  return (
    <div>
      <Header />
      {/* Extract into Header maybe */}
      <div
        style={{
          backgroundImage:
            "url(https://careers.vtex.com/wp-content/uploads/2020/10/bg_jobsearch.png)",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: 400
        }}
        className="w-100 flex justify-center items-center"
      >
        <h1 className="text-6xl text-gray-900">Write here your next future</h1>
      </div>
      {/* Extract into Filters */}
      <div className="flex flex-col justify-center items-center -mt-9 text-center">
        <span>Location:</span>
        <div className="w-6/12">
          <Select options={locationOptions} setValue={(value) => console.log(value)} />
        </div>
        <span className="pt-4 text-md text-black">{searchLabel}</span>
      </div>
      {postings?.length && <PostingList postings={postings} />}
    </div>
  )
}

export default JobSearch
