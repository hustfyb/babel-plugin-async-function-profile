import * as t from "babel-types";
const startFun=t.expressionStatement(t.callExpression(t.identifier("startProfile"),[]));
const endFun=t.expressionStatement(t.callExpression(t.identifier("endProfile"),[]));
export default function ({ types: t }) {
    return {
        visitor: {
            FunctionExpression(path, state) {
                let subFunction=0;
                //if (path.node.async) {
                    path.node.body.body.unshift(startFun);
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
                                path.insertBefore(endFun);
                                console.log('return');
                            }
                        }
                    });
                    path.node.body.body.push(endFun);
                //}
            }
        }
    }
};