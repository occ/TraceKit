describe('crash', function(){
    /** 
     * If you open runner.html under IE9, it will make the browser become unresponsive because TraceKit will
     * be stuck in an infinite loop in the function `computeStackTraceByWalkingCallerChain` prior to the fix.
     */

    it('it should not go into an infinite loop', function(){
        throw new Error('Boom!');
    });
    
});

/*
describe('catch all errors', function(){

    it('should not hit window.onerror', function(){
        throw new Error('Boom!');
    });
    
});
*/