import {io} from 'socket.io-client'
import { baseAPI_URL } from './utils/API'

export const socket = io(baseAPI_URL, {transports: ['websocket']})