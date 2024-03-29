import React from "react";
import PropTypes from 'prop-types';

import PostHeader from "./PostHeader";

import { Subtitle, Rate, Container } from "./styles";

export default function Post(props){
    const {post} = props;

    return (
        
            <Container removed = {post.removed}>
                <PostHeader                    
                    onRemove = {props.onRemove}                        
                    post = {{
                        id: props.post.id,
                        title: props.post.title,
                        read: props.post.read
                    }}
                />
                <Subtitle>{post.subtitle}</Subtitle>
                <Rate>Media: { post.likes/2}</Rate>                
            </Container>
    );
}

Post.propTypes = {    
    onRemove: PropTypes.func.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        likes: PropTypes.number.isRequired,
        read: PropTypes.bool.isRequired,
        removed: PropTypes.bool.isRequired
    }).isRequired
};

