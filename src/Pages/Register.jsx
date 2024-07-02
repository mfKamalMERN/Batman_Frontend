import { useEffect, useState } from "react"
import { Navbar } from "../Components/Navbar"
import { useNavigate } from "react-router-dom"
import './Login.css'
import axios from "axios"
import { toast } from "react-toastify"

export const Register = () => {
    const [name, setName] = useState("")
    const [age, setAge] = useState(Number(""))
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const nav = useNavigate()

    axios.defaults.withCredentials = true
    const tokenChecker = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/getallposts`)
            if (!res.data.Token) {
                localStorage.clear()

            }

            else nav('/home')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        tokenChecker()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        axios.post(`http://localhost:9000/registerbatman`, { name, age, email, pwd })
            .then(res => {
                if (res.data.ValidationError) res.data.ActError.map((e) => toast(e.msg))
                else {
                    toast(res.data)
                    nav('/')
                }
            })
            .catch(er => console.log(er))

    }

    return (
        <div className="main" style={{ backgroundColor: "black" }} >

            <Navbar login={true} />

            <br />

            <div className="registercontent" style={{ display: "flex", backgroundColor: "black", minHeight: "100vh", flexDirection: 'row', justifyContent: "space-evenly" }}>

                <div className="batmanimage">
                    <img src="https://i.pinimg.com/originals/36/f5/92/36f592b8a986fe8ea161187cb580c0d5.jpg" alt="" style={{ height: "45%", marginTop: "16.5%", width: "92%", borderRadius: "15px" }} />
                </div>

                <div className="rform" style={{ border: "1px solid wheat", width: "35%", display: "flex", justifyContent: "center", color: "wheat", backgroundColor: 'black', marginTop: "10%", borderRadius: "15px", height: "85%", alignItems: "center", }}>

                    <form action="" onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <h1>Register</h1>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} style={{ width: "80%", backgroundColor: "black", color: "wheat", borderRadius: "15px", textAlign: "center" }} />

                        <br />
                        <br />

                        <label htmlFor="age">Age</label>
                        <br />
                        <input type="number" value={age} id="age" onChange={(e) => setAge(e.target.value)} style={{ width: "80%", backgroundColor: "black", color: "wheat", borderRadius: "15px", textAlign: "center" }} />

                        <br />
                        <br />

                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} style={{ width: "80%", backgroundColor: "black", color: "wheat", borderRadius: "15px", textAlign: "center" }} />

                        <br />
                        <br />

                        <label htmlFor="pwd">Password</label>
                        <br />
                        <input type="password" value={pwd} id="pwd" onChange={(e) => setPwd(e.target.value)} style={{ width: "80%", backgroundColor: "black", color: "wheat", borderRadius: "15px", textAlign: "center" }} />

                        <br />
                        <br />

                        <button type="submit" style={{ backgroundColor: "black", color: "wheat", width: "auto", borderRadius: "15px", minWidth: "8%", marginTop: "4%" }}>Register</button>

                        <br />
                        <br />
                        <hr />

                        <button onClick={() => nav('/')} className="newuser" style={{ backgroundColor: "black", color: "wheat", width: "auto", borderRadius: "15px", minWidth: "8%", marginTop: "4%", marginBottom: "4%" }}>Already a user?</button>
                    </form>
                </div>
            </div>
        </div>
    )
}