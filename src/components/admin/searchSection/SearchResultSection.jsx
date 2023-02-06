import './searchresultsection.css'
import AdminSearchResultList from '../searchResultList/AdminSearchResultList'

const SearchResultSection = ({action, searchQuery}) => {

    return (
        <>
            {
                action === 'default' ? '' : <AdminSearchResultList searchQuery={searchQuery}/>
            }
        </>
    )
}

export default SearchResultSection
