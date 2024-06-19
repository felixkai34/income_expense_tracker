import { useState } from "react"

export default function Loginform({setEmail,setPassword,signUp,logIn}) {

    const [isLogin,setLogin] = useState("signUp")

    return(

        <main className=" h-auto">

            <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {isLogin === "signUp" ? "Sign up for an account" : "Log in to your account"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input required
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input required
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        {isLogin == "signUp" ? (
                        <button 
                            type="submit" 
                            onClick={signUp}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign Up</button>
                        ):(
                        <button 
                            type="submit" 
                            onClick={logIn}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Log in</button>
                        )}
                    </div>

                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                        {isLogin === "signUp" ? "Already have an account?" : "Don't have an account?"}
                        <button
                            onClick={() => setLogin(isLogin === "signUp" ? "logIn" : "signUp")}
                            className="ml-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {isLogin === "signUp" ? "Log in to your account" : "Sign up for an account"}
                        </button>
                    </p>
            </div>
            </div>
        </main>
    )
}