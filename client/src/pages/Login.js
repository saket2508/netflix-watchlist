import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom"; 
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const GOOGLE_OAUTH_URI = 'http://localhost:5000/oauth'

export default function Login(props) {
    const { setIsAuthenticated } = useContext(AppContext)
    const [ email, setEmail ] = useState()
    const [ loading, setLoading ] = useState(false)
    const [ password, setPassword ] = useState()

    const [ notif, setNotif ] = useState()

    const submitData = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`/auth/login`, {
                email: email,
                password: password,
            }, {
                withCredentials: true
            })
                console.log(res.data)
                const { message, success } = res.data
                setNotif({message, success})
                if(success === true){
                    console.log('Logged in')
                    setLoading(false)
                    setIsAuthenticated(true)
                    props.history.push('/')
                    window.location.reload()
            }
        } catch (err) {
            console.error(err.message)
            setLoading(false)
            if(err.response){
                const {error} = err.response.data
                setNotif({success: false, message: error})
            }
            else{
                setNotif({success: false, message: 'Error signing in user'})   
            }
        }
    }


    return (
        <div className="container">
            <div className="pt-10 flex justify-center">
                <div className="bg-white dark:bg-card-dark border border-gray-300 dark:border-transparent rounded mx-4 px-6 py-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                    <div className="mt-1 text-center font-bold tracker-wide light:text-gray-700 text-xl font-heading">
                        NETFLIX WATCHLIST
                    </div>
                    <p className="leading-snug text-text-secondary-light dark:text-text-secondary-dark my-3 mt-3 text-center text-sm">
                        Sign in to add movies and shows to your watchlist
                    </p>
                    <div className="w-full mt-6">
                        <button className="w-32 p-1 rounded-md w-full text-sm text-white bg-gray-600 dark:bg-red-400 font-semibold">
                            <a href ={`${GOOGLE_OAUTH_URI}/`}>
                                <i class="fab fa-google pr-2"></i>
                                Sign in with Google
                            </a>
                        </button>
                        <small>
                            OR
                        </small>
                    </div>
                    <form className="w-full flex flex-col w-full" onSubmit={e => submitData(e)}>
                       <div className="mb-2 flex-grow-1">
                            <div className="mt-1">
                                <input type="email" name="email" className="textfield focus:outline-none rounded-full bg-white border border-gray-300 dark:border-transparent dark:bg-search-dark dark:text-white" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                            </div>
                       </div>
                       <div className="mb-2 flex-grow-1">
                            <div className="mt-1">
                                <input type="password" name="password" className="textfield focus:outline-none rounded-full bg-white border border-gray-300 dark:border-transparent dark:bg-search-dark dark:text-white" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                            </div>
                            {notif && <div className="mt-2">
                                {notif.success===true ? <div className="text-green-400 font-bold text-xs">{notif.message}</div> : <div className="text-red-400 font-bold text-xs">{notif.message}</div>}
                            </div>}
                       </div>
                       <div className="my-3 flex-grow-1">
                            {loading===false ? <button type="submit" className="w-32 bg-indigo-500 text-sm sm:text-base text-white p-1 rounded w-full font-semibold">
                               Sign in 
                            </button> : <button type="submit" className="w-32 bg-indigo-300 text-sm sm:text-base text-white p-1 rounded w-full font-semibold" disabled>
                               Loading... 
                            </button>}
                       </div>
                       <div className="pb-1 text-sm text-center text-gray-700 dark:text-gray-400">
                            Don't have an account? <Link to="/register" className="hover:underline text-indigo-600">
                                Sign up
                            </Link>
                       </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
