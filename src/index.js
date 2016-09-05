import * as babylon from "babylon";
const start=babylon.parse("startCount()");
const end=babylon.parse("endCount()");
console.log(start)
export default function ({ types: t }) {
    return {
        visitor: {
            FunctionExpression(path, state) {
                let subFunction=0;
                if (path.node.async) {
                    path.node.body.body.unshift(start);
                    path.traverse({
                        ArrowFunctionExpression: {
                            enter(){subFunction = 1},
                            exit(){subFunction = 0}
                        },
                        FunctionExpression:{
                            enter(){subFunction = 1},
                            exit(){subFunction = 0}
                        },
                        ReturnStatement(path){
                            if (!subFunction){
                                path.insertBefore(end);
                                console.log('return');
                            }
                        }
                    });
                    path.node.body.body.push(end);
                }
            }
        }
    }
};