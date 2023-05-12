// 定義食物類
class Food { 
    // 定義一個屬性表示食物所對應的元素
    element: HTMLElement;   
    constructor() {
        // 透過 id 獲取元素並賦值給 element
        this.element = document.getElementById('food')!; 
    }
    // 定義一個獲取食物 X 軸座標的方法
    get X() {
        return this.element.offsetLeft;
    }
    // 定義一個獲取食物 Y 軸座標的方法
    get Y() {
        return this.element.offsetTop;
    }
    // 修改食物位置的方法
    change() { 
        // 生成一個隨機的位置
        // 食物的位置最小是 0，最大是 290
        // 蛇移動一次是一格，一格的大小就是 10，所以要求食物的座標必須是整數，即要求生成的隨機數必須是 10 的倍數
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;