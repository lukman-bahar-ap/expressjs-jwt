class JsonResponse {
  static success(res, msg, data) {
    res.status(200).json({
      code: 200,
      message: msg || 'success',
      data,
    });
  }

  static dataNotFound(res, msg, data) {
    res.status(200).json({
      code: 200,
      message: msg || 'data not found',
      data: data || [],
    });
  }

  static createdSuccess(res, msg, data) {
    res.status(201).json({
      code: 201,
      message: msg || 'new resource has been created',
      data,
    });
  }

  static serverError(res, msg, data) {
    res.status(500).json({
      code: 500,
      message: msg || 'internal server error',
      data,
    });
  }

  static unauthorized(res, msg, data) {
    res.status(401).json({
      code: 401,
      message: msg || 'unauthorized',
      data,
    });
  }

  static badRequest(res, msg, data) {
    res.status(400).json({
      code: 400,
      message: msg || 'bad request',
      data,
    });
  }

  static createError(res, err) {
    if (err.errors[0].message !== undefined) {
      this.badRequest(res, err.errors[0].message);
    }
    this.serverError(res, err);
  }

  static inputRequired(res, msg, data) {
    res.status(400).json({
      code: 400,
      message: msg || 'All input is required',
      data,
    });
  }
}

module.exports = JsonResponse;
