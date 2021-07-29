import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import CompanyPageStyles from './CompanyPage.module.scss'
import Navbar from '../../components/Navbar'
import { Button } from '@material-ui/core';
import Post from '../../components/Post'
import companyAPI from '../../api/companyAPI'
import entrepreneurAPI from '../../api/entrepreneurAPI';
import postAPI from '../../api/postAPI'
import CreatePost from '../../components/CreatePost';
import { AuthContext } from '../../App';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import UploadDocument from '../../components/UploadDocument/UploadDocument'
import AddIcon from '@material-ui/icons/Add'
import Document from '../../components/Document'

function CompanyPage() {
    const { state } = useContext(AuthContext)
    const user = JSON.parse(state.user)
    const { id } = useParams()
    const [company, setCompany] = useState()
    const [posts, setPosts] = useState([])
    const [owners, setOwners] = useState([])
    const [documents, setDocuments] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [docOpen, setDocOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const toggleCreatePost = () => setIsOpen(!isOpen);

    const toggleUploadDocument = () => setDocOpen(!docOpen)

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

        entrepreneurAPI.getEntrepreneurByEmail(email).then(res => {
            if (res.data.status === 'Success') {
                companyAPI.addOwner({
                    companyID: company.companyID,
                    newOwner: res.data.user
                }).then(res => {
                    if (res.data.status === 'success') {
                        setOpen(false)
                        setSuccess(true)
                    }
                })
            } else {
                setOpen(false)
                setSuccess(true)
            }
        })
    }

    const handleFollow = () => {
        isFollowing ? companyAPI.removeFollower({ userID: user.id, companyID: company.companyID })
            : companyAPI.addFollower({ userID: user.id, companyID: company.companyID })

        setIsFollowing(!isFollowing)
    }

    useEffect(() => {
        companyAPI.getCompanyByID(id).then(response => {
            let company = response.data.company
            setCompany(company)
            setOwners(company.owners)
            setDocuments(company.documents)
            setIsFollowing(company.followers.includes(user.id))
        }).then(() => {
            postAPI.getPostsByCourseId(id).then((res) => {
                setPosts(res.data.posts)
                setLoading(false)
            })
        })
    }, [id])

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div>
            < Navbar />
            <div className={CompanyPageStyles.infoBar}>
                <div className={CompanyPageStyles.info}>
                    <h1>Company</h1>
                    <h2>
                        {loading ?
                            'Loading...'
                            :
                            company.name
                        }
                    </h2>
                </div>
                <div className={CompanyPageStyles.info}>
                    <h1>Description</h1>
                    <h2>
                        {loading ?
                            'Loading...'
                            :
                            company.description
                        }
                    </h2>
                </div>
                <div className={CompanyPageStyles.info}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={!isFollowing ? <AddIcon /> : null}
                        className={CompanyPageStyles.follow}
                        onClick={handleFollow}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                </div>
            </div>

            <div className={CompanyPageStyles.wrapper}>
                <div className={CompanyPageStyles.container}>
                    <div className={CompanyPageStyles.contentContainer}>
                        <div className={CompanyPageStyles.ownersContainer}>
                            <h1 className={CompanyPageStyles.header}>
                                {loading ?
                                    'Loading...'
                                    :
                                    owners.length === 1 ? 'Owner' : 'Owners'
                                }
                                {owners.some(owner => owner.email === JSON.parse(state.user).email) && <Button variant="contained" color="primary" style={{ float: 'right' }} onClick={handleOpen}>
                                    Add Owner
                                </Button>}
                            </h1>
                            {loading ?
                                'Loading...'
                                :
                                owners.map(owner => {
                                    return <p key={owner?.entrepreneurID}>{`${owner?.name} (${owner?.email})`}</p>
                                })
                            }
                            <div className={CompanyPageStyles.modalcontainer}>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <div className={CompanyPageStyles.form}>
                                        <h1 style={CompanyPageStyles.label}>Entrepreneur email</h1>
                                        <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter the email here!" style={CompanyPageStyles.fields} />
                                        <button onClick={(e) => handleSubmit(e)} className={CompanyPageStyles.submit}>Submit!</button>

                                    </div>
                                </Modal>
                                <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleToastClose} severity="success">
                                        The owner has been added successfully!
                                    </Alert>
                                </Snackbar>
                            </div>
                        </div>
                        <div className={CompanyPageStyles.documentsContainer}>
                            <h1 className={CompanyPageStyles.header}>
                                Documents
                                {owners.some(owner => owner.email === JSON.parse(state.user).email) && <Button variant="contained" color="primary" style={{ float: 'right' }} onClick={toggleUploadDocument}>
                                    Upload Documents
                                </Button>}
                            </h1>
                            {docOpen && <UploadDocument
                                setDocuments={setDocuments}
                                handleClose={toggleUploadDocument}
                            />}
                            <div className={CompanyPageStyles.documentList}>
                                {loading ?
                                    'Loading...'
                                    :
                                    documents.map(document => {
                                        return <Document document={document} />
                                    })
                                }
                            </div>
                        </div>
                        {loading ?
                            <h1>Loading</h1>
                            :
                            <div className={CompanyPageStyles.postsContainer}>
                                <h1 className={CompanyPageStyles.header}>
                                    Posts
                                    {owners.some(owner => owner.email === JSON.parse(state.user).email) && <Button variant="contained" color="primary" style={{ float: 'right' }} onClick={toggleCreatePost}>
                                        Create Post
                                    </Button>}
                                </h1>
                                {isOpen && owners.some(owner => owner.email === JSON.parse(state.user).email) && <CreatePost
                                    courseID={id}
                                    posts={posts}
                                    setPosts={setPosts}
                                    handleClose={toggleCreatePost}
                                />}
                                <div className={CompanyPageStyles.divider}></div>
                                <div className={CompanyPageStyles.postsFeed}>
                                    {loading ? <h1>Loading</h1> :
                                        posts.map((post) => {
                                            return (
                                                <Post key={post.postID} post={post} setPosts={setPosts} />
                                            )
                                        })
                                    }
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default CompanyPage