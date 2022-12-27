import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useTransition, animated} from 'react-spring';

import Home from './Pages/Home';
import Posts from './Pages/Posts';
import Post from './Pages/Post'
import NotFound from './Pages/NotFound';

export default function Routes(){

    const location = useLocation();
    const transitions = useTransition(location, {
        from: {
            opacity: 0,
            trasform:'translateY(50px)',
            position:'absolute'
        },
        enter: {
            opacity: 1,
            trasform:'translateY(0)',
            position:'absolute'
        },
        leave: {
            opacity: 0,
            trasform:'translateY(50px)',
            position:'absolute'
        },
    });

    return transitions((props, item) => (
        <animated.div style={props}>
            <Switch location={item}>
                <Route exact path="/" component={Home}/>
                <Route exact path="/posts" component={Posts}/>
                <Route path="/posts/:id" component={Post}/>
                <Route component={NotFound}/>
            </Switch>
        </animated.div>
    ));
}