import { useNavigate } from "react-router-dom"

export const TableDisplayer = ({ batmans }) => {
    const nav = useNavigate()
    return (
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

                <tbody>
                    {
                        batmans.map((batman) => (

                            <tr>

                                <td>{batman.Name}</td>

                                <td onClick={() => nav(`/myprofile/${batman._id}`)}><img src={batman.DP} alt="" style={{ width: "25%", borderRadius: "80px", marginTop: "10%" }} /></td>

                                <td><button onClick={() => nav(`/home/${batman._id}`)}>{batman.Posts.length}</button></td>
                                <td>{batman.Following.length}</td>
                                <td>{batman.Followers.length}</td>


                            </tr>

                        ))
                    }

                </tbody>

            </table>
        </div>
    )
}