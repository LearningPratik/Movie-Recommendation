import { useEffect, useState } from "react"
import axios from 'axios';

function useMovielist(movie) {
    
    const FETCH_URL = `http://127.0.0.1:8000/movies`
    const [data, setData] = useState( {} )

    useEffect(() => {
        async () => {
          try {
            const response = await axios.get(FETCH_URL);
            setData(response.data);
          } catch (error) {
            setError('Error fetching data');
          }
        }
        console.log(data)
      }, [movie])
      console.log(data)
      return data
};

export default useMovielist;