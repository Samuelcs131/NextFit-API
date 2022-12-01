import { Handler, Request, Response, NextFunction } from 'express'

export function resolver (handlerFn: Handler) {
  return (
    (req: Request, res: Response, next: NextFunction) => {
      return (
        Promise.resolve(handlerFn(req, res, next))
          .catch(error => next(error)))
    })
}
