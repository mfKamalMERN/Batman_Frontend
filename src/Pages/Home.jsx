import { fetchPosts } from '../Redux/postSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navbar } from '../Components/Navbar';


export const Home = () => {
    const [likes, setLikes] = useState([])
    const [likesstatus, setLikesstatus] = useState(false)
    const [commentstatus, setCommentstatus] = useState(false)
    const [editstatus, setEditstatus] = useState(false)
    const [removecommentstatus, setRemovecommentstatus] = useState(false)
    const [followstatus, setFollowstatus] = useState(false)
    const [postid, setPostid] = useState(null)
    const [commentid, setCommentid] = useState(null)
    const [newcomment, setNewcomment] = useState("")
    const [updatedcomment, setUpdatedcomment] = useState("")
    const nav = useNavigate()
    const dispatch = useDispatch()

    const datas = useSelector((s) => s.posts)

    const tokenChecker = () => nav('/')

    axios.defaults.withCredentials = true

    useEffect(() => {
        dispatch(fetchPosts())

    }, [likes, newcomment, updatedcomment, removecommentstatus, followstatus])

    const ViewLikesSetter = (pid) => {
        setCommentstatus(false)
        setLikesstatus(!likesstatus)
        setPostid(pid)
        ViewLikes(pid)
    }

    const ViewLikes = async (pid) => {
        try {
            const res = await axios.get(`http://localhost:9000/viewlikes/${pid}`)
            setLikes(res.data.Likes)


        } catch (error) {
            console.log(error);
        }
    }

    const viewComments = (pid) => {
        setLikesstatus(false)
        setCommentstatus(!commentstatus)
        setPostid(pid)
    }

    const LikeUnlike = (pid) => {
        axios.put(`http://localhost:9000/likeunlikepost/${pid}`)
            .then(res => {
                toast(res.data.Msg)
                ViewLikes(pid)
            })
            .catch(er => console.log(er))
    }

    const AddNewComment = async (pid) => {

        try {
            const res = await axios.post(`http://localhost:9000/addcomment/${pid}`, { newcomment })

            toast(res.data.Msg)
            setNewcomment("")

        } catch (error) {
            console.log(error);
        }

    }

    const editStatussetter = ([cid, comment]) => {
        setEditstatus(!editstatus)
        setCommentid(cid)
        setUpdatedcomment(comment)
    }


    const UpdateComment = ([cid, pid]) => {

        if (updatedcomment.trim() === "") toast("Invalid Comment")
        else {
            axios.put(`http://localhost:9000/editcomment/${pid}`, { updatedcomment, cid })
                .then(res => {
                    toast(res.data.Msg)
                    setEditstatus(false)
                    setUpdatedcomment("")
                })
                .catch(err => console.log(err))
        }
        setEditstatus(false)
    }

    const RemoveComment = async (values) => {
        const pid = values[0]
        const cid = values[1]
        try {
            const res = await axios.put(`http://localhost:9000/removecomment/${pid}`, { cid })
            toast(res.data.Msg)
            setRemovecommentstatus(!removecommentstatus)

        } catch (error) {
            console.log(error);
        }

    }

    const FollowUnfollow = async (batmantofollowid) => {
        try {
            const res = await axios.put(`http://localhost:9000/followbatman`, { batmantofollowid })
            setFollowstatus(!followstatus)
            toast(res.data.Msg)


        } catch (error) {
            console.log(error);
        }
    }

    if (datas.isLoading && typeof (datas.data) !== "object") {
        return (
            <>Loading...</>
        )
    }

    else {
        console.log(datas.data);
        return (
            <div className="home" style={{ backgroundColor: "black", minHeight: "150vh" }}>

                {
                    !datas.data.Token ?
                        tokenChecker()
                        :
                        <div className="allposts" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center",color:"wheat" }}>
                            <Navbar />

                            {
                                datas.data.AllPosts.map((post) => (

                                    <div className="card" style={{ border: "1px solid black", minWidth: "30%", display: "flex", flexDirection: "column", alignItems: "center", background: "brown", color: "white", height: "auto", width: "auto", borderRadius: "15px", marginTop: "10%", maxWidth: "90%" }}>

                                        <div className="createdby" style={{ display: "flex", border: "1px solid black", width: "75%", justifyContent: "center", backgroundColor: "darkred", color: "wheat" }}>

                                            <p>Created By: </p>

                                            <div className="ownerdetails" style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly", width: "40%", alignItems: "center" }}>

                                                <p>{datas.data.AllBatman.find((batman) => batman._id == post.Owner).Name}</p>

                                                <img src={datas.data.AllBatman.find((batman) => batman._id == post.Owner).DP} alt="dp" />

                                            </div>

                                        </div>

                                        <p>{post.Caption}</p>
                                        <img src={post.Img} alt="img" style={{ width: "90%", borderRadius: "15px" }} />

                                        <div className="actionbtns">
                                            {
                                                post.Owner == localStorage.getItem('Id') ?
                                                    <>
                                                        <button>✏️</button>
                                                        <button>🪣</button>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </div>

                                        <div className="actionbuttons" style={{ display: "flex", justifyContent: "space-evenly", marginTop: "5%", width: "80%" }}>

                                            {
                                                post.Likes.includes(localStorage.getItem('Id')) ?

                                                    <button onClick={() => LikeUnlike(post._id)} style={{ backgroundColor: "darkgreen", color: "wheat", borderRadius: "15px", width: "auto", fontSize: "small" }}>❤️ ({post.Likes.length})</button>
                                                    :
                                                    <button onClick={() => LikeUnlike(post._id)} style={{ backgroundColor: "darkgreen", color: "wheat", borderRadius: "15px", width: "auto", fontSize: "small" }}>♥️ ({post.Likes.length})</button>
                                            }

                                            <button onClick={() => ViewLikesSetter(post._id)} style={{ backgroundColor: "darkgreen", color: "wheat", borderRadius: "15px", width: "auto", fontSize: "small" }}>ℹ️ Likes</button>

                                            <button onClick={() => viewComments(post._id)} style={{ backgroundColor: "darkgreen", color: "wheat", borderRadius: "15px", width: "auto", fontSize: "small" }}>Comments</button>

                                        </div>
                                        {
                                            !likesstatus && post._id == postid ?
                                                <></>
                                                :
                                                post.Likes.length == 0 ?
                                                    <>No Likes on this post yet</>
                                                    :
                                                    <>
                                                        <h4>Likes</h4>
                                                        {
                                                            likes.map((v) => (

                                                                <div className="likedbatman" style={{ display: "flex", justifyContent: "space-evenly", border: "1px solid black", width: "80%", alignItems: "center", marginTop: "3%", backgroundColor: "darkred", borderRadius: "15px" }}>

                                                                    <div className="likedbatmandetails" style={{ display: "flex", alignItems: 'center', justifyContent: "space-between", width: "25%", marginLeft: "5%" }}>

                                                                        <img src={v.DP} style={{ width: "25%", borderRadius: "50px", height: "auto" }} />

                                                                        <p>{v.Name}</p>

                                                                    </div>

                                                                    <div className="followactions" style={{ display: "flex", alignItems: "center" }}>

                                                                        {
                                                                            v._id == localStorage.getItem('Id') ?
                                                                                <><button onClick={() => nav('/myprofile')}>My Profile</button></>
                                                                                :
                                                                                datas.data.AllBatman.find(batman => batman._id == v._id).Followers.includes(localStorage.getItem('Id')) ?
                                                                                    <button onClick={() => FollowUnfollow(v._id)}>Unfollow</button>
                                                                                    :
                                                                                    <button onClick={() => FollowUnfollow(v._id)}>Follow</button>

                                                                        }
                                                                    </div>

                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                        }

                                        {
                                            !commentstatus && post._id == postid ?
                                                <></>
                                                :
                                                post.Comments.map((cmnt) => (

                                                    <div className="singlecomment" style={{ display: "flex", backgroundColor: "darkred", alignItems: "center", border: "1px solid wheat", marginTop: "5%", borderRadius: "10px", width: "95%" }}>

                                                        <div className="cbatman" style={{ display: "flex", alignItems: "center", width: "80%" }}>

                                                            <img src={datas.data.AllBatman.find((batman) => batman._id == cmnt.CommentedBy).DP} alt="" style={{ width: "20%", borderRadius: "50px", marginLeft: "5%" }} />

                                                            <p style={{ marginLeft: "5%", fontSize: "x-small" }}>{datas.data.AllBatman.find((batman) => batman._id == cmnt.CommentedBy).Name}</p>

                                                        </div>

                                                        <div className="comment" style={{ marginRight: "40%", display: "flex", width: "100%" }}>
                                                            {
                                                                editstatus && cmnt._id == commentid ?
                                                                    <>
                                                                        <input type="text" value={updatedcomment} onChange={e => setUpdatedcomment(e.target.value)} />

                                                                        <button onClick={() => UpdateComment([cmnt._id, post._id])}>Update</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p style={{ fontSize: "smaller", marginLeft: "10%" }}>{cmnt.Comment}</p>
                                                                        {
                                                                            cmnt.CommentedBy == localStorage.getItem('Id') ?
                                                                                <>
                                                                                    <button onClick={() => editStatussetter([cmnt._id, cmnt.Comment])} style={{ height: "70%", marginTop: "3.5%", marginLeft: "3.5%", backgroundColor: "darkgreen", width: "auto", fontSize: "x-small" }}>✏️</button>

                                                                                    <button onClick={() => RemoveComment([post._id, cmnt._id])} style={{ height: "50%", marginTop: "3.5%", marginLeft: "1%", backgroundColor: "red", color: "white", borderRadius: "10px", fontSize: "x-small" }}>Remove</button>
                                                                                </>
                                                                                :
                                                                                <></>
                                                                        }
                                                                    </>

                                                            }

                                                        </div>

                                                        <div className="followactions" style={{ display: "flex", alignItems: "center" }}>

                                                            {
                                                                cmnt.CommentedBy == localStorage.getItem('Id') ?
                                                                    <>😄</>
                                                                    :
                                                                    datas.data.AllBatman.find((batman) => batman._id == cmnt.CommentedBy).Followers.includes(localStorage.getItem('Id')) ?
                                                                        <button onClick={() => FollowUnfollow(cmnt.CommentedBy)} style={{ marginRight: "8px", backgroundColor: "red", color: "white", borderRadius: "15px" }}>Unfollow</button>
                                                                        :
                                                                        <button onClick={() => FollowUnfollow(cmnt.CommentedBy)} style={{ marginRight: "8px", backgroundColor: "darkgreen", color: "wheat", borderRadius: "15px" }}>Follow</button>

                                                            }
                                                        </div>

                                                    </div>
                                                ))
                                        }

                                        <div className="addcomment" style={{ marginTop: "3%", backgroundColor: "brown", width: "100%", marginBottom: "0.7%" }}>

                                            <input type="text" placeholder="Comment..." style={{ width: '80%', backgroundColor: "darkgreen", textAlign: "center", color: "wheat", height: "80%", borderRadius: "50px" }} value={newcomment} onChange={(e) => setNewcomment(e.target.value)} />

                                            <button onClick={() => AddNewComment(post._id)}>➕</button>
                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                }
            </div>
        )
    }





}