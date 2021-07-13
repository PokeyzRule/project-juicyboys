import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import CompanyPageStyles from './CompanyPage.module.scss'
import Navbar from '../../components/Navbar'
import { Button } from '@material-ui/core';
import Post from '../../components/Post'
import companyAPI from '../../api/companyAPI'
import postAPI from '../../api/postAPI'
import CreatePost from '../../components/CreatePost';
import { AuthContext } from '../../App';

function CompanyPage() {
    const { state } = useContext(AuthContext)
    const { id } = useParams()
    const [company, setCompany] = useState()
    const [posts, setPosts] = useState([])
    const [owners, setOwners] = useState([])
    const [documents, setDocuments] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const toggleCreatePost = () => setIsOpen(!isOpen);

    const deletePost = async (id) => {
        await postAPI.deletePost(id);
        setPosts(posts.filter(post => post.postID !== id))
    }

    console.log()

    useEffect(() => {
        companyAPI.getCompanyByID(id).then(response => {
            let company = response.data.company
            console.log(company)
            setCompany(company)
            // Uncomment below if you want to test the owners part, since we don't have working data yet
            // company.owners = [{ name: "Elon \"uwu\" Musk", email: "uwu@tesla.com" }]
            company.owners = [{ name: "Elon \"uwu\" Musk", email: "uwu@tesla.com", entrepreneurID: "e1" }, { name: "X AE A-XII Musk", email: "owo@tesla.com", entrepreneurID: "x1" }, { name: "Elon \"uwu\" Musk2", email: "uwu2@tesla.com", entrepreneurID: "e2" }, { name: "X AE A-XII Musk2", email: "owo2@tesla.com", entrepreneurID: "x2" }, { name: "Elon \"uwu\" Musk3", email: "uwu3@tesla.com", entrepreneurID: "e3" }, { name: "X AE A-XII Musk3", email: "owo3@tesla.com", entrepreneurID: "x3" }]
            setOwners(company.owners)
            setDocuments(company.documents)
            // setPosts(company.posts)
        }).then(() => {
            postAPI.getPostsByCourseId(id).then((res) => {
                setPosts(res.data.posts) 
                setLoading(false)
            })
            
        })
    }, [id])

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
            </div>

            <div className={CompanyPageStyles.wrapper}>
                <div className={CompanyPageStyles.container}>
                    <div className={CompanyPageStyles.contentContainer}>
                        <div className={CompanyPageStyles.ownersContainer}>
                            <h1 className={CompanyPageStyles.header}>{loading ?
                                'Loading...'
                                :
                                owners.length === 1 ? 'Owner' : 'Owners'
                            }</h1>
                            {loading ?
                                'Loading...'
                                :
                                owners.map(owner => {
                                    return <p key={owner.entrepreneurID}>{`${owner.name} (${owner.email})`}</p>
                                })
                            }
                        </div>
                        <div className={CompanyPageStyles.documentsContainer}>
                            <h1 className={CompanyPageStyles.header}>Documents</h1>
                            TODO: Render documents next sprint somehow
                        </div>
                        <div className={CompanyPageStyles.postsContainer}>
                            {/* Code from the course page, not sure if its the same or not but it should be similar */}
                            <h1 className={CompanyPageStyles.header}>
                                Posts
                                {company.owners.includes(JSON.parse(state.user).email) && <Button variant="contained" color="primary" style={{ float: 'right' }} onClick={toggleCreatePost}>
                                    Create Post
                                </Button>}
                            </h1>
                            {isOpen && company.owners.includes(JSON.parse(state.user).email) && <CreatePost
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
                                            <Post key={post.postID} post={post} deletePost={deletePost} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )

}

export default CompanyPage