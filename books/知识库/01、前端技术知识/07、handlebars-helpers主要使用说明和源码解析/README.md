# handlebars-helpers主要使用说明和源码解析

[参看项目：handlebars-helpers](https://github.com/helpers/handlebars-helpers)

- Array
    - after
    ```html
    <!-- array: ['a', 'b', 'c'] -->
    {{after array 1}}
    <!-- results in: '["c"]' -->
    ```     

    - before
    ```html
    <!-- array: ['a', 'b', 'c'] -->
    {{before array 2}}
    <!-- results in: '["a", "b"]' -->
    ```
    
    - filter
    ```html
    <!-- array: ['a', 'b', 'c'] -->
    {{#filter array "foo"}}
      AAA
    {{else}}
      BBB
    {{/filter}}
    <!-- results in: 'BBB' -->
    ```
    
    - itemAt
    ```html
    <!-- array: ['a', 'b', 'c'] -->
    {{itemAt array 1}}
    <!-- results in: 'b' -->
    ```
    
    - unique    
     ```html
    <!-- array: ['a', 'a', 'c', 'b', 'e', 'e'] -->
    {{#each (unique array)}}{{.}}{{/each}}
    <!-- results in: 'acbe' -->
    ```
    
    - length
    ```html
    {{length '["a", "b", "c"]'}}
    <!-- results in: 3 -->
    
    <!-- results in: myArray = ['a', 'b', 'c', 'd', 'e']; -->
    {{length myArray}}
    <!-- results in: 5 -->
    
    <!-- results in: myObject = {'a': 'a', 'b': 'b'}; -->
    {{length myObject}}
    <!-- results in: 2 -->
    ```

- string
    - {{toFixed}}
    ```html
    {{toFixed "1.1234" 2}}
    //=> '1.12'
    ```
    
    
- math              
    - {{minus}}
    ```html
    Return the difference of a minus b.
          Params
          
          a {Number}
          b {Number}
    ```    
    
    - {{add}}
    ```html
    Return the sum of a plus b.
        Params
        
        a {Number}
        b {Number}
        returns {Number}
    ```
    
    - {{sum}}
    ```html
    Returns the sum of all numbers in the given array.
    Params
    
    array {Array}: Array of numbers to add up.
    returns {Number}
    
    {{sum "[1, 2, 3, 4, 5]"}}
    <!-- results in: '15' -->
    ```
    
    
    
- comparison ****(非常重要api)      
    - and   
    Helper that renders the block if both of the given values are truthy.                  
    ```html
    <!-- {great: true, magnificent: true} -->
    {{#and great magnificent}}
      A
    {{else}}
      B
    {{/and}}
    <!-- results in: 'A' -->
    ```
    
    - compare   
    Render a block when a comparison of the first and third arguments returns true. The second argument is the arithemetic operator to use. You may also optionally specify an inverse block to render when falsy.                
    a {}            
    operator {}: The operator to use. Operators must be enclosed in quotes: ">", "=", "<=", and so on.          
    b {}            
    
    
- 
    

  
    