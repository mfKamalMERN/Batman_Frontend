import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

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
        <>
            <form action="" onSubmit={SubmitForm}>

                <label htmlFor="email">Email</label>
                <br />
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                <br />
                <br />

                <label htmlFor="pwd">Password</label>
                <br />
                <input type="password" id="pwd" value={pwd} onChange={e => setPwd(e.target.value)} />

                <br />
                <br />

                <button type="submit">Login</button>

            </form>
        </>
    )
}