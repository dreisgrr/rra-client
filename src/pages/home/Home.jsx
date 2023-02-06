import "./home.css"
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import SearchBar from "../../components/searchBar/SearchBar"

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const handlePassActive = (i) => {
        setActiveIndex(i)
    }

    return (
        <div>
            <Header passActive={ (i)=> handlePassActive(i)} />
            <SearchBar activeIndex={activeIndex}/>
        </div>
    )
}

export default Home
