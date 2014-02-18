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

    // Exexcute task and pass 'remove' as callback
    add : function (task) {
      if (typeof task === "function") {
        task.call(null, this.remove);
      } else return;

      this.queued++;
      this.total++;
      if (typeof cb.added === "function") {
        cb.added.apply();
      }
    },
    
    // Deincrement queue count, execute callback, and summon 
    // completion if the queue count reaches 0.
    remove : function () {
      if (this.queued) {
        this.queued--;

        if (typeof cb.removed === "function") {
          cb.removed.apply();
        }
        if (!this.queued) {
          this.complete();
        }
      }
    },

    // Clear queue and task total, execute callback.
    complete : function () {
      this.total = 0;
      this.queued = 0;
      if (typeof cb.completed === "function") {
        cb.completed.apply();
      }
    }
  };
};
