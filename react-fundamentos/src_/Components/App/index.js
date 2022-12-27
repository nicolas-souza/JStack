import React, { useState } from "react";
import Post from '../Post';
import Header from '../Header'

import style from './App.scss'
import {Title} from "./styles";

import { ThemeProvider } from '../../Context/ThemeContext';

function App(){
    const [posts, setPosts] = useState([
        {id: Math.random(), title: 'Title#01', subtitle: 'Sub 01', likes: 20, read: false, removed: false},
        {id: Math.random(), title: 'Title#02', subtitle: 'Sub 02', likes: 30, read: true, removed: false},
        {id: Math.random(), title: 'Title#03', subtitle: 'Sub 03', likes: 40, read: false, removed: false},
        {id: Math.random(), title: 'Title#04', subtitle: 'Sub 04', likes: 50, read: false, removed: false}
    ]);

    function handleRemovePost(postId){
        setPosts((prevState) => (prevState.map(
                post => (
                    post.id == postId 
                        ? {...post, removed: true}
                        : post
                )
            )
        ));
    }

    function handleRefresh(){
        setTimeout(() => {
            setPosts((prevState) => [
                ...prevState,
                {
                    id: Math.random(),
                    title: `Title#0${prevState.length + 1}`,
                    subtitle: `Sub #0${prevState.length + 1}`,
                    likes: 50,
                    read: false
                }
            ])
        })
        
    };
    return (
        //sintax reduzida React.Fragment
        <ThemeProvider> 
            <Header title = "Blog do Nicolas">
                <Title>
                    Posts da Semana - Passado via children
                    <button onClick = {handleRefresh}>Atualizar</button>
                </Title>
            </Header>
            
            <hr/>
            
            {posts.map(post => (
                <Post
                onRemove={handleRemovePost}
                key = {post.id}                    
                post = {post}
                                  
                />
            ))}
            
        </ThemeProvider>
    );
}

export default App;