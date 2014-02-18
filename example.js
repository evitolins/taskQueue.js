// Instantiate TaskQueue, and pass callback functions.
// The instance is also referenced within itself, to allow access to instance
// properties.  I'm not crazy about this approach. (ie. 'q.total' etc)
var q = new TaskQueue({
    completed : function() {
      console.log("taskQueueCompletedCallback");
    },
    added : function(){
      var loaded = q.total - q.queued + 1;
      console.log("taskQueueAddCallback: "+ loaded + "/" + q.total);
    },
    removed : function(){
      var loaded = q.total - q.queued;
      console.log("taskQueueRemoveCallback: " + loaded + "/" + q.total);
    }
  }),
  // Collecting a list of tasks, with artificial delay to display async behavior.
  // Task functions must accept a callback. Currently, the instance must be
  // passed as the 'this' value when calling the callback. (Not crazy about
  // this setup either)
  tasks = [
    function(cb){var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("a : " + rand/1000); cb.call(q); }, rand );},
    function(cb){var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("b : " + rand/1000); cb.call(q); }, rand );},
    function(cb){var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("c : " + rand/1000); cb.call(q); }, rand );},
    function(cb){var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("d : " + rand/1000); cb.call(q); }, rand );},
    function(cb){var rand = Math.floor(Math.random() * 1000); setTimeout( function () { console.log("e : " + rand/1000); cb.call(q); }, rand );}
  ],
  task;

// Add/Execute Collected Tasks
for (task in tasks) {
  if (tasks.hasOwnProperty(task)) {
    q.add(tasks[task]);
  }
}
