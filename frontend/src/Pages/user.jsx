export default function User(props) {
    <div key={props.item._id} hidden={hidden} className='flex justify-between items-center'>
                <button hidden={hidden} className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4'>{props.item.firstName[0].toUpperCase()}</button>
                <p hidden={hidden} className='font-bold text-xl py-5 pl-1'>{props.item.firstName + " " + props.item.lastName}</p>
                <div className="flex items-center justify-end flex-grow">
                    <button hidden={hidden} className='rounded-lg bg-black text-white w-30 h-10 px-4 mr-4' onClick={() => sendMoney(props.item._id)}>Send Money</button>
                </div>
                {console.log(props.item.firstName)}
            </div>
}