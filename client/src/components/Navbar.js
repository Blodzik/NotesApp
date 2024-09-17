import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <header>
            <div className='bg-white mx-auto px-[20px] py-[10px] flex items-center justify-center'>
                <Link to='/'>
                    <h1 className='text-2xl font-bold'>Notes App</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;