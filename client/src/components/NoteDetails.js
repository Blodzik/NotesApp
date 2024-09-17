import { useNotesContext } from "../hooks/useNotesContext";

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const NoteDetails = ({ note }) => {
    const { dispatch } = useNotesContext();

    const handleClick = async () => {
        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE'
        })
        const json = await response.json();

        if(response.ok) {
            dispatch({ type: 'DELETE_NOTE', payload: json })
        }
    }

    return (
        <div className='bg-white border m-8 p-2 rounded flex items-center justify-between'>
            <div>
                <h4 className='text-xl text-green-500 text-bold font-bold'>{note.title}</h4>
                <p>{note.text}</p>
                <p className='text-xs text-gray-500'>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
            </div>
            <div>
                <span onClick={handleClick} className='material-symbols-outlined text-xl bg-green-500 text-white rounded-lg mx-4 my-2 px-2 py-1 cursor-pointer hover:bg-green-600 transition duration-300'>delete</span>
            </div>
        </div>
    )
}

export default NoteDetails;