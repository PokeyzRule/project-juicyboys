import React from "react"
import { Tab, Tabs, Paper } from "@material-ui/core";
import styles from './PopupModal.module.scss'
import CreatePost from "../CreatePost";
import CreateAssignment from "../CreateAssignment/CreateAssignment";
import CreateZoom from "../CreateZoom";

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
                        <Tab label="Create Livestream" />
                    </Tabs>
                    {value == 0 ? <CreatePost setPosts={setPosts} handleClose={handleClose} /> : null}
                    {value == 1 ? <CreateAssignment setAssignments={setAssignments} handleClose={handleClose} /> : null}
                    {value == 2 ? <CreateZoom handleClose={handleClose} setAssignments={setAssignments} /> : null}
                </Paper>
            </div>
        </div>
    );
}

export default PopupModal;