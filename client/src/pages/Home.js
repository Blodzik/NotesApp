import { useEffect } from 'react';
import { useNotesContext } from '../hooks/useNotesContext';

//components
import NoteDetails from "../components/NoteDetails";
import NoteForm from '../components/NoteForm';

const Home = () => {
    //const[notes, setNotes] = useState(null);
    const {notes, dispatch} = useNotesContext();

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('/api/notes');
            const json = await response.json();

            if(response.ok) {
                //setNotes(json);
                dispatch({type: 'SET_NOTES', payload: json})
            }
        }

        fetchNotes();
    }, [dispatch])

    return (
        <div className='flex justify-between mt-2'>
            <div className='w-2/3'>
                {notes && notes.map(note => (
                    <NoteDetails note={note} key={note._id} />
                ))}
            </div>
            <div className='w-1/3'>
                <NoteForm />
            </div>
        </div>
    )
}

export default Home;