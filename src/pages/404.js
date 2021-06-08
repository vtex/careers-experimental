import * as React from "react"

const NotFoundPage = () => { 
  React.useEffect(() => {
    window.location.replace("https://careers.vtex.com");
  }, [])

  return null
 }

export default NotFoundPage
