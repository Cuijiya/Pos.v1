/**
 * Created by cuijiya on 17-7-13.
 */
/*#1计算商品数量 (10min)
 input barcodeArr: [“ITEM000001”, …]

 output includeCountArr: [
 [barcode，count], ...
 ]*/

var barcodeArr= [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
]
function getCount(barcodeArr) {
    var includeCountArr=new Map()
    for (var i of barcodeArr) {
        if (i.indexOf('-')!==-1) {
            var temp = i.split('-')
            if (includeCountArr.has(temp[0])) {
                includeCountArr.set(temp[0], includeCountArr.get(temp[0]) + 1 * temp[1]);
            }
            else {
                includeCountArr.set(temp[0], 1 * temp[1])
            }
        }
        else {
            if (includeCountArr.has(i)) {
                includeCountArr.set(i,includeCountArr.get(i)+1)
            }
            else {
                includeCountArr.set(i,1)
                }
            }
    }
    return includeCountArr
}

/**/
var itemslist=[
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
    },
    {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
    },
    {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
    },
    {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
    }
]

/*#2 找到商品信息（5min）
 input
 includeCountArr: [
 [barcode，count], ...
 ]

 itemslist: [
 {barcode: ..., name: ..., unit: ..., price: …},
 …]

 output goodlist: [
 [barcode, {barcode: ..., name: ..., unit: ..., price: ..., count: ...}],
 …]
*/

function getGoodlist(includeCountArr) {
    var goodlist=new Map()
    for(var i of includeCountArr){
        for(var j of itemslist){
            if(i[0]===j.barcode ) {
                j.count=i[1]
                goodlist.set(i[0],j)
            }
        }
    }
    return goodlist

}

/**/

var promotionArr=[
    {
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
        ]
    }
]

/*
 #3 计算subtotal和discountSubtotal
 input goodlist: [
 [barcode, {barcode: ..., name: ..., unit: ..., price: ..., count: ...}],
 …
 ]

 promotionArr: [
 {type: …
 barcodes: []},
 …
 ]

 output goodlist: [
 [barcode, {barcode: ..., name: ..., unit: ..., price: ..., count: ..., “isPromotion”, subtotal, discountSubtotal}],
 …
 ]
 */

function getGoodlistInfo(goodlist) {
    for (var i of goodlist) {
        i[1].isPromotion = false
        for ( var j of promotionArr) {
            if (j.type==='BUY_TWO_GET_ONE_FREE') {
                for (var  k of j.barcodes) {
                    if (i[0]===k) {
                        i[1].isPromotion = true
                    }
                }

            }
        }
        if (i[1].isPromotion) {
            if (i[1].count>=3) {
                i[1].subtotal=i[1].price*(i[1].count-1)
                i[1].disSubtotal=i[1].price
            }else{
                i[1].subtotal = i[1].price * i[1].count
                i[1].disSubtotal=0
            }
        }else {
            i[1].subtotal = i[1].price * i[1].count
            i[1].disSubtotal=0
        }
    }
    return goodlist
}

/*
 #4计算总价(5 min)
 input goodlist: [
 [barcode, {barcode: ..., name: ..., unit: ..., price: ..., count: ..., “isPromotion”, subtotal, discountSubtotal}],
 …
 ]

 output totalArr: [total, save]
 */

function getTotalArr(goodlist) {
    var totalArr=[],total=0, save=0
    for (var i of goodlist) {
        total+=i[1].subtotal
        save+=i[1].disSubtotal
    }
    totalArr.push(total,save)
    return totalArr
}

/*
 #5 合并信息并打印(8min)
 input
 goodlist: [
 [barcode, {barcode: ..., name: ..., unit: ..., price: ..., count: ..., “isPromotion”, subtotal, discountSubtotal}],
 …
 ]
 totalArr: [total, save]

 output printlist: print

 */

function getPrint(goodlist, totalArr){
    console.log('***<没钱赚商店>收据***')
    for (var i of goodlist) {
        console.log(`名称：${i[1].name}，数量：${i[1].count}${i[1].unit}，单价：${i[1].price}(元)，小计：${i[1].subtotal.toFixed(2)}(元)`);
    }
    console.log(`----------------------\n总计：${totalArr[0].toFixed(2)}(元)\n节省：${totalArr[1].toFixed(2)}(元)\n**********************`);
}


var goodlist = getGoodlistInfo(getGoodlist(getCount(barcodeArr)))
var totalArr = getTotalArr(goodlist)
getPrint(goodlist, totalArr)

