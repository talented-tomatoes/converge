var arr = [{id: 3, msg: 'happy'}, {id: 4, msg: 'birthday'}, {id: 5, msg: 'you'}]


module.exports = (arr, keyField) => Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})))

 // console.log(arrayToObject(arr, 'id'))