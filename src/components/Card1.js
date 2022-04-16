import React,{ useState } from 'react';
import { UserOutlined, StarFilled, ForkOutlined, CodeFilled } from '@ant-design/icons';
import './Card.css'

const Card1=({name,id, imgUrl, repo_name, start_count, forks_count, lang, description, repo_url})=>{
    const[showDesc, setShowDesc] = useState(false)
	//const {name,email,id}=props;
	return (
		<div onClick={() => window.open(repo_url)} style={{cursor: 'pointer'}} className='tc bg-light-green dib br3 pa1 ma2 grow bw2 shadow-5'>
		    <img  onMouseEnter={() => setShowDesc(true)} onMouseLeave={() => setShowDesc(false)} className='userImage' style={{height: '280px', width: '280px'}} src={imgUrl}/>
            {showDesc && <>
                <div className='cover' onMouseEnter={() => setShowDesc(true)} onMouseLeave={() => setShowDesc(false)}/>
                <div onMouseEnter={() => setShowDesc(true)} onMouseLeave={() => setShowDesc(false)} className='desc_div'>
                    <div className='desc_heading'>Description:</div>
                    <p className='description'>{description.substr(0,300) + '...................'}</p>
                </div>
            </> }
		    <div className='card_stats'>
                    <div className='repo_name'> {`<`} {repo_name} {`/>`}</div>
                    <div className='stat-bar'><UserOutlined style={{fontSize: '18px'}} /> <span className='stat'>{name}</span></div>
                    <div className='stat-bar'><ForkOutlined style={{fontSize: '18px'}} /> <span className='stat'>{forks_count}</span></div>
                    <div className='stat-bar'><StarFilled style={{fontSize: '18px'}}/> <span className='stat'>{start_count}</span></div>
                    <div className='stat-bar'><CodeFilled style={{fontSize: '18px'}}/> <span className='stat'>{lang}</span></div>
                {/* <div>
                    <div><StarFilled style={{fontSize: '20px'}}/> <span className='stat'>{start_count}</span></div>
                    <div><CodeFilled style={{fontSize: '20px'}}/> <span className='stat'>{lang}</span></div>
                </div> */}
		    </div>
		</div>
	);
}


export default Card1;