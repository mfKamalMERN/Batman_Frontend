import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { TableDisplayer } from "../Components/TableDisplayer"

export const MyProfile = () => {
    const [lbatman, setLbatman] = useState([])
    const [myfollowings, setMyfollowings] = useState([])
    const [myfollowers, setMyfollowers] = useState([])
    const [followingsstatus, setFollowingsstatus] = useState(false)
    const [followersstatus, setFollowersstatus] = useState(false)
    const [batmanid, setBatmanid] = useState(null)
    const nav = useNavigate()
    const { bid } = useParams()

    axios.defaults.withCredentials = true
    const tokenChecker = () => {
        axios.get(`http://localhost:9000/getbatmandetails/${bid}`)
            .then(res => {
                if (!res.data.Token) {
                    localStorage.clear()
                    nav('/')
                }

                else {
                    setLbatman(res.data.LoggedBatman)
                    setBatmanid(bid)
                    if (followersstatus || followingsstatus) {
                        setFollowersstatus(false)
                        setFollowingsstatus(false)
                    }
                }
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()

    }, [bid])

    const MyFollowings = async () => {
        try {
            setFollowingsstatus(!followingsstatus)
            setFollowersstatus(false)
            const res = await axios.get(`http://localhost:9000/getmyfollowings/${batmanid}`)
            setMyfollowings(res.data.Followings)

        } catch (error) {
            console.log(error);
        }
    }

    const MyFollowers = async () => {
        try {
            setFollowingsstatus(false)
            setFollowersstatus(!followersstatus)
            const res = await axios.get(`http://localhost:9000/getmyfollowers/${bid}`)
            setMyfollowers(res.data.Followers)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="all" style={{ display: "flex", flexDirection: "column" }}>

            <Navbar />

            <h2 style={{ marginTop: "5%" }}>My Profile</h2>

            <div className="table" style={{ marginTop: "2%", display: "flex", justifyContent: "center" }}>

                <table border={1} style={{ width: "40%" }}>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Avatar</th>
                            <th>Posts</th>
                            <th>Following</th>
                            <th>Followers</th>
                        </tr>
                    </thead>

                    {
                        lbatman.map((batman) => (

                            batman._id != localStorage.getItem('Id') ?

                                <tbody>
                                    <tr>
                                        <td>{batman.Name}</td>

                                        <td><img src={batman.DP} alt="" style={{ width: "40px", borderRadius: "80px", height: "auto" }} /></td>

                                        <td>{batman.Posts.length}</td>

                                        <td><button onClick={MyFollowings}>{batman.Following.length}</button></td>

                                        <td><button onClick={MyFollowers}>{batman.Followers.length}</button></td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    <tr>
                                        <td>{batman.Name}<button> ✏️Name</button></td>

                                        <td><img src={batman.DP} alt="" style={{ width: "40px", borderRadius: "80px", height: "auto" }} /><br /><button> ✏️DP</button><br /><button>✏️Pwd</button></td>

                                        <td><button>{batman.Posts.length}</button> <button>➕New</button></td>

                                        <td><button onClick={MyFollowings}>{batman.Following.length}</button></td>

                                        <td><button onClick={MyFollowers}>{batman.Followers.length}</button></td>
                                    </tr>
                                </tbody>

                        ))
                    }


                </table>

            </div>

            <div className="table" style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
                {
                    !followingsstatus ?
                        <></>
                        :
                        <div className="tbl" style={{ display: "flex", flexDirection: "column" }}>

                            <h3>Followings:</h3>
                            <TableDisplayer batmans={myfollowings} />
                        </div>

                }
            </div>

            <div className="table" style={{ display: "flex", justifyContent: "center" }}>

                {
                    !followersstatus ?
                        <></>
                        :
                        <div className="tbl" style={{ display: "flex", flexDirection: "column" }}>

                            <h3>Followers:</h3>
                            <TableDisplayer batmans={myfollowers} MyF={MyFollowers} />
                        </div>
                }
            </div>

        </div>
    )
}