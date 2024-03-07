class Response {
  constructor(data = null, message = null) {
    this.data = data;
    this.message = message;
  }
  // ===> WHEN GET METHOD WAS SUCCESSFUL  <===
  Success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "The data fetched successful",
    });
  }
  // ===> WHEN CREATE METHOD WAS SUCCESSFUL <===
  Create(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "The user created successful",
    });
  }
  // ===> WHEN MADE A INTERNAL SERVER ERROR <===
  ServerError(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Internal server error please refresh the page",
    });
  }
  // ===> WHEN MADE A BAD REQUEST <===
  BadRequest(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Invalid data check how you provide data ",
    });
  }
  // ===> WHEN USER IS UNAUTHORIZED <===
  Unauthorized(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message:
        this.message ??
        "You have not access to the resource because you have invalid token ",
    });
  }
  NotFound(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "Endpoint not found",
    });
  }
  ToManyRequest(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message:
        this.message ??
        "Too many request please slow your request or refresh the page",
    });
  }
}
module.exports = Response;
