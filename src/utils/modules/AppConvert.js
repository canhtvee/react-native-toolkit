// import React from 'react';

// const Convert = {
//   round: (value, decimals) => {
//     // console.log('round', value);
//     return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
//   },
//   isJson: object => {
//     let item = typeof object !== 'string' ? JSON.stringify(object) : object;
//     if (typeof object === 'object') {
//       return false;
//     }
//     try {
//       item = JSON.parse(item);
//     } catch (e) {
//       return false;
//     }
//     if (typeof item === 'object' && item !== null) {
//       return true;
//     }
//     return false;
//   },
//   isUrl: value => {
//     const regEx =
//       /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
//     return regEx.test(value);
//   },
//   dataQueryToList: (data = {}) => {
//     const convertList = [];
//     data?.pages?.forEach(element => {
//       if (!element?.data) {
//         return;
//       }
//       if (Array.isArray(element.data)) {
//         convertList.unshift(...element.data);
//       } else {
//         convertList.unshift(element.data);
//       }
//     });
//     return [...new Set(convertList)];
//   },

//   //sort by value property
//   sortObject: obj => {
//     var arr = [];
//     for (var prop in obj) {
//       if (obj.hasOwnProperty(prop) && obj[prop] !== undefined) {
//         arr.push({
//           key: prop,
//           value: obj[prop],
//         });
//       }
//     }
//     arr.sort(function (a, b) {
//       return a.value - b.value;
//     });
//     return arr;
//   },

//   dateToString: timestamp => {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
//   },
// };

// export {Convert};
