window.addEventListener("load", function () {
    // 返回顶部按钮出现且实现滚动效果
    // 侧边栏固定定位
    var slide_r = document.querySelector(".slide-r");
    var backTop = document.querySelector(".backTop");
    var floor = document.querySelector(".floor");

    var like = document.querySelector(".like");
    var recommend = document.querySelector(".recommend");

    var likeTop = like.offsetTop;
    var slideRTop = slide_r.offsetTop;
    var recommendTop = recommend.offsetTop;
    var floorTop = floor.offsetTop;
    document.addEventListener("scroll", function () {
        // 滚动到进入推荐，右侧边栏显示并固定
        if (window.scrollY >= recommendTop) {
            slide_r.style.visibility = "visible";
            slide_r.style.position = "fixed";
            slide_r.style.top = slideRTop - recommendTop + "px";
        } else {
            slide_r.style.visibility = "hidden";
            slide_r.style.position = "absolute";
            slide_r.style.top = slideRTop + "px";
        }
        // 滚动到进入分栏楼层，显示回到顶部按钮
        if (window.scrollY >= floorTop) {
            backTop.style.display = "block";
        } else {
            backTop.style.display = "none";
        }
    });
    for (let i = 0; i < slide_r.children.length - 1; i++) {
        slide_r.children[i].addEventListener("click", function () {
            const current = floor.children[i].offsetTop;
            animate1(window, current);
        });
    }
    backTop.addEventListener("click", function () {
        animate1(window, 0);
    });
    function animate1(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - window.scrollY) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.scrollY == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            window.scroll(0, window.scrollY + step);
        }, 15);
    }
});
