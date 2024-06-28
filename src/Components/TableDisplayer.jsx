import { useNavigate } from "react-router-dom"

export const TableDisplayer = ({ batmans, MyF }) => {
    const nav = useNavigate()
    return (
        <table border={1} style={{ width: "40%", marginTop: "5%" }}>
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

                            <td onClick={() => nav(`/myprofile/${batman._id}`)}><img src={batman.DP} alt="" style={{ width: "10%", borderRadius: "80px", height: "auto" }} /></td>

                            <td><button>{batman.Posts.length}</button></td>
                            <td>{batman.Following.length}</td>
                            <td>{batman.Followers.length}</td>


                        </tr>

                    ))
                }

            </tbody>

        </table>
    )
}