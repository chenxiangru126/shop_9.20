
let objFunction = {

};
if(window.iosObject){
    objFunction.share = iosObject.shareContentTitlePicUrl('分享内容','分享标题','分享图片','分享url');//分享
    // objFunction.closeHtml = iosObject.closeHtml();//关闭H5页面
    objFunction.getUserInfo = iosObject.getUserInfo()//获取用户信息
}
export default objFunction;
