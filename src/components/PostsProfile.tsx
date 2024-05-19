import React, { useState, useEffect } from "react";
import axios from "axios";
import PostProfileUnit from "./PostProfileUnit";
import '@/styles/PostsProfile.css';

export default function PostsProfile() {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const username = parts[4];
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9000/u/posts?username=${username}`, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.data === null || (Array.isArray(res.data) && res.data.length === 0)) {
                document.getElementById('zero-posts').classList.remove('hidden');

            } else {
                setPostsList(res.data);
            }
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
    }, [username]); // Dependência username para refetch dos posts quando o usuário muda

    return (
        <div id="user-posts-list" className="flex flex-wrap justify-around">
            {postsList.map((post, index) => (
                <PostProfileUnit
                    postId={post.id}
                    key={index}
                    likes={post.likes}
                    comments={post.comments}
                    user={post.User.username}
                    description={post.postDescription}
                    date={post.createdAt}
                    img={post.postContent} // Use o caminho real da imagem aqui
                />
            ))}
            {postsList.length === 0 && (
                <div id="zero-posts" className="show mt-[2rem]">
                    <h1 className="text-3xl font-bold">No posts yet</h1>
                    <span>This user hasn't posted anything yet.</span>
                </div>
            )}
        </div>
    );
}
