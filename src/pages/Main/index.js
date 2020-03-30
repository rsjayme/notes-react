import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';


import './style.css'



export default function Main() {
    const history = useHistory();
    const emptyNote = [
        {
            noteId: '0',
            noteTitle: 'Adicione uma nova nota!',
            noteBody: 'E então ela aparecerá aqui.'
            
        }];
    const [notes, setNotes] = useState([]);

    const submitHandler = function(e) {
       e.preventDefault();
        history.push('/add');
    }

    const deleteHandler = function(id) {
        if(id === 0) return;
        const noteToDelete = notes.indexOf(notes.find(note => note.noteId === id));
        //const indexToDelete = notes.indexOf(noteToDelete);
        let newNotes = [...notes]
        newNotes.splice(noteToDelete, 1);
        if(newNotes.length > 0) {
            setNotes(newNotes);
            localStorage.setItem('notas', JSON.stringify(newNotes));
        }
        else {
            setNotes(emptyNote);
            localStorage.removeItem('notas');
        }
    }



    useEffect(() => {
        if(localStorage.getItem('notas'))
            setNotes(JSON.parse(localStorage.getItem('notas')));
        else
            setNotes(emptyNote)
    }, [])

    

    return(
        <div className="note-container">
            
            <header>
                <div className="header-left">
                <h1>Notes</h1>
                <span>Salve suas notas sem complicações.</span>
                </div>
                <section className="notes-form">
                <form onSubmit={submitHandler} >
                    <button className="add-note button">Adicionar nota</button>
                </form>
            </section>
            </header>

            <section className="notes-list">
                <ul>
                    {notes.map((note) => {
                        return(
                            <li key={note.noteId}><p className="title"><strong>{note.noteTitle}</strong></p>
                                <p>{note.noteBody}</p>
        
                                <button onClick={() => deleteHandler(note.noteId)} className="delete transparent" type="button">
                                    <FiTrash2 size={20} color="a8a8b3" />
                                </button>
                                <button onClick={() => { 
                                    if(note.noteId === "0") return;
                                    history.push(`/edit/${note.noteId}`)

                                    }} 
                                    className="edit transparent" type="button">
                                    <FiEdit size={20} color="a8a8b3" />
                                </button>
                            </li>
                        );

                    })}

                </ul>
            </section>
        </div>
    )
}