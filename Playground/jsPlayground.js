const datefns = require('date-fns')

// console.log(datefns.format(new Date(), "MM/dd/yyyy"))

let fullName = "Chon"
let lastName = "Rudra"
// console.log(`${fullName} ${lastName}`)

let user = {
  name: 'Bob',
  salary: 100,
  address: {
    provice: 'BKK',
    postcode: 11000
  }
}

// destructuring
// let {name, address: {provice, postcode}} = user
// console.log(`destructuring : ยินดีต้อนรับ ${name} ที่อยู่ ${provice}, ${postcode}`)

// function getSentent( { subject, verb, object }) {
//   return `${subject}: ${verb}, ${object}`
// }

// let o = {
//   subject: 'AA',
//   verb: 'll',
//   object: 'BB'
// }

// console.log( getSentent(o) )

// const f4 = ( x, y ) => (x+y)*x

// console.log(f4( 10, 2 ))

//// for array

let arr = [ 1, 2, 3 ]

for (myArr of arr) {
  console.log(myArr)
}
for (myArrIndex in arr) {
  console.log(myArrIndex)
}
console.log(arr.find( element => element > 1))


