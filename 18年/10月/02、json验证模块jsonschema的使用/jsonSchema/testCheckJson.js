/**
 * create by yanlele
 * create time 2018-10-08 11:07
 */

exports.checkSchema = {
    type: 'object',
    properties: {
        contains: {
            type: 'number',
            minimum: 0,
            maximum: 100
        },
        user: {
            type: 'object',
            properties: {
                phone: {
                    type: 'string',
                    format: 'mobile',
                }
            }
        }

    }
};