import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../Components/Navbar"

export const MyProfile = () => {
    const [lbatman, setLbatman] = useState([])
    const [myfollowings, setMyfollowings] = useState([])
    const [followingsstatus, setFollowingsstatus] = useState(false)
    const nav = useNavigate()

    axios.defaults.withCredentials = true
    const tokenChecker = () => {
        axios.get(`http://localhost:9000/getbatmandetails`)
            .then(res => {
                if (!res.data.Token) {
                    localStorage.clear()
                    nav('/')
                }

                else {
                    setLbatman(res.data.LoggedBatman)
                }
            })
            .catch(er => console.log(er))
    }

    useEffect(() => {
        tokenChecker()
    }, [myfollowings])

    const MyFollowings = async () => {
        try {
            setFollowingsstatus(!followingsstatus)
            const res = await axios.get(`http://localhost:9000/getmyfollowings`)
            setMyfollowings(res.data.Followings)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="all" style={{ display: "flex", flexDirection: "column" }}>

            <Navbar />
            <h2>My Profile</h2>

            <div className="table" style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>

                <table border={1} style={{ width: "65%" }}>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Following</th>
                            <th>Followers</th>
                            <th>Posts</th>
                            <th>Avatar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            lbatman.map((batman, i) => (

                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{batman.Name}</td>
                                    <td>{batman.Age}</td>
                                    <td>{batman.Email}</td>
                                    <td><button onClick={MyFollowings}>{batman.Following.length} batmans</button></td>
                                    <td><button>{batman.Followers.length} batmans</button></td>
                                    <td>{batman.Posts.length}</td>
                                    <td style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto" }}><img src={batman.DP} alt="" style={{ width: "10%", borderRadius: "80px", height: "auto" }} /></td>
                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {
                !followingsstatus ?
                    <></>
                    :
                    <table border={1} style={{ width: "55%",marginTop:"5%" }}>
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Following</th>
                                <th>Followers</th>
                                <th>Posts</th>
                                <th>Avatar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                myfollowings.map((batman, i) => (

                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{batman.Name}</td>
                                        <td>{batman.Age}</td>
                                        <td>{batman.Email}</td>
                                        <td><button onClick={MyFollowings}>{batman.Following.length} batmans</button></td>
                                        <td><button>{batman.Followers.length} batmans</button></td>
                                        <td>{batman.Posts.length}</td>
                                        <td style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto" }}><img src={batman.DP} alt="" style={{ width: "10%", borderRadius: "80px", height: "auto" }} /></td>
                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>
            }

        </div>
    )
}