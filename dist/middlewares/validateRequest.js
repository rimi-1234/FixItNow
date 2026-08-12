/** Express 5 exposes req.query as a getter-only property — redefine to write coerced values. */
function setRequestQuery(req, value) {
    Object.defineProperty(req, 'query', {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true,
    });
}
function setRequestParams(req, value) {
    try {
        req.params = value;
    }
    catch {
        Object.defineProperty(req, 'params', {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true,
        });
    }
}
export const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            const parsed = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                cookies: req.cookies,
            });
            // Write coerced/validated values back so controllers see numbers, not strings.
            if (parsed && typeof parsed === 'object') {
                const data = parsed;
                if (data.body !== undefined)
                    req.body = data.body;
                if (data.query !== undefined) {
                    setRequestQuery(req, data.query);
                }
                if (data.params !== undefined) {
                    setRequestParams(req, data.params);
                }
            }
            return next();
        }
        catch (error) {
            next(error);
        }
    };
};
//# sourceMappingURL=validateRequest.js.map