import { Kernel } from "core/engine"

export function RGB(r,g,b,a = 1){return Kernel.__setPrototypeOf({red:r,green:g,blue:b,alpha:a},new.target?new.target.prototype:RGB.prototype);}
RGB.prototype = {
    set r(v){this.red = v;},
    set g(v){this.green = v;},
    set b(v){this.blue = v;},
    set a(v){this.aplha = v;},
    get r(){return this.red;},
    get g(){return this.green;},
    get b(){return this.blue;},
    get a(){return this.aplha;},
    red:1,
    green:1,
    blue:1,
    alpha:1
}
RGB.fromGray = function(level,alpha = 1){
    return RGB(level,level,level,alpha);
}
/**@readonly */
RGB.white = RGB.fromGray(1);