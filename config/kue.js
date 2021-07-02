//module for managing jobs using priority queue
const kue=require('kue');

//creating a new queue
const queue=kue.createQueue();

//exporting it
module.exports=queue;
