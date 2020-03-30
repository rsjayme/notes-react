import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Main from './pages/Main'
import AddNote from './pages/AddNote'
import EditNote from './pages/EditNote'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/add" exact component={AddNote} />
                <Route path="/edit/:noteId" exact component={EditNote} />
            </Switch>
        </BrowserRouter>
    );
}