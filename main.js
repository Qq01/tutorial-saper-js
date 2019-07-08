const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

let currentScene = null;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

document.body.appendChild(canvas);
let metrics = null;

/**
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {{x:number, y: number}} config
 */
function drawButton(context, text, {x, y, width, height, background, textColor}) {
    const textHeight = 18;
    context.font = `${textHeight}px sans-serif`;
    context.textBaseline = 'top';
    const textWidth = context.measureText(text).width;
    context.fillStyle = background;
    context.fillRect(x, y, width, height);
    context.fillStyle = textColor;
    context.fillText(text, x + ((width - textWidth) / 2), y + ((height - textHeight) / 2));
}

function menuScene(context, time) {
    drawButton(context, 'SaperJS', {x: (canvasWidth/2) - 100, y: 0, width: 200, height: 50, background: 'white', textColor: 'rgb(100, 100, 255)'})
    drawButton(context, 'Nowa Gra', {x: (canvasWidth/2) - 100, y: 100, width: 200, height: 50, background: 'rgb(200, 200, 255)', textColor: 'rgb(50, 50, 255)'});
}
menuScene.init = function() {
    canvas.onclick = function(e) {
        if (e.x >= (canvasWidth/2) - 100 && e.x <= (canvasWidth/2) + 100) {
            if (e.y >= 100 && e.y <= 150) {
                setCurrentScene(mineScene);
            }
        }
    };
};
menuScene.dest = function() {
    canvas.onclick = null;
};
function mineScene(context, time) {
    drawButton(context, 'Tu powinnno być pole minowe', {x: (canvasWidth/2) - 100, y: 100, width: 200, height: 50, background: 'rgb(200, 200, 255)', textColor: 'rgb(50, 50, 255)'});
    
}
mineScene.init = function() {

};
mineScene.dest = function() {

};
function setCurrentScene(scene) {
    if (currentScene != null) {
        currentScene.dest();
    }
    currentScene = scene;
    scene.init();
}
setCurrentScene(menuScene);
let previousTime = performance.now();
function update(elapsedTime) {
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    const bcRect = canvas.getBoundingClientRect();
    canvasWidth = canvas.width = bcRect.width;
    canvasHeight = canvas.height = bcRect.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    currentScene(context, deltaTime);
    requestAnimationFrame(update);
}
requestAnimationFrame(update);