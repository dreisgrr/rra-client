import './underConstruction.css'
import codingCat from '../../resources/misc/under-dev.gif'

const UnderConstruction = () => {
    return (
        <div className="underConstructionContainer">
            <img src={codingCat} className="underDevCat"/>
            <span>This page is under development.</span>
        </div>
    )
}

export default UnderConstruction
