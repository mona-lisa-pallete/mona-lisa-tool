import { useEffect, useRef, useState } from "react";


function useMounted(props) {
  const state = useRef(false)
  useEffect(() => {
    state.current = true
    return () => state.current = false
  }, [])

  return state.current
}

export default useMounted