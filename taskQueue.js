/**
 * This object observes a simple queue of tasks by allowing the user to add and
 * remove task programmatically.  It also has the ability to define callbacks
 * to run during the add, remove and complete actions.
 * @type {Object}
 */
  
var TaskQueue = function(){
  var cb = arguments[0];
  
  return {
    queued : 0,
    total : 0,

    /**
     * Executed when task has been added
     */
    add : function (taskFunc) {
      // Pass 'remove' method to be used as a callback.
      if (typeof taskFunc === "function") {
        taskFunc.call(null, this.remove);
      } else return;

      this.queued++;
      this.total++;
      if (typeof cb.added === "function") {
        cb.added.apply();
      }
    },
    /**
     * Executed when task has been completed
     */    
    remove : function () {
      if (this.queued) {
        this.queued--;
        var percent = (this.total - this.queued) / this.total * 100;
        //console.log("taskQueue:" + this.queued + " tasks left (" + percent + "%)");

        // Apply Callback
        if (typeof cb.removed === "function") {
          cb.removed.apply();
        }

        // If complete, apply completion callback
        if (!this.queued) {
          this.complete();
        }
      }
    },
    /**
     * Executed when total queued items reaches 0
     */
    complete : function () {
      this.total = 0;
      this.queued = 0;
      if (typeof cb.completed === "function") {
        cb.completed.apply();
      }
    }
  };
};
