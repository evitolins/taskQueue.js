# taskQueue.js

<img align="right" height="200" src="https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/128/list_ingredients.png">

A simple micro-utility to track the completion of javascript tasks.

This utility makes it easy to track the progress of multiple tasks and runs helpful callbacks based on the queue instance's status.

It's important to note that all added tasks are completed asynchronously.  I hope to add an option to choose sync or async queue control in the future.


## Installation
**Basic**
: Simply download and source the file `taskQueue.js`.

```html
<script src="/js/taskQueue.js"></script>
```

**Bower**
: To maintain dependency, you may want to use Bower instead

```bash
bower install git://github.com/evitolins/taskQueue.js
```   

## Getting started

> Live demo: http://jsbin.com/xecise/2/edit?js,console

TaskQueue expects an object containing callbacks for important events during the task queue.

```javascript
/*
 * Instantiate TaskQueue, and define callback functions.
 * The instance is also referenced within itself, to allow access to instance
 * properties.  I'm not crazy about this approach. (ie. 'q.total' etc)
 */
var q = new TaskQueue({
    completed : function () {
        console.log("taskQueueCompletedCallback");
    },
    added : function () {
        var loaded = q.total - q.queued + 1;
        console.log("taskQueueAddCallback: " + loaded + "/" + q.total);
    },
    removed : function () {
        var loaded = q.total - q.queued;
        console.log("taskQueueRemoveCallback: " + loaded + "/" + q.total);
    }
  });

/*
 * Add & execute tasks.
 * These example tasks contain an artificial delay to mimic async behavior.
 * Task functions must accept a callback. Currently, the instance must be
 * passed as the 'this' value when calling the callback. (Not crazy about
 * this approach either)
 */
q.add( function (cb) { var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("a : " + rand/1000); cb.call(q); }, rand ); } );
q.add( function (cb) { var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("b : " + rand/1000); cb.call(q); }, rand ); } );
q.add( function (cb) { var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("c : " + rand/1000); cb.call(q); }, rand ); } );
q.add( function (cb) { var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("d : " + rand/1000); cb.call(q); }, rand ); } );
q.add( function (cb) { var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("e : " + rand/1000); cb.call(q); }, rand ); } );
```


## Callbacks
**added**
: Called after task is added and executed.

**removed**
: Called after task is completed.

**completed**
: Called when queue count is reduced to 0.


       
## Use Cases
- a progress bar or countdown for any group of tasks
