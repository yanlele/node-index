常用配置项目
```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "esnext",
    "noImplicitAny": false,     //在表达式和声明上有隐含的any类型时报错
    "typeRoots": [
      "node_modules/@type",
      "typings/modules"
    ],
    "allowJs": true,
    "emitDecoratorMetadata": true, //给源码里的装饰器声明加上设计类型元数据
    "experimentalDecorators": true,//启用实验性的ES装饰器
    "importHelpers": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true,
//    "outDir": "build",
    "baseUrl": ".",
    "lib": ["es6", "dom", "es7"],
    "types" : ["node"],
    "paths": {
      "@route": ["app/src/routes"],
      "@controller": ["app/src/controller"]
    }
  },
  "include": [
    "src/**/*",
    "node_modules/@types/node/index.d.ts"
  ],
  "exclude": [
    "node_modules",
    "test"
  ]
}
```

tslint:             
```
{
  "defaultSeverity": "error",
  // "extends": ["tslint:recommended", "tslint-config-airbnb", "tslint-react"],
  "jsRules": {},
  "rules": {
    "jsx-no-multiline-js": false,
    "quotemark": [true, "single", "jsx-double"],
    "no-console": [true, "warn"],
    "no-unused-expression": [true, "allow-fast-null-checks"],
    "variable-name": [true, "allow-snake-case", "allow-pascal-case"],
    "only-arrow-functions": [
      true,
      "allow-declarations",
      "allow-named-functions"
    ],
    "member-access": false,
    "no-unused-variable": true,
    "interface-name": false,
    "import-name": false,
    "ter-arrow-parens": [true, "as-needed"],
    "object-literal-sort-keys": false,
    "semicolon": [true, "always", "ignore-bound-class-methods"],
    "no-trailing-whitespace": [true, "ignore-blank-lines"],
    "align": false,
    "array-type": [true, "array"],
    "max-line-length": [true, 120]
  },
  "rulesDirectory": []
}
```
