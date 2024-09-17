import { useState } from "react";
import { useNotesContext } from '../hooks/useNotesContext';

const NoteForm = () => {
    const { dispatch } = useNotesContext();

    const[title, setTitle] = useState('');
    const[text, setText] = useState('');
    const[error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !text) {
            setError('Both title and text are required!');
            return;
        }

        const note = {title, text};

        const response = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (response.ok) {
            setTitle('');
            setText('');
            setError(null);
            console.log('new note added', json);
            dispatch({ type: 'CREATE_NOTE', payload: json })
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mr-20 m-6'>
            <h3 className='text-center text-xl font-bold mb-3'>Add new note</h3>

            <div>
                <label className='flex'>Note Title:</label>
                <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className='rounded p-1 mb-4 w-full'
                />
            </div>

            <div>
                <label className='flex'>Note Text:</label>
                <textarea 
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                ></textarea>
                {/* <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                /> */}
            </div>
            
            <button className='bg-green-500 rounded-xl px-6 py-3 text-white font-bold hover:bg-green-600 transition duraion-300'>Add Note</button>
            
            {error && <div className='text-red-800'>{error}</div>}
        </form>
    )
}

export default NoteForm;