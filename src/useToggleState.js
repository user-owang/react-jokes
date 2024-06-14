import { useState } from "react";

function useToggleState(){
  const [isLoading, setIsLoading] = useState(true)
  const toggleLoading = ()=> {
    setIsLoading(!isLoading)
  }
  return [isLoading, toggleLoading]
}

export default useToggleState