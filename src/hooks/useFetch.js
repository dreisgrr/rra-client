
import axios from "axios"
const { useState, useEffect } = require("react")
const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true)
            try {
                let config = {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  }
                const res = await axios.get(url, config)
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData();
    }, [url])
    return {data, loading, error}
}

export default useFetch