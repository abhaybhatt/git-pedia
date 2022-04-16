import React from 'react';
import Card1 from './Card1';

		const RepoCards=({data})=>{
           // if(true){
          	// throw new Error(" Nooooo! There is an Error");
           // }
		 return (
		 	<div>
		 	    {
			          data.map((repo,i)=>{
			   	       return(
			   	       	  <Card1
			   	            key ={repo.id} 
			   	            id={repo.id} 
			      	        name={repo.owner.login}
                            imgUrl={repo.owner.avatar_url}
                            repo_name={repo.name}
                            start_count={repo.stargazers_count}
                            forks_count={repo.forks_count}
                            lang={repo.language}
							description={repo.description}
							repo_url={repo.html_url}
			   	           />
			   	       );
		             })
		        }
		   </div>
		);
	}

export default RepoCards;