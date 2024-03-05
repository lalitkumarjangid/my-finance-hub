import { useState } from "react";
import axios from "axios";

export default function SendMoney(props) {
    async function transferMoney() {
        await axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: props.name._id,
            amount
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        alert("Money Sent!");
        window.location.replace("/dashboard");
    }

    const [amount, setAmount] = useState("");

    return (
        <div className='flex justify-center items-center absolute inset-0 bg-gray-900'>
            <div className='flex flex-col justify-center bg-gray-700 p-6 w-4/12 rounded-lg'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-3xl pt-4 pb-6 text-white'>Send Money</h1>
                </div>

                <div className="flex flex-row">
                    <p className="bg-green-500 text-2xl text-white pl-3 pt-1 mx-4 rounded-full mt-7 w-10 h-10">{props.name.firstName[0]}</p>
                    <p className="font-bold text-2xl pt-8 text-white">{props.name.firstName} {props.name.lastName}</p>
                </div>

                <form action="">
                    <div className='flex flex-col'>
                        <h4 className='pl-4 pb-2 pt-1 font-bold text-white'>Amount (in Rs)</h4>
                        <input
                            type="text"
                            name="username"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder='Enter amount'
                            className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4 text-white'
                        />
                        <button
                            className="bg-green-500 text-white h-10 mx-4 rounded-lg mb-7"
                            onClick={transferMoney}
                        >
                            Initiate Transfer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}