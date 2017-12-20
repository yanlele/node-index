function result(code = 0, message = '', data = {}) {
    return {
        message: message,
        code: code,
        data: data
    }
}

module.exports=result;