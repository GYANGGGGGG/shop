
module.exports = {
    user: {//用户
        name: { type: String, required: true },//用户名
        password: { type: String, required: true },//密码
        nickname:{ type: String, default: ''  },//昵称
        avatar:String,//头像
        gender:String,//性别
        ubio: { type: String, default: ''  },//简介
        uDate : String,//注册时间
        position :{ type: String, default: ''  },//位置

    },
    commodity: {//商品详情

        uId: String,//用户ID _id
        cId: String,//商品ID
        sId: { type: String, default: null  },//买家ID
        cname: String,//商品名称
        price: Number,//商品价格
        type:String,//商品类别
        cDescription: { type: String, default: ''  },//商品描述
        imgSrc: String,//商品图片地址
        // imgIndex: Number,//商品图片序列号
        cDate : String,//商品发布时间
        cStatus :{ type: String, default: 'sale'  },//商品状态(sale sold down)(销售中 卖出 下架)

},

    cart:{//购物车
        uId: { type: String },
        cId: { type: String },
        cName: { type: String },
        cPrice: { type: String },
        cImgSrc: { type:String } ,
        cQuantity: { type: Number },
        cStatus : { type: Boolean, default: false  }
    },
    cImg:{//商品图片
        cId: String,
        imgSrc: String,
        imgIndex: Number,
    },
    address:{//收货地址
        uId:String,
        address:String,

    }


};
