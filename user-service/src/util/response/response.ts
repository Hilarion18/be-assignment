export default {
  serverError(messages, res, flag = 0) {
    res.status(500).send({
      success: false,
      flag,
      messages
    })
  },
  success(message, res, data) {
    res.status(200).send({
      success: true,
      flag: 200,
      message,
      result: data
    })
  },
  error(message, res, flag = 0) {
    res.status(500).send({
      success: false,
      flag,
      message
    })
  },
  notFound(message, res, flag = 0) {
    res.status(404).send({
      success: false,
      flag,
      message
    })
  },
  invalidInput(message, res, flag = 0) {
    res.status(400).send({
      success: false,
      flag,
      message
    })
  },
  unauthorized(message, res, flag = 0) {
    res.status(401).send({
      success: false,
      flag,
      message
    })
  },
  forbidden(message, res, flag = 0) {
    res.status(403).send({
      success: false,
      flag,
      message
    })
  },
  conflict(message, res, flag = 0) {
    res.status(409).send({
      success: false,
      flag,
      message
    })
  }
}