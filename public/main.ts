import { mat4 } from "./lib/gl-matrix-min.js";
import { Cube } from "./models/cube";
import { isMobile } from "./utils";

const lightLocation = [0, 20, -10];

const createCubeGrid = (rows: number, cols: number, size: number) => {
  const cubes: Cube[] = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cube = Cube.createCube(size / 2);

      const cubePosition = mat4.create();
      const offsetX = (cols * size) / 2;
      const offsetZ = (rows * size) / 2;

      mat4.translate(cubePosition, cubePosition, [i * size, -3, j * size]);
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
Cube.setLightPosition(lightLocation);

const canvas: HTMLCanvasElement = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported");
}

Cube.createProgram(gl);
gl.enable(gl.DEPTH_TEST);

let rows: number, cols: number, size: number;
if (isMobile()) {
  rows = 5;
  cols = 5;
  size = 1;
} else {
  rows = 20;
  cols = 20;
  size = 1;
}
const cubes = createCubeGrid(rows, cols, size);

const projectionMatrix = mat4.create();
const viewMatrix = mat4.create();

mat4.perspective(
  projectionMatrix,
  (75 * Math.PI) / 180, // fovy
  canvas.width / canvas.height, //aspect
  1e-4, // near
  1e4 // far
);

const vpMatrix = mat4.create();

const offsetX = (rows * size) / 2;
const offsetZ = (cols * size) / 2;

mat4.rotateX(viewMatrix, viewMatrix, Math.PI / 4);
mat4.translate(viewMatrix, viewMatrix, [-offsetX, -3, -offsetZ * 2]);
mat4.multiply(vpMatrix, projectionMatrix, viewMatrix);

let lastT = Date.now();
const speed = 0.002;
let t = 0;
const animate = () => {
  requestAnimationFrame(animate);

  const newT = Date.now();
  t += (newT - lastT) * speed;
  lastT = newT;
  Cube.setT(t);

  for (const cube of cubes) {
    cube.render(vpMatrix);
  }
};
animate();
