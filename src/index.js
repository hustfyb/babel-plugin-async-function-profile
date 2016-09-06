import * as t from "babel-types";
var  bunyan  = require ("bunyan");
let log = bunyan.createLogger({name: "profile",streams:[{path:"profile.txt"}]});
export class Profile{
    constructor(funName){
        this.funName=funName;
        this.startCount=new Date();
    }
    endProfile(){
        this.spendCount=+new Date()-this.startCount;
        log.info({function:this.funName,spendTime:this.spendCount});
    }
}

import template from "babel-template";
const buildImport = template(`import {Profile} from "babel-plugin-async-function-profile";`,{sourceType:'module'});
//const buildImport = template(`import {Profile} from ".";`,{sourceType:'module'});
const startFun =  template(`let asyncProfiler=new Profile(FUNCTIONNAME);`);
//const startFun=t.expressionStatement(t.callExpression(t.identifier("startProfile"),[]));
const endFun=template(`asyncProfiler.endProfile();`);;
const test=template('exports.online = async function (socket, msg) {}');
export default function ({ types: t }) {
    return {
        visitor: {
            Program(path){
                path.node.body.unshift(buildImport());
            },

            FunctionExpression(path, state) {
                let subFunction=0;
                if (path.node.async) {
                    var funName="unknown";
                    if (path.node.id){
                        funName=path.node.id.name;
                    }else if(path.parent.type==="VariableDeclarator"){
                        funName=path.parent.id.name;
                    }else if(path.parent.type==='AssignmentExpression'){
                        funName=path.parent.left.property.name;
                    }
                    path.node.body.body.unshift(startFun({FUNCTIONNAME:t.stringLiteral(funName)}));
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
                                path.insertBefore(endFun());
                            }
                        }
                    });
                    path.node.body.body.push(endFun());
                }
            }
        }
    }
};