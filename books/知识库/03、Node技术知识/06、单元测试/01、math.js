module.exports = {
    add: (...args) => {
        return args.reduce((prev, curr) => {
            return prev + curr;
        })
    },

    mul: (...args) => {
        return args.reduce((prev,curr)=>{
            return prev*curr;
        })
    }
};