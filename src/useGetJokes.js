import axios from 'axios'
import {useState, useEffect} from 'react'
import useToggleState from './useToggleState'

function useGetJokes(numJokesToGet){
  const [jokes, setJokes] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, toggleLoading] = useToggleState()

  function vote(id, delta) {
    setJokes(jArray => (jArray.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    ));
  }
  
  async function getJokes() {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let tempJokes = [];
      let seenJokes = new Set();

      console.log('getting jokes')

      while (tempJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { ...joke } = res.data;
        console.log(res.data)

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          tempJokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      setJokes(tempJokes)
      console.log('jokes set')
      console.log(tempJokes)
    } catch (err) {
      console.error(err);
      setError(err)
    } finally {
      toggleLoading()
    }
  }
  useEffect(() =>{
    if (isLoading){
      getJokes()
    }
  }, [isLoading])
  return (
    {jokes, error, isLoading, toggleLoading, vote}
  )
}

export default useGetJokes