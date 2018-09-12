var My = {
    sqrt: function(x) {
        if (x < 0) throw new Error("负值没有平方根");
        return Math.exp(Math.log(x)/2);
    }
};

module.exports = My;