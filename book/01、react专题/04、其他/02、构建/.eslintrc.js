// 为react应用额外创建eslint检测
module.exports = {
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "react/display-name": [0],                // DisplayName allows you to name your component. This name is used by React in debugging messages.
        "key-spacing": [2, {                      // enforce spacing between keys and values in object literal properties
            "beforeColon": false,
            "afterColon": true
        }],
        "comma-spacing": ["error", {              // enforce spacing before and after comma
            "before": false,
            "after": true
        }],
        "indent": [                               // this option sets a specific tab width for your code (off by default) */
            "error",
            4
        ],
        "space-infix-ops": 2,                     // require spaces around operators
        "space-before-blocks": [2, "always"],     // require or disallow space before blocks (off by default)
        "quotes": [                               // specify whether backticks, double or single quotes should be used
            "error",
            "single"
        ],
        "semi": [                                 // require or disallow use of semicolons instead of ASI
            "error",
            "always"
        ]
    }
};