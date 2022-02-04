import { useContext, useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import { Dropdown, Icon, IconButton, TextInput } from '../..';
import './Notes.scss';
import { AuthContext } from '../../../context';

export const Notes = () => {
    const { user } = useContext(AuthContext);

    const textareaRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [noteId, setNoteId] = useState(null);
    const [note, setNote] = useState(null);
    const [noteList, setNoteList] = useState({
        notes: []
    });
    const [tempText, setTempText] = useState('');

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase
                .firestore()
                .collection('noteLists')
                .doc(user.uid)
                .onSnapshot(
                    doc => {
                        if (doc.exists) {
                            setNoteList(doc.data());
                        }
                    }
                );

            return () => unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (noteId) {
            const unsubscribe = firebase
                .firestore()
                .collection('notes')
                .doc(noteId)
                .onSnapshot(
                    doc => {
                        setNote(doc.data())
                    }
                );

            return () => unsubscribe();
        }
    }, [noteId]);

    useEffect(() => {
        setTempText(note?.text || '');
    }, [noteId, note?.text]);

    const newNote = (data = {}) => {
        setSearchValue('');
        firebase.firestore().collection('notes').add({
            userId: user.uid,
            ...data
        }).then(docRef => {
            setNoteId(docRef.id);
            firebase.firestore().collection('noteLists').doc(user.uid).set({
                notes: [
                    ...noteList.notes,
                    { id: docRef.id, title: data?.title || '' }
                ]
            });
        });
    };

    const handleDelete = () => {
        firebase.firestore().collection('notes').doc(noteId).delete().then(() => {
            firebase.firestore().collection('noteLists').doc(user.uid).update({
                notes: [
                    ...(noteList.notes.filter(({id}) => id !== noteId))
                ]
            }).then(() => {
                setNoteId(null);
            });
        });
    };

    const updateNote = (data) => {
        if (noteId) {
            firebase.firestore().collection('notes').doc(noteId).update(data);
            if (data.title) {
                firebase.firestore().collection('noteLists').doc(user.uid).update({
                    notes: [
                        ...(noteList.notes.filter(({id}) => id !== noteId)),
                        { id: noteId, title: data.title }
                    ]
                });
            }
        }
    };

    const getSearchResults = () => {
        const re = new RegExp(searchValue.toLowerCase());
        return noteList.notes.filter(({ title }) => re.test(title.toLowerCase()));
    };

    const handleClickResult = (id) => {
        setNoteId(id);
        setSearchValue('');
    };

    const displayText = () => {
        let result = [note?.text || ''];

        noteList.notes.forEach(({ title, id }) => {
            result = result.reduce((acc, cur, i) => {
                if(title && (typeof cur === 'string') && cur.includes(title)) {
                    return [
                        ...acc,
                        ...(cur.split(title).reduce((acc2, cur2, j) => ([
                            ...acc2,
                            (
                                <span 
                                    className='Notes-Link' 
                                    key={`link-${title}-${i}-${j}`}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setNoteId(id);
                                    }}
                                >
                                    {title}
                                </span>
                            ),
                            cur2
                        ])))
                    ];
                } else {
                    return [...acc, cur];
                }
            }, []);
        });

        return result;
    };

    useEffect(() => {
        // textareaRef.current && textareaRef.current.focus();
    }, [isEdit]);

    const searchResults = getSearchResults();
    const showEdit = isEdit || !note?.text;

    const renderNote = () => (
        <>
            <TextInput 
                value={note?.title || ''}
                onChange={value => updateNote({title: value})}
                placeholder="title"
            />
            <textarea 
                style={{display: showEdit ? 'block' : 'none'}}
                ref={textareaRef}
                value={tempText}
                onChange={e => setTempText(e.target.value)}
                placeholder="note"
                onBlur={e => {
                    updateNote({text: e.target.value});
                    setIsEdit(false);
                }}
            />
            <div
                style={{display: !showEdit ? 'block' : 'none'}}
                className='Notes-Text'
                onClick={() => {
                    setIsEdit(true);
                }}
            >
                {displayText()}
            </div>
        </>
    );

    return (
        <div className='Notes'>
            <header>
                <Icon name="search" className='Notes-SearchIcon' />
                <TextInput
                    value={searchValue}
                    onChange={setSearchValue}
                />
                <Dropdown open={searchValue}>
                    {searchResults.map(({id, title}) => (
                        <span key={`searchresult-${title}`} onClick={() => handleClickResult(id)}>{title}</span>
                    ))}
                    {!searchResults.map(r => r.title).includes(searchValue) && (
                        <span key='new' onClick={() => newNote({title: searchValue})}>Add {searchValue}</span>
                    )}
                </Dropdown>
            </header>
            <main>
                { (noteId && note) ? 
                    renderNote() 
                : 
                    <div className='Notes-NoteList'>{
                        noteList.notes.length ? 
                            noteList.notes.map(({title, id}) => (
                                <span 
                                    className='Notes-Link' 
                                    key={`link-${title}`}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setNoteId(id);
                                    }}
                                >
                                    {title}
                                </span>
                            )) 
                        : 
                            <div>Use the search bar to create your first note</div>
                    }</div>
                }
            </main>
            <footer>
                {noteId && 
                    <>
                        <IconButton onClick={handleDelete} requireConfirm><Icon name="trash" /></IconButton>
                        <span style={{flex: 1}}/>
                        <IconButton onClick={() => {
                            setNoteId(null);
                            setNote(null);
                        }} ><Icon name="times" /></IconButton>
                    </>
                }
            </footer>
        </div>
    );
};