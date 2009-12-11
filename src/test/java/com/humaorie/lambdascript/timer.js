function Timer() {
    this.begin = null;
    this.end = null;
    this.started = false;

    this.start = function() {
        this.begin = new Date();
        this.started = true;
        return this;
    }

    this.stop = function() {
        this.end = new Date();
        this.started = false;
        return this;
    }

    this.elapsed = function() {
        return this.end.getTime() - this.begin.getTime();
    }

    this.running = function() {
        return this.started;
    }
}
