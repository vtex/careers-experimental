import { useEffect } from 'react'

const IndexPage = () => { 
  useEffect(() => {
    window.location.replace("/job-search");
  }, [])

  return null
 }

export default IndexPage
