import React from 'react';

export default function AddForm({ 
    setaddFromVisiblity, 
    type, 
    value, 
    detail, 
    setType, 
    setValue, 
    setDetail, 
    handleAddEntry 
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-800 bg-opacity-50">
            <form 
                className="max-w-sm mx-auto border rounded-md p-10 bg-white md:w-1/2 w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddEntry();
                    setaddFromVisiblity("hide");
                    setType("income");
                    setDetail("");
                    setValue("")

                }}
            >
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={detail} 
                    onChange={(e) => setDetail(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type</label>
                <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <div className="flex justify-between">

                    <button 
                        type="button" 
                        onClick={() => setaddFromVisiblity("hide")}
                        className="text-red-700 hover:text-white border border-red-500 hover:bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    > 
                        Close 
                    </button>

                    <button 
                        type="submit"
                        className="text-green-700 hover:text-white border border-green-500 hover:bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    > 
                        Add 
                    </button>

                </div>
            </form>
        </div>
    );
}
