import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

const Searchbox=({searchChange, filter, setData, language, setRadioState})=>{
        const placeHolder = filter === 'language' ? 'Search By language' : 'Search By repo name'
	
        const handleSearch = () => {
                fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&page=1&per_page=10`)
                .then(res => res.json())
                .then(data => {
                   setData(data.items)
                   setRadioState({radio1: false, radio2: false})
                   console.log('data',  data.items)
                   }
                )
        }
        
        return (
		<div className='pa2' style={{display: 'flex'}}>
                        <input className='pa3 ba b--green bg-lightest-blue' 
                        type='search'
                        placeholder={placeHolder} 
                        onChange={searchChange} 
                        />
                        <div onClick={() => handleSearch()} style={{cursor: 'pointer'}} className='pa3 ba b--green bg-lightest-blue'>
                                <SearchOutlined />
                        </div>                      
	        </div>
	);
}

export default Searchbox;