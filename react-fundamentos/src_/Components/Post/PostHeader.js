import React from "react";
import PropTypes from 'prop-types';
import Button from "../../Components/Button";

export default function PostHeader(props){
    const {post} = props
    return (
        <>
            <strong>
                {post.read && <s>{post.title}</s>}
                {!post.read && post.title}
            </strong>            
            <Button onClick={() => props.onRemove(props.post.id)}>
                Remover
            </Button>
            <br/>
            
        </>
    );
}


PostHeader.propTypes = {
    
    onRemove: PropTypes.func.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,        
        read: PropTypes.bool.isRequired
    }).isRequired
};