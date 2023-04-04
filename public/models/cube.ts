import { repeat } from "../utils";
import vertShader from "../shaders/vert.glsl";
import fragShader from "../shaders/frag.glsl";

export class Cube {
  static program: WebGLProgram;
  static vertexBuffer: WebGLBuffer;
  static normalBuffer: WebGLBuffer;
  static translationMatrixBuffer: WebGLBuffer;
  static gl: WebGLRenderingContext;
  static uniforms = {
    mvpMatrixLocation: null,
    varySinLoc: null,
    lightPosition: null,
  };
  static t = 0;
  static lightPosition: number[];

  private positionMatrix: number[];
  private centerInitial: number[];

  constructor(private vertices: Float32Array, private normals: Float32Array) {}

  static setT = (t) => {
    Cube.t = t;
  };

  static setLightPosition = (lightPosition) => {
    Cube.lightPosition = lightPosition;
  };

  setPosition(positionMatrix: number[]) {
    this.positionMatrix = positionMatrix;
  }

  setCenterInitial(center: number[]) {
    this.centerInitial = center;
  }

  getPosition() {
    return this.positionMatrix;
  }

  render(mvpMatrix) {
    Cube.gl.bindBuffer(Cube.gl.ARRAY_BUFFER, Cube.vertexBuffer);
    Cube.gl.bufferData(
      Cube.gl.ARRAY_BUFFER,
      this.vertices,
      Cube.gl.STATIC_DRAW
    );

    Cube.gl.bindBuffer(Cube.gl.ARRAY_BUFFER, Cube.normalBuffer);
    Cube.gl.bufferData(Cube.gl.ARRAY_BUFFER, this.normals, Cube.gl.STATIC_DRAW);

    Cube.gl.uniformMatrix4fv(Cube.uniforms.mvpMatrixLocation, false, mvpMatrix);

    const varySin = Math.sin(
      1.15 * (this.centerInitial[0] + this.centerInitial[2] + Cube.t / 50.0)
    );
    Cube.gl.uniform1f(Cube.uniforms.varySinLoc, varySin);

    Cube.gl.uniform3fv(Cube.uniforms.lightPosition, Cube.lightPosition);

    Cube.gl.drawArrays(Cube.gl.TRIANGLES, 0, this.vertices.length / 3);
  }

  static createProgram = (gl: WebGLRenderingContext) => {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertShader);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    this.program = program;

    this.vertexBuffer = gl.createBuffer();
    const vertexLocation = gl.getAttribLocation(program, "vertex");
    gl.enableVertexAttribArray(vertexLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(vertexLocation, 3, gl.FLOAT, false, 0, 0);

    this.normalBuffer = gl.createBuffer();
    const normalLocation = gl.getAttribLocation(program, "normal");
    gl.enableVertexAttribArray(normalLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);

    const mvpMatrixLocation = gl.getUniformLocation(program, "mvpMatrix");
    this.uniforms.mvpMatrixLocation = mvpMatrixLocation;

    const varySin = gl.getUniformLocation(program, "varySin");
    this.uniforms.varySinLoc = varySin;

    const lightPosition = gl.getUniformLocation(program, "uLightPos");
    this.uniforms.lightPosition = lightPosition;

    gl.useProgram(program);
    this.gl = gl;
  };

  // prettier-ignore
  static createCube = (s: number) => {
   
      const vertices = [
        // front
        s, s, s,
        s, -s, s,
        -s, -s, s,
        -s, -s, s,
        -s, s, s,
        s, s, s,
        // left
        -s, s, -s,
        -s, s, s,
        -s, -s, -s,
        -s, -s, -s,
        -s, s, s,
        -s, -s, s,
        // right
        s, s, s,
        s, s, -s,
        s, -s, s,
        s, -s, s,
        s, s, -s,
        s, -s, -s,
        // back
        s, s, -s,
        -s, s, -s,
        s, -s, -s,
        s, -s, -s,
        -s, s, -s,
        -s, -s, -s,
        // top
        -s, s, -s,
        s, s, -s,
        -s, s, s,
        -s, s, s,
        s, s, -s,
        s, s, s,
        // bottom
        -s, -s, s,
        s, -s, s,
        -s, -s, -s,
        -s, -s, -s,
        s, -s, s,
        s, -s, -s
      ]
      const normals = [
        ...repeat(6, [0, 0, 1]),
        ...repeat(6, [-1, 0, 0]),
        ...repeat(6, [1, 0, 0]),
        ...repeat(6, [0, 0, -1]),
        ...repeat(6, [0, 1, 0]),
        ...repeat(6, [0, -1, 0])
      ]
      return new Cube(new Float32Array(vertices), new Float32Array(normals))
    }
}
