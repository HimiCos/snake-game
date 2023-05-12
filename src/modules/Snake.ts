class Snake{
    // 獲取蛇的容器
    element: HTMLElement;
    // 表示蛇頭的元素
    head: HTMLElement;
    // 蛇的身體（包括蛇頭）
    bodies: HTMLCollection

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 獲取蛇頭的 X 座標（蛇頭的座標）
    get X() {
        return this.head.offsetLeft;
    }
    // 獲取蛇頭的 Y 座標
    get Y() {
        return this.head.offsetTop;
    }
    // 設置蛇頭的 X 座標
    set X(value) {

        // 如果新值和舊值相同，則直接返回不再修改
        if (this.X === value) {
            return;
        }

        // X 的合法範圍 0-290 之間
        if (value < 0 || value > 290) {
            // 進入判斷，表示蛇撞牆了，抛出一個異常
            throw new Error("蛇撞牆了！");
        }

        // 修改 X 值時，是在修改水平座標，蛇在左右移動，蛇在向左移動時，不能向右掉頭，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果發生了掉頭，讓蛇向反方向繼續移動
            if (value > this.X) {
                // 如果新值 value 大於舊值 X，則蛇向右掉頭，此時讓蛇繼續向左移動
                value = this.X - 10;
            } else {
                // 向左掉頭
                value = this.X + 10;
            }
        }
        // 移動身體
        this.moveBody();
        // 移動頭部
        this.head.style.left = value + 'px';
        // 檢查有沒有撞到自己
        this.checkHeadBody();
    }
    // 設置蛇頭的 Y 座標
    set Y(value) {

        if (this.Y === value) {
            return;
        }

        // Y 的合法範圍 0-290 之間
        if (value < 0 || value > 290) {
            // 進入判斷，表示蛇撞牆了，抛出一個異常
            throw new Error("蛇撞牆了！");
        }

        // 防止蛇掉頭
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        // 移動身體
        this.moveBody();
        // 移動頭部
        this.head.style.top = value + 'px';
        // 檢查有沒有撞到自己
        this.checkHeadBody();
    }

    // 蛇增加身體的方法
    addBody() {
        // 向 element 中添加一個 div
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }
    // 蛇移動的方法
    moveBody() {
        /*
            將後面的身體設置為前面身體的位置
                举例子：
                    第4節 = 第3節的位置
                    第3節 = 第2節的位置
                    第2節 = 蛇頭的位置
        */
        // 遍歷所有的身體
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 獲取前面身體的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 將值設置到當前身體上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 檢查蛇頭是否撞到身體的方法
    checkHeadBody() {
        // 獲取所有的身體，檢查其是否和蛇頭的座標發生重疊
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 進入判斷，表示蛇頭撞到了身體
                throw new Error("撞到自己了！");
            }
        }
    }
}

export default Snake;