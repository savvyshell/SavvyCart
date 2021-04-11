const errorHandler = (type, err) => {
    return {
        type,
        payload: err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    }
}

export default errorHandler
