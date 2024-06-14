import { NavLink, useLocation } from "react-router-dom"

export default function Navbar(){
    const normalLinkStyling = "text-lg py-2 px-8 text-indigo-400 bg-violet-500 bg-opacity-10 rounded hover:bg-opacity-25"
    const activeLinkStyling = "text-lg py-2 px-8 text-indigo-400 bg-violet-300 bg-opacity-20 rounded"
    return(
        <div className="flex flexrow justify-center items-center">
            <NavLink className={ ({isActive}) => isActive ? activeLinkStyling : normalLinkStyling } to="/">Milestone 1</NavLink>
            <NavLink className={ ({isActive}) => isActive ? activeLinkStyling : normalLinkStyling } to="/Milestone2">Milestone 2</NavLink>
        </div>
    )
}