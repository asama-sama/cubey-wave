import { mat4 } from "./lib/gl-matrix-min.js";
import { Cube } from "./models/cube";

const lightLocation = [10, 10, -10];

const createCubeGrid = (rows: number, cols: number, size: number) => {
  const cubes: Cube[] = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cube = Cube.createCube(size);

      const cubePosition = mat4.create();
      const offsetX = (cols * size) / 2;

      mat4.translate(cubePosition, cubePosition, [
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
Cube.setLightPosition(lightLocation);

const canvas: HTMLCanvasElement = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported");
}

Cube.createProgram(gl);
gl.enable(gl.DEPTH_TEST);

const cubes = createCubeGrid(60, 60, 1);

const projectionMatrix = mat4.create();
const viewMatrix = mat4.create();

mat4.perspective(
  projectionMatrix,
  (75 * Math.PI) / 180, // fovy
  canvas.width / canvas.height, //aspect
  1e-4, // near
  1e4 // far
);

const mvMatrix = mat4.create();
const mvpMatrix = mat4.create();

mat4.rotateX(viewMatrix, viewMatrix, 1);
mat4.translate(viewMatrix, viewMatrix, [0, -2, -12]);

let t = 0;
const animate = () => {
  requestAnimationFrame(animate);

  Cube.setT(t);
  for (const cube of cubes) {
    mat4.multiply(mvMatrix, viewMatrix, cube.getPosition());
    mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix);
    cube.render(mvpMatrix);
  }
  t++;
};
animate();
