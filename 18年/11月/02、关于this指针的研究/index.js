/**
 * create by yanlele
 * create time 2018-11-06 15:42
 */


let index = {
    temp1: {
        temp2: {
            temp3: {
                getName: function() {
                    console.log(this);
                }
            }
        }
    }
};

index.temp1.temp2.temp3.getName();