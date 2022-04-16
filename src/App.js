import React,{useState, useEffect} from 'react';
import RepoCards from './components/RepoCards';
import Searchbox from './components/Searchbox.js';
import './App.css';
import Scroll from './components/Scroll.js'
import ErrorBoundary from './components/ErrorBoundary.js'
const App = () => {
   const[searchfield, setSearchField] = useState('')
   const[loading, setLoading] = useState(false)
   const[language, setLanguage] = useState('')
   const[data, setData] = useState([])
   const[page, setPage] = useState(1)
   const [radioState, setRadioState] = useState({radio1: false, radio2: false})

   useEffect(() => {
      fetch('https://api.github.com/search/repositories?q=language:Java&sort=stars&order=desc&page=1&per_page=10')
      .then(res => res.json())
      .then(data => {
         let tempData = data.items
      //    tempData.sort((a, b) => {
      //       return a.stargazers_count - b.stargazers_count;
      //   });
         setData(tempData)
         console.log('data', tempData)
         }
      )
   }, [])

useEffect(() => {
   setLoading(true)
   let lang = 'Java'
   if (language) {
      lang = language
   }
   fetch(`https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc&page=${page}&per_page=10`)
   .then(res => res.json())
   .then(data => {
      setData(data.items)
      console.log('data',  data.items)
      }
   ).then(() => setLoading(false) )
}, [page])

useEffect(() => {
   if(radioState.radio1) {
      console.log('r1')
      sortData('desc')
   }
   else if(radioState.radio2) {
      console.log('r2')
      sortData('asc')
   }
}, [radioState])

const handlePageTravel = (type) => {
   if(type === 'forward') {
      if(data && data.length > 0){
         setPage(page+1)
      }
   }
   else if(type === 'backward') {
      if(page > 1){
         setPage(page-1)
      }
   }
}

const sortData = (type) => {
   let tempData = data
   if(type === 'asc') {
      console.log('asc')
      tempData.sort((a, b) => {
         return a.stargazers_count - b.stargazers_count;
     });
   }
   else if(type === 'desc') {
      console.log('desc')
      tempData.sort((a, b) => {
         return b.stargazers_count - a.stargazers_count;
     });
   }
   console.log('tampData', tempData)
   setData(tempData)
}

const handleRadio = (radio) => {
   if(radio === 1) {
      if(!radioState.radio1){
         setRadioState({
            radio1: true,
            radio2: false
         })
      }
   }
   else if(radio === 2){
      if(!radioState.radio2){
         setRadioState({
            radio1: false,
            radio2: true
         })
      }
   }
}

const languageInput=(event)=>{
   setLanguage(event.target.value)
}

if(data.length===0){
   return <h1>LOADING</h1>
}else{
   return (
          <div className='tc'>
          <h1 className='f1'>Git-Galaxy</h1>
          <div style={{display: 'flex'}}>
            <Searchbox filter='language' searchChange={languageInput} setData={setData} setRadioState={setRadioState} language={language} />
            <div className='sort'>Sort By Stars :</div>
            <div className='input_container'>
               <input checked={radioState.radio1} className='input' type="radio" id="L2H" name="fav_language" value="L2H" onClick={() => handleRadio(1)} />
               <label className='input_label' for="html">Low to High</label>
            </div>
            <div className='input_container'>
               <input checked={radioState.radio2} className='input' type="radio" id="H2L" name="fav_language" value="H2L" onClick={() => handleRadio(2)} />
               <label className='input_label' for="html">High to Low</label>
            </div>
          </div>
          <div className="pagination">
            {<a onClick={() => handlePageTravel('backward')}>&laquo;</a>}
            <a class="active">{page}</a>
            {data && data.length > 0 && <a onClick={() => handlePageTravel('forward')}>&raquo;</a>}
         </div>
          <Scroll>
            <ErrorBoundary>
               {loading === false ? (<RepoCards data={data}/>) : (<h1>Loading</h1>)}
            </ErrorBoundary>
          </Scroll>
        </div>
     );
  }	
}

export default App;