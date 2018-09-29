# taskQueue.js

<img align="right" height="200" src="https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/128/list_ingredients.png">

A simple micro-utility to track the completion of asynchronous javascript tasks.

This utility makes it easy to track the progress of multiple tasks and runs helpful callbacks based on the queue instance's status.


> Simple demo: https://jsbin.com/holeme/1/edit?js,console

> Progress Bar demo: https://jsbin.com/xecise/16/edit?js,output



## Installation
**Download**
: Simply download and source the file `taskQueue.js`.

```html
<script src="/js/taskQueue.js"></script>
```

**npm**

```bash
npm install @evitolins/taskqueue.js
```

**Bower**

```bash
bower install git://github.com/evitolins/taskQueue.js
```

## Getting started

TaskQueue expects an object containing callbacks for important events during the task queue.

```javascript
/*
 * Instantiate TaskQueue, and define callback functions.
 * The instance is also referenced within itself, to allow access to instance
 * properties.  I'm not crazy about this approach. (ie. 'q.total' etc)
 */
var q = new TaskQueue({
    add : function (queued, total) {
        var loaded = total - queued + 1;
        console.log("add: " + loaded + "/" + total);
    },
    remove : function (queued, total) {
        var loaded = total - queued;
        var percent = (total - queued) / total * 100;
        console.log("remove: " + loaded + "/" + total + " (" + percent + "% complete)");
    },
    complete : function () {
        console.log("completed");
    }
});

/**
 * Creates fake tasks with random completion times, to simulate async behavior.
 * @param  {string} label A simple label for each task to help track the results.
 */
var runFakeTask = function (label) {
    q.add();
    var rand = Math.floor(Math.random() * 1000);
    setTimeout(function () {
        console.log(label + " : " + rand / 1000);
        q.remove();
    }, rand );
};

runFakeTask('a');
runFakeTask('b');
runFakeTask('c');
runFakeTask('d');
runFakeTask('e');
```


## Callbacks
**add**
: Called after task is added and executed.

**remove**
: Called after task is completed.

**complete**
: Called when queue count is reduced to 0.


       
## Use Cases
- a progress bar or countdown for any group of async tasks
