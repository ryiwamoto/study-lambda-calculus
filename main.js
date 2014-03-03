Function.prototype.toString = function(){
    return this.name;
};

//チャーチエンコーディングで自然数
function N0(f){
    return function(x){
        return x;
    };
}
function N1(f){
    return function(x){
        return f(x);
    };
}
function N2(f){
    return function(x){
        return f(f(x));
    };
}

//PLUS -> λm n f x. m f (n f x)
function PLUS(m){
    return function(n){
        return function(f){
            return function(x){
                return m(f)(n(f)(x));
            };
        };
    };
}

console.log('PLUS(N2)(N1):', PLUS(N2)(N1));

//TRUE := λx y. x
function TRUE(t){
    return function(f){
        return t;
    };
}

//FALSE := λx y. y
function FALSE(t){
    return function(f){
        return f;
    };
}

//IFTHENELSE := λp x y. p x y
function IF(c){
    return function(x){
        return function(y){
            return c(x)(y);
        };
    };
}
console.log('IF(TRUE)(TRUE)(FALSE):', IF(TRUE)(TRUE)(FALSE));

//NOT := λp. p FALSE TRUE
function NOT(b){
    return b(FALSE)(TRUE);
}
console.log('NOT(TRUE):', NOT(TRUE));
console.log('NOT(FALSE):', NOT(FALSE));

//AND := λp q. p q FALSE
function AND(x){
    return function(y){
        return x(y)(FALSE);
    };
}
console.log('AND(TRUE)(TRUE):', AND(TRUE)(TRUE));
console.log('AND(TRUE)(FALSE):', AND(TRUE)(FALSE));
console.log('AND(FALSE)(TRUE):', AND(FALSE)(TRUE));
console.log('AND(FALSE)(FALSE):', AND(FALSE)(FALSE));

//OR := λp q. p TRUE q
function OR(x){
    return function(y){
        return x(TRUE)(y);
    };
}
console.log('OR(TRUE)(TRUE):', OR(TRUE)(TRUE));
console.log('OR(TRUE)(FALSE):', OR(TRUE)(FALSE));
console.log('OR(FALSE)(TRUE):', OR(FALSE)(TRUE));
console.log('OR(FALSE)(FALSE):', OR(FALSE)(FALSE));

//XOR := λp q. p (NOT q) q
function XOR(x){
    return function(y){
        return x(NOT(y))(y);
    };
}
console.log('XOR(TRUE)(TRUE):', XOR(TRUE)(TRUE));
console.log('XOR(TRUE)(FALSE):', XOR(TRUE)(FALSE));
console.log('XOR(FALSE)(TRUE):', XOR(FALSE)(TRUE));
console.log('XOR(FALSE)(FALSE):', XOR(FALSE)(FALSE));

//CONS := λx xs. λc. c x xs
function CONS(s){
    return function(b){
        return function(f){
            return f(s)(b);
        };
    };
}

function CAR(p){
    return p(TRUE);
}

function CDR(p){
    return p(FALSE);
}

console.log('CAR(CONS(n0)(FALSE)):', CAR(CONS(N0)(CONS(N1)(FALSE))));
console.log('CDR(CONS(n0)(FALSE)):', CDR(CONS(N0)(CONS(N1)(FALSE))));
