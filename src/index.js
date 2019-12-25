console.log("欢迎参加珠峰公开课");

require('./index.css');
require('./index.less');

// let fn = () => { 
//     console.log('我是es6语法');
// }
// fn();

// class A { 
//     a=1
// }

// let a = new A();
// console.log(a.a)

// import $ from 'expose-loader?$!jquery';  //第三种方式
// console.log(window.$);
import './index.css'
import log from './2.jpeg'
let img = new Image();
img.src = log;
document.body.appendChild(img);


