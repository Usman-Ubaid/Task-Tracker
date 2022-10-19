import { FaTimes } from 'react-icons/fa';

const Task = ({ task }) => {
    return (
        <div className="task">
            <h3>{task.text}<FaTimes className='icon'/></h3>
            <p>{task.day}</p>
        </div>
    )
};

export default Task;