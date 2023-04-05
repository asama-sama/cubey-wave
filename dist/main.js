"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_min_js_1 = require("./lib/gl-matrix-min.js");
const cube_1 = require("./models/cube");
const lightLocation = [10, 10, -10];
const createCubeGrid = (rows, cols, size) => {
    const cubes = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const cube = cube_1.Cube.createCube(size);
            const cubePosition = gl_matrix_min_js_1.mat4.create();
            const offsetX = (cols * size) / 2;
            gl_matrix_min_js_1.mat4.translate(cubePosition, cubePosition, [
                i * size - offsetX,
                -3,
                j * size,
            ]);
            cube.setPosition(cubePosition);
            cube.setCenterInitial([
                (2 * size + i * size) / 2,
                0,
                2 * size + (j * size) / 2,
            ]);
            cubes.push(cube);
        }
    }
    return cubes;
};
cube_1.Cube.setLightPosition(lightLocation);
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
if (!gl) {
    throw new Error("WebGL not supported");
}
cube_1.Cube.createProgram(gl);
gl.enable(gl.DEPTH_TEST);
const cubes = createCubeGrid(60, 60, 1);
const projectionMatrix = gl_matrix_min_js_1.mat4.create();
const viewMatrix = gl_matrix_min_js_1.mat4.create();
gl_matrix_min_js_1.mat4.perspective(projectionMatrix, (75 * Math.PI) / 180, // fovy
canvas.width / canvas.height, //aspect
1e-4, // near
1e4 // far
);
const mvMatrix = gl_matrix_min_js_1.mat4.create();
const mvpMatrix = gl_matrix_min_js_1.mat4.create();
gl_matrix_min_js_1.mat4.rotateX(viewMatrix, viewMatrix, 1);
gl_matrix_min_js_1.mat4.translate(viewMatrix, viewMatrix, [0, -2, -12]);
let t = 0;
const animate = () => {
    requestAnimationFrame(animate);
    cube_1.Cube.setT(t);
    for (const cube of cubes) {
        gl_matrix_min_js_1.mat4.multiply(mvMatrix, viewMatrix, cube.getPosition());
        gl_matrix_min_js_1.mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix);
        cube.render(mvpMatrix);
    }
    t++;
};
animate();
//# sourceMappingURL=main.js.map