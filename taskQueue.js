(function () {'use strict';
    /**
     * This object observes a simple queue of tasks by allowing the user to add and
     * remove task programmatically.  It also has the ability to define callbacks
     * to run during the add, remove and complete actions.
     * @type {Object}
     */
    var TaskQueue = function (callbacks) {
        this.queued = 0;
        this.total = 0;
        this.callbacks = callbacks;
    }

    /**
     * Add task to queue
     * @param {Function} callback Function to be run after task is added
     */
    TaskQueue.prototype.add = function() {
        this.queued++;
        this.total++;
        if (typeof this.callbacks.add === "function") {
            this.callbacks.add.apply(undefined, [this.queued, this.total]);
        }
    };

    /**
     * Remove task from queue
     * @param  {Function} callback Add custom callback function per
     */
    TaskQueue.prototype.remove = function () {
        if (this.queued) {
            this.queued--;
            if (typeof this.callbacks.remove === "function") {
                this.callbacks.remove.apply(undefined, [this.queued, this.total]);
            }    
            if (!this.queued) {
                this.complete();
            }
        }
    };

    /**
     * Should be run when total queued items reaches 0
     */
    TaskQueue.prototype.complete = function () {
        this.total = 0;
        this.queued = 0;
        if (typeof this.callbacks.complete === "function") {
            this.callbacks.complete.apply(undefined, [this.queued, this.total]);
        }
    };

    window.TaskQueue = TaskQueue;
})();