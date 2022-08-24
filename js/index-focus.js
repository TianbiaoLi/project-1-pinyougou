window.addEventListener("load", function () {
    var arrow_l = document.querySelector(".arrow-l");
    var arrow_r = document.querySelector(".arrow-r");
    var focus = document.querySelector(".focus");
    // 1.鼠标进入，显示左右按钮
    focus.addEventListener("mouseenter", function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        clearInterval(timer);
        timer = null;
    });
    // 2.鼠标离开，按钮隐藏
    focus.addEventListener("mouseleave", function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        timer = setInterval(function () {
            // 模拟点击右侧按钮即可
            arrow_r.click();
        }, 1800);
    });
    // 3.动态生成li
    var ul = focus.querySelector("ul");
    var ol = focus.querySelector("ol");
    for (let i = 0; i < ul.children.length; i++) {
        // 创建li
        var li = document.createElement("li");
        // 生成li时，添加索引号属性
        li.setAttribute("index", i);
        // 插入ol中
        ol.appendChild(li);
        // 4.li的排他思想
        li.addEventListener("click", function () {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            this.className = "current";
            // 点击li时，要把索引号赋给num以便图片正确滚动
            // 同时也要把索引号赋予circle，以便实现按钮和li的联动
            num = circle = this.getAttribute("index");
            // 5.点击li，图片移动
            // 移动距离=索引号*宽度
            animate(ul, -this.getAttribute("index") * focus.offsetWidth);
        });
    }
    ol.children[0].className = "current";
    // 7.为实现无缝滚动且li的个数正常，克隆图片
    var first = ul.children[0].cloneNode(true);
    // 因为添加图片操作在生成li事件操作之后，因此不会导致li的显示数量变多
    ul.appendChild(first);
    // 6.点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0;
    // 11.设置节流阀，防止点击过快
    var flag = true;
    arrow_r.addEventListener("click", function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // var target = -num * focus.offsetWidth;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            });
            // 8.点击按钮，li小圆圈跟随变化
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 清除小圆圈类名
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            // 为当前li添加类
            ol.children[circle].className = "current";
        }
    });

    // 9.点击左侧按钮，实现功能
    arrow_l.addEventListener("click", function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left =
                    -(ul.children.length - 1) * focus.offsetWidth + "px";
                num = ul.children.length - 1;
            }
            num--;
            // var target = -num * focus.offsetWidth;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            });
            // 8.点击按钮，li小圆圈跟随变化
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 清除小圆圈类名
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            // 为当前li添加类
            ol.children[circle].className = "current";
        }
    });
    // 10.轮播图自动播放功能
    var timer = setInterval(function () {
        // 模拟点击右侧按钮即可
        arrow_r.click();
    }, 1800);
});
