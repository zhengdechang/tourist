var rcgl = {
    regExp:{
        notEmptyReg:/^\S.*\S*$/,
        emailReg:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        mobileReg:/^1(3|4|5|7|8)\d{9}$/
    },
    dataType:{
        userInfo:{
            UserName:'',
            UserEmail:"",
            UserPassword:"",
            UserTel:"",
            payMenu:[],
            note:[],
            learn:[]
        }
    }
}