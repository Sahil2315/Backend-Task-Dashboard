import { baseAPI_URL } from "./utils/API";
import './App.css'
import { useRef, useState } from "react";
import { socket } from "./socket";
export default function Mile1(){
    let newReq = useRef()

    let [serverArray, resetServerArray] = useState([])
    let [popup, resetPopup] = useState("")
    let [popupOpacity, resetOpacity] = useState("opacity-0")

    let senderFunction = async () => {
        let request = await fetch(baseAPI_URL + '/assign', {
            'method': 'POST', 
            'headers': {
                'Content-Type': 'application/json'
            }, 
            'body': JSON.stringify({
                'TimeUnits': newReq.current.value
            })
        })
        let response = await request.json()
        resetPopup(response.assigned)
        resetOpacity("")
        setTimeout(()=> {
            resetOpacity("opacity-0")
        }, 5000)
    }

    socket.on("servers", (servers) => {
        resetServerArray(servers)
    })

    return(
        <div className="flex flex-row justify-center align-center mt-8">
            <div className="console rounded-lg pt-2 overflow-x-scroll">
                <span className="ml-4">Milestone-1 Logs (Load Balancing Betweeen Various Servers and  API Endpoints) </span>
                {
                    serverArray.map((server) => {
                        return(
                            <div className="flex flex-col text-blue-400">
                                <div className="ml-8 mt-8 flex flex-row">
                                    <span>{server.serverName}</span>
                                    <span className="ml-4">Request Number: {server.assigned[0]? server.assigned[0].reqNumber: "NA"}</span>
                                    <span className="ml-4">Completed Percentage: {server.assigned[0]? ((server.assigned[0]?.completedTime/server.assigned[0]?.reqTime)*100).toString().slice(0, 4): 0}</span>
                                    <span className="ml-4">Assigned Requests: {server.assigned.length}</span>
                                </div>
                                <div className="flex flex-row ml-8">
                                    <span>Completed Requests: {server.completed.length}</span>
                                    <span className="ml-4">[</span>
                                    {
                                        server.completed.map((completed) => {
                                            return(
                                                <span className="ml-4">Req-{completed.reqNumber}</span>
                                            )
                                        })
                                    }
                                    <span className="ml-4">]</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-1/3 flex flex-col items-center justify-center ">
                <span className="text-xl">Send Requests to the Server</span>
                <input type="number" placeholder="Enter Processing Time" ref={newReq} className="px-2 py-1 rounded mt-8"/>
                <button onClick={senderFunction} className="mt-6 px-8 py-2 bg-indigo-600 rounded bg-opacity-40 hover:bg-opacity-75">Send</button>
                <div className={`mt-4 py-4 px-8 bg-emerald-600 rounded ${popupOpacity}`}>
                    {popup} was Assigned
                </div>
            </div>
        </div>
    )
}