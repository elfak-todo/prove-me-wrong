
import { baseURL } from '../config';

const signalR  = require('@microsoft/signalr');

let connection = new signalR.HubConnectionBuilder().withUrl(baseURL + '/ws').build();

connection.on('send', (data: any) => {
  console.log(data);
});

connection.start().then(() => connection.invoke('send', 'Hello'));