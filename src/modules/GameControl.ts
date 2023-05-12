// 引入其他類
import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

// 遊戲控制器
class GameControl {

    // 定義三個屬性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 創建一個屬性來存儲蛇的移動方向（也就是按鍵的方向）
    direction: string = '';
    // 創建一個屬性用來記錄遊戲是否結束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 5);

        this.init();
    }

    // 遊戲初始化方法，調用後遊戲開始
    init() {
        // 綁定鍵盤按鍵按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 調用 run 方法，使蛇移動
        this.run();
    }

    // 定義鍵盤按下的函數
    keydownHandler(event: KeyboardEvent) {
        // 檢查 event.key 的值是否合法（按鍵是否有效）
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(event.key) > -1) {
            // 修改 direction 屬性
            this.direction = event.key;
        }
        
    }
    // 蛇移動的方法
    run() {
        /*
            根據方向（this.direction）來使蛇的位置改變
                向上 top 減少
                向下 top 增加
                向左 left 減少
                向右 left 增加
        */
        // 獲取蛇現在的坐標
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根據按鍵方向來修改 X 和 Y 值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移動 top 減少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移動 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移動 left 減少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移動 left 增加
                X += 10;
                break;
        }

        // 檢查蛇是否吃到了食物
        this.checkEat(X, Y);

        // 修改蛇的 X 和 Y 值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message + ' GAME OVER!');
            this.isLive = false;
        }

        // 開啟一個定時調用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 定義一個方法，用來檢查蛇是否吃到了食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置要進行重置
            this.food.change();
            // 分數增加
            this.scorePanel.addScore();
            // 蛇要增加一節
            this.snake.addBody();
        }
    }
}

export default GameControl;