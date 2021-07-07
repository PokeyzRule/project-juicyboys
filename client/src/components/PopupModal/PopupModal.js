import React from "react"
import { Tab, Tabs, Paper } from "@material-ui/core";
import styles from './PopupModal.module.scss'
import CreatePost from "../CreatePost";
import CreateAssignment from "../CreateAssignment/CreateAssignment";

const PopupModal = ({setPosts, setAssignments, handleClose}) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={styles.popupBox}>
            <div className={styles.box}>
                <span className={styles.closeIcon} onClick={handleClose}>x</span>
                <Paper square style={{ boxShadow: "none" }}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        variant="fullWidth"
                    >
                        <Tab label="Create Post" />
                        <Tab label="Create Assignment" />
                    </Tabs>
                    {value == 0 ? 
                    <CreatePost setPosts={setPosts} handleClose={handleClose} /> :
                    <CreateAssignment setAssignments={setAssignments} handleClose={handleClose} />}
                </Paper>
            </div>
        </div>
    );
}

export default PopupModal;