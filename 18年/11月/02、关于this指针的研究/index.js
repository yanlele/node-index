/**
 * create by yanlele
 * create time 2018-11-06 15:42
 */


let index = {
    data: {
        age: 26
    },
    temp1: {
        temp2: {
            temp3: {
                getName: function() {
                    console.log(this);
                },
                age: 25
            }
        }
    }
};

index.temp1.temp2.temp3.getName();