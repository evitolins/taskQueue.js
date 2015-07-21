/*
 * Instantiate TaskQueue, and define callback functions.  This is where you
 * would wire up a view to be driven by the TaskQueue's actions.
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