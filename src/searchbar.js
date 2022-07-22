import React from 'react'

const Searchbar = ({ padertionary, searchBar, changeSearchBar }) => {
    
    return (
        <>
            <input class="searchbar" type="text" placeholder="Search..." value={searchBar} onChange={(e) => changeSearchBar(e.target.value)}/>
        </>
    )
}

export default Searchbar
