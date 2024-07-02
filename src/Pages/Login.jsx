import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import './Login.css'
import { Navbar } from "../Components/Navbar"

export const Login = () => {

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const nav = useNavigate()

    axios.defaults.withCredentials = true
    const tokenChecker = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/getallposts`)
            if (!res.data.Token) {
                localStorage.clear()
                nav('/')
            }

            else nav('/home')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        tokenChecker()
    }, [])


    const SubmitForm = (e) => {
        e.preventDefault()

        axios.post(`http://localhost:9000/loginbatman`, { email, pwd })
            .then(res => {
                if (res.data.ValidationError) {
                    res.data.ActError.map((v) => toast(v.msg))
                }

                else if (res.data.AlreadyLoggedin) nav('/home')

                else {

                    if (res.data.LoggedIn) {
                        localStorage.setItem('LoggedBatman', JSON.stringify(res.data.LoggedBatman))

                        localStorage.setItem('Id', res.data.LoggedBatman[0]._id)

                        toast(res.data.Msg)

                        nav('/home')
                    }

                    else if (res.data.Msg === `Incorrect Password`) toast(res.data.Msg)

                    else toast(res.data.Msg)
                }
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="main" style={{ backgroundColor: "black" }} >
            <Navbar login={true} />

            <br />

            <div className="logincontent" style={{ display: "flex", backgroundColor: "black", minHeight: "100vh", flexDirection: 'row', justifyContent: "space-evenly" }}>

                <div className="batmanimage">
                    <img src="https://i.pinimg.com/originals/36/f5/92/36f592b8a986fe8ea161187cb580c0d5.jpg" alt="" style={{ height: "45%", marginTop: "16.5%", width: "92%", borderRadius: "15px" }} />
                </div>

                <div className="form" style={{ border: "1px solid wheat", width: "35%", display: "flex", justifyContent: "center", color: "wheat", backgroundColor: 'black', marginTop: "10%", borderRadius: "15px", height: "60vh", alignItems: "center" }}>

                    <form action="" onSubmit={SubmitForm} style={{ width: "100%" }}>
                        <h1>Login</h1>

                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "80%", backgroundColor: "black", color: "wheat", borderRadius: "15px" }} />

                        <br />
                        <br />

                        <label htmlFor="pwd">Password</label>
                        <br />
                        <input type="password" id="pwd" value={pwd} onChange={e => setPwd(e.target.value)} style={{ width: "80%", backgroundColor: "black", color: "wheat", borderRadius: "15px" }} />

                        <br />
                        <br />

                        <button type="submit" style={{ backgroundColor: "black", color: "wheat", width: "auto", borderRadius: "15px", minWidth: "8%" }}>Login</button>

                        <br />
                        <br />
                        <hr />

                        <button onClick={() => nav('/register')} className="newuser" style={{ backgroundColor: "black", color: "wheat", width: "auto", borderRadius: "15px", minWidth: "8%", marginTop: "4%" }}>New User?</button>
                    </form>


                </div>
            </div>

        </div>
    )
}