import { baseAPI_URL } from "./utils/API"
import './App.css'
import { useRef, useState } from "react";
import { socket } from "./socket";

export default function Mile2(){
    let [fifo, resetFifo] = useState([])
    let [fifoCompleted, resetFC] = useState([])
    let [priorityQ, resetPriorityQ] = useState([])
    let [completedPQ, resetCPQ] = useState([])
    let [roundRobin, resetRoundRobinQ] = useState([])
    let [completeRR, resetCRR] = useState([])
    let [newestReq, resetnewestReq] = useState(0)

    let reqTime = useRef()
    let prioRef = useRef()

    socket.on("queues", (queues) => {
        resetFifo(queues.fifoQ)
        resetFC(queues.fifoComplete)
        resetPriorityQ(queues.priorityQ)
        resetCPQ(queues.PQCompleted)
        resetRoundRobinQ(queues.roundRobinQ)
        resetCRR(queues.RRQCompleted)
        resetnewestReq(queues.newestReq)
    })

    let senderFunction = async () => {
        let request = await fetch( baseAPI_URL + '/assignToQueue', {
            'method': 'POST', 
            'headers': {
                'Content-Type': 'application/json'
            }, 
            'body': JSON.stringify({
                'TimeUnits': reqTime.current.value,
                'priority': prioRef.current.value
            })
        })
        let response = await request.json()       
    }

    return(
        <div className="flex flex-row justify-center align-center mt-8">
            <div className="console rounded-lg pt-2 pl-4 overflow-x-scroll flex flex-col">
                <span >Milestone-2 Logs (Queuing Using Various Queuing Algorithms) </span>
                <span className="mt-4 text-violet-400">Newest Request: Req{newestReq}</span>
                <div className="flex flex-col">
                    <span className="text-xl mt-8">1. FIFO</span>
                    <div className="flex flex-row text-blue-400">
                        <span>Current FIFO Queue - </span>
                        {
                            fifo.map((request) => {
                                return(
                                    <span className="ml-4">Req{request.reqNumber} - {((request.completedTime/request.reqTime)*100).toString().slice(0, 4) + "%"}</span>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-row text-blue-400">
                        <span>Completed Requests - </span>
                        {
                            fifoCompleted.map((request) => {
                                return(
                                    <span className="ml-4">Req{request.reqNumber} - {((request.completedTime/request.reqTime)*100).toString().slice(0, 4) + "%"}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="mt-8 text-xl">2. Priority Queue</span>
                    <div className="flex flex-row text-blue-400">
                        <span>Current Priority Queue - </span>
                        {
                            priorityQ.map((request) => {
                                return(
                                    <span className="ml-4">Req{request.reqNumber} - Priority-{request.priority} - {((request.completedTime/request.reqTime)*100).toString().slice(0, 4) + "%"}</span>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-row text-blue-400">
                        <span>Completed Requests - </span>
                        {
                            completedPQ.map((request) => {
                                return(
                                    <span className="ml-4">Req{request.reqNumber} - Priority-{request.priority} - {((request.completedTime/request.reqTime)*100).toString().slice(0, 4) + "%"}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="mt-8 text-xl">3. Round Robin Queue - </span>
                    <div className="flex flex-row text-blue-400">
                        <span>Current Round Robin Queue</span>
                        {
                            roundRobin.map((request) => {
                                return(
                                    <span className="ml-4">Req{request.reqNumber} - {((request.completedTime/request.reqTime)*100).toString().slice(0, 4) + "%"}</span>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-row text-blue-400">
                        <span>Completed Requests - </span>
                        {
                            completeRR.map((request) => {
                                return(
                                    <span className="ml-4">Req{request.reqNumber} - {((request.completedTime/request.reqTime)*100).toString().slice(0, 4) + "%"}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="w-1/3 flex flex-col items-center justify-center ">
                <span className="text-xl">Send Requests to the Server</span>
                <input ref={reqTime} type="number" placeholder="Enter Processing Time" className="px-2 py-1 rounded mt-8"/>
                <input ref={prioRef} type="number" placeholder="Enter Priority" className="px-2 py-1 rounded mt-8"/>
                <button onClick={senderFunction} className="mt-6 px-8 py-2 bg-indigo-600 rounded bg-opacity-40 hover:bg-opacity-75">Send</button>
            </div>
        </div>
    )
}