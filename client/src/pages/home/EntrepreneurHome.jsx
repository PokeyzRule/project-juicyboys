import React, { useState, useContext } from 'react'
import styles from './Entrepreneur.module.scss'
import Navbar from '../../components/Navbar'
import Modal from '@material-ui/core/Modal';
import companyAPI from '../../api/companyAPI';
import { AuthContext } from '../../App';
import entrepreneurAPI from '../../api/entrepreneurAPI';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function EntrepreneurHome() {
    const { state } = useContext(AuthContext)
    const [ open, setOpen ] = useState(false)
    const [name, setname] = useState("")
    const [disc, setdisc] = useState("")
    const [success, setSuccess] = useState(false)

    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleToastClose = () => {
        setSuccess(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var profile;



        entrepreneurAPI.getEntrepreneurByID(state.user.id).then((res) => {
            profile = res.data.user
        }).then(() => {
            companyAPI.createCompany({
                name: name,
                description: disc,
                owners: [profile]
            }).then((res) => {
                if (res.data.status === "success"){
                    setOpen(false)
                    setSuccess(true)
                }
            })
        })
    }



    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    return (
        <div className={styles.container}>
            <Navbar />
            <button className={styles.create} onClick={(e) => handleOpen(e)}>Create Company</button>
            <div className={styles.modalcontainer}>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div className={styles.form}>
                        <h1 style={styles.label}>Company Name</h1>
                        <input onChange={(e) => setname(e.target.value)} placeholder="Enter the name here!" style={styles.fields} />
                        <h1 style={styles.label}>Description</h1>
                        <input onChange={(e) => setdisc(e.target.value)} placeholder="Enter the description here!" style={styles.fields} />
                        <button onClick={(e) => handleSubmit(e)} className={styles.submit}>Submit!</button>

                    </div>
                </Modal>
                <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleToastClose} severity="success">
                    Your Company has been created successfully!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default EntrepreneurHome
