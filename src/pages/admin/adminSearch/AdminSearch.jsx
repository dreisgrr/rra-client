import './adminsearch.css'
import Header from '../../../components/header/Header'
import SearchBar from '../../../components/searchBar/SearchBar'
import { useState } from 'react';
import SearchResultSection from '../../../components/admin/searchSection/SearchResultSection.jsx';

const AdminSearch = () => {
    const [action, setAction] = useState('default');
    const [searchQuery, setSearchQuery] = useState({})
    const handlePassAction = (i,q) => {
        setAction(i)
        console.log('query', q)
        setSearchQuery(q)
    }
    const [activeIndex, setActiveIndex] = useState(1);
    const handlePassActive = (i) => {
        setActiveIndex(i)
    }

    return (
        <div className="adminSearchContainer">
            <Header passActive={ (i)=> handlePassActive(i)} view="admin" />
            <div className="searchBarWrapper">
                <SearchBar activeIndex={activeIndex} view="admin" passAction={ (i,q)=> handlePassAction(i,q)} />
            </div>
            <div className="adminSearchResultContainer">
                <SearchResultSection action={action} searchQuery={searchQuery}/>
            </div>
            
        </div>
    )
}

export default AdminSearch
