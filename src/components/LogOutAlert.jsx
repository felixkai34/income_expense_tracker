export default function LogOutAlert({setshowLogoutAlert,logOut}) {
    return(
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg shadow p-4 md:p-5 text-center">
                    
                        <i className=" text-5xl fa-solid fa-triangle-exclamation mb-5"></i>

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Logout?</h3>
                        
                        <button 
                        onClick={()=>{ logOut() }}
                        className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Logout
                        </button>
   
                        <button 
                        onClick={()=>{ setshowLogoutAlert("hide") }}
                        className="py-2.5 px-5 ml-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
                            No
                        </button>

                    </div>
                </div>

    )
}