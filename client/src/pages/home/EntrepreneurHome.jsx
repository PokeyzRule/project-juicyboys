import React, { useState, useEffect, useContext } from 'react'
import styles from './Entrepreneur.module.scss'
import Navbar from '../../components/Navbar'
import Modal from '@material-ui/core/Modal';
import companyAPI from '../../api/companyAPI';
import { AuthContext } from '../../App';
import entrepreneurAPI from '../../api/entrepreneurAPI';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Homestyles from './Home.module.scss'
import Company from '../../components/Company'
import { Button } from '@material-ui/core';


function EntrepreneurHome() {
    const { state } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const [name, setname] = useState("")
    const [disc, setdisc] = useState("")
    const [success, setSuccess] = useState(false)
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false);
    const [ newCompanies , setNewCompanies ] = useState([]);
    const [ allCompanies, setAllCompanies ] = useState([]);
    const [ companiesLoading, setCompaniesLoading ] = useState(true)

    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }

    const handleCompanySearch = (e) => {
        if (e.target.value != ""){
            const filteredCompanies = allCompanies.filter((company) => company.name.toLowerCase().includes(e.target.value.toLowerCase()) || company.description.toLowerCase().includes(e.target.value.toLowerCase()));
            setNewCompanies(filteredCompanies)
        }else{
            setNewCompanies(allCompanies)
        }
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
            console.log(res)
        }).then(() => {
            companyAPI.createCompany({
                name: name,
                description: disc,
                owners: [profile]
            }).then((res) => {
                if (res.data.status === "success") {
                    setOpen(false)
                    setSuccess(true)
                }
            })
        })
    }

    useEffect(() => {
        entrepreneurAPI.getEntrepreneurByID(state.user.id).then((res) => {
            setCompanies(res.data.startups)
            setLoading(false)
            companyAPI.allCompanies().then((res) => {
                setAllCompanies(res.data.companies);
                setNewCompanies(res.data.companies)
                setCompaniesLoading(false)
            })
        })
    }, [])

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div className={Homestyles.container}>
            <Navbar />
            <div className={Homestyles.overlay}>
                <h1 className={Homestyles.welcome}>Welcome back <span className={Homestyles.highlight}>Keshavaa!</span></h1>
            </div>
            <div className={Homestyles.header}>
                <div className={Homestyles.classes}>
                    <h3>Your Companies</h3>
                    <p>See all of your startups here!</p>
                </div>
                <button className={styles.create} onClick={(e) => handleOpen(e)}>Create Company</button>
            </div>

            <div className={Homestyles.divider}></div>
            <div className={Homestyles.courseContainer}>
                {loading ? <h1>Loading</h1> : 
                companies.map((company) => {
                    return(
                        <Company company={company}/>
                    )
                })
                }
            </div>


            
            <div className={Homestyles.header}>
                <div className={Homestyles.classes}>
                    <h3>New Startups!</h3>
                    <p>Join new and upcoming startups here!</p>
                </div>
                <div className={Homestyles.searchContainer}>
                    <input placeholder={"Search by name or teacher!"} className={Homestyles.search} onChange={(e) => handleCompanySearch(e)}/>
                </div>
            </div>
            <div className={Homestyles.divider}></div>

            <div className={Homestyles.courseContainer}>
                {companiesLoading ? <h1>Loading</h1> : 
                newCompanies.map((company) => {
                    return(
                        <Company company={company}/>
                    )
                })
                }
            </div>




           
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
