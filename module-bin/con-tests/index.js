import { system, world } from '@minecraft/server';
import { AsyncSemaphore } from '../con-api.js';

const {scoreboards} = world;

const a = new Proxy({},{
    get(target,p,receiver){
        console.log(target,p,receiver);
    }
});

Object.setPrototypeOf(String.prototype,a);

"".test;
"".substring(5);