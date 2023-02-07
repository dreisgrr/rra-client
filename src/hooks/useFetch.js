
import axios from "axios"
import requestUrl from '../utils/requestMethods.js'

const { useState, useEffect } = require("react")
const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await requestUrl.get(url)
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