import { useEffect } from 'react'

const IndexPage = () => { 
  useEffect(() => {
    window.location.replace("https://jobsearch.vtex.com/job-search");
  }, [])

  return null
 }

export default IndexPage
