export const TableDisplayer = ({ batmans, MyFollowings }) => {
    return (
        <table border={1} style={{ width: "55%", marginTop: "5%" }}>
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
                    batmans.map((batman, i) => (

                        <tr>
                            <td>{i + 1}</td>
                            <td>{batman.Name}</td>
                            <td>{batman.Age}</td>
                            <td>{batman.Email}</td>
                            <td><button onClick={MyFollowings}>{batman.Following.length} batmans</button></td>
                            <td><button>{batman.Followers.length} batmans</button></td>
                            <td><button>{batman.Posts.length}</button></td>
                            <td style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto" }}><img src={batman.DP} alt="" style={{ width: "10%", borderRadius: "80px", height: "auto" }} /></td>
                        </tr>

                    ))
                }

            </tbody>

        </table>
    )
}