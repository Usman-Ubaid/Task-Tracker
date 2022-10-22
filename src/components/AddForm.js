const AddForm = () => {
    return (
        <form className="form">

            <div className="form-control">
                <label> Task </label>
                <input type="text" placeholder="Add Task"/>
            </div>

            <div className="form-control">
                <label> Day & Time </label>
                <input type="text" placeholder="Add Day & Time"/>   
            </div>

            <div className="form-control form-control-check">
                <label> Set Reminder </label>
                <input type="checkbox"/>
            </div>

            <input type="submit" value="Submit"/>

        </form>
    )
};

export default AddForm;