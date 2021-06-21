import React, {useState} from 'react';
import axios from 'axios';
import './style.css';
import BoxList from './boxList'

const Home = () => {
    //input
    const [name, setName] = useState("");
    const [repo, setRepo] = useState("");
    const [listGitHub, setListGitHub] = useState([]);
   

    
    const itemGitHub = listGitHub.map( (item) => {
        return <BoxList
                    key={item.key}
                    avatar_url={item.avatar_url}
                    login={item.login}
                    name={item.name}
                    location={item.location}
                    followers={item.followers}
                    following={item.following}
                    repoName={item.repoName}
                />
        })
        
        function writingName (e) {
            setName(e.target.value);
        }
       function writingRepo (e) {
            setRepo(e.target.value);
        }

        //button
        async function RequestGit() {
            if(!name || !repo){alert("O(s) se encontra(m) vazio(s)!!!")}
            
            const perfil = await axios(`https://api.github.com/users/${name}`);
            const repositorio = await axios(`https://api.github.com/users/${name}/repos`);
         
          
           let filteredRepo = repositorio.data.filter( (arr) => {
               return arr.name === repo
           })
           console.log(perfil.data)

            const newRepo = {
                key: listGitHub.length,
                avatar_url: perfil.data.avatar_url,
                login: perfil.data.login,
                name: perfil.data.name,
                location: perfil.data.location,
                followers: perfil.data.followers,
                following: perfil.data.following,
                repoName: filteredRepo.[0],
            }
            
            
   
        setName("");
        setRepo("");
        setListGitHub((prevState) => {
            return [...prevState, newRepo];
        });
    }

   
    return(
        <div className="main">
            <div className="main-wrapper">
                <div className="main-wrapper__content">

                    <h1 className="main-wrapper__title">Git Repositórios</h1>
                    <input 
                        value={name}
                        onChange={writingName}
                        className="main-wrapper__input" 
                        placeholder="Nome do usuário" 
                        type="text"
                    />
                    <input 
                        value={repo}
                        onChange={writingRepo}
                        className="main-wrapper__input" 
                        placeholder="Nome do repositório" 
                        type="text"
                    />
                    <button 
                        onClick={RequestGit} 
                        className="main-wrapper__button" 
                    >
                        Adicionar
                    </button>

                </div>
                <ul
                    className="main-wrapper__list" 
                >{itemGitHub}</ul>
            </div>
        </div>
    );
}

export default Home;