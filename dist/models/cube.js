"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cube = void 0;
const utils_1 = require("../utils");
const vert_glsl_1 = __importDefault(require("../shaders/vert.glsl"));
const frag_glsl_1 = __importDefault(require("../shaders/frag.glsl"));
class Cube {
    constructor(vertices, normals) {
        this.vertices = vertices;
        this.normals = normals;
    }
    setPosition(positionMatrix) {
        this.positionMatrix = positionMatrix;
    }
    setCenterInitial(center) {
        this.centerInitial = center;
    }
    getPosition() {
        return this.positionMatrix;
    }
    render(mvpMatrix) {
        Cube.gl.bindBuffer(Cube.gl.ARRAY_BUFFER, Cube.vertexBuffer);
        Cube.gl.bufferData(Cube.gl.ARRAY_BUFFER, this.vertices, Cube.gl.STATIC_DRAW);
        Cube.gl.bindBuffer(Cube.gl.ARRAY_BUFFER, Cube.normalBuffer);
        Cube.gl.bufferData(Cube.gl.ARRAY_BUFFER, this.normals, Cube.gl.STATIC_DRAW);
        Cube.gl.uniformMatrix4fv(Cube.uniforms.mvpMatrixLocation, false, mvpMatrix);
        const varySin = Math.sin(1.15 * (this.centerInitial[0] + this.centerInitial[2] + Cube.t / 50.0));
        Cube.gl.uniform1f(Cube.uniforms.varySinLoc, varySin);
        Cube.gl.uniform3fv(Cube.uniforms.lightPosition, Cube.lightPosition);
        Cube.gl.drawArrays(Cube.gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}
_a = Cube;
Cube.uniforms = {
    mvpMatrixLocation: null,
    varySinLoc: null,
    lightPosition: null,
};
Cube.t = 0;
Cube.setT = (t) => {
    Cube.t = t;
};
Cube.setLightPosition = (lightPosition) => {
    Cube.lightPosition = lightPosition;
};
Cube.createProgram = (gl) => {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vert_glsl_1.default);
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, frag_glsl_1.default);
    gl.compileShader(fragmentShader);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    _a.program = program;
    _a.vertexBuffer = gl.createBuffer();
    const vertexLocation = gl.getAttribLocation(program, "vertex");
    gl.enableVertexAttribArray(vertexLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, _a.vertexBuffer);
    gl.vertexAttribPointer(vertexLocation, 3, gl.FLOAT, false, 0, 0);
    _a.normalBuffer = gl.createBuffer();
    const normalLocation = gl.getAttribLocation(program, "normal");
    gl.enableVertexAttribArray(normalLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, _a.normalBuffer);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
    const mvpMatrixLocation = gl.getUniformLocation(program, "mvpMatrix");
    _a.uniforms.mvpMatrixLocation = mvpMatrixLocation;
    const varySin = gl.getUniformLocation(program, "varySin");
    _a.uniforms.varySinLoc = varySin;
    const lightPosition = gl.getUniformLocation(program, "uLightPos");
    _a.uniforms.lightPosition = lightPosition;
    gl.useProgram(program);
    _a.gl = gl;
};
// prettier-ignore
Cube.createCube = (s) => {
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
    ];
    const normals = [
        ...(0, utils_1.repeat)(6, [0, 0, 1]),
        ...(0, utils_1.repeat)(6, [-1, 0, 0]),
        ...(0, utils_1.repeat)(6, [1, 0, 0]),
        ...(0, utils_1.repeat)(6, [0, 0, -1]),
        ...(0, utils_1.repeat)(6, [0, 1, 0]),
        ...(0, utils_1.repeat)(6, [0, -1, 0])
    ];
    return new Cube(new Float32Array(vertices), new Float32Array(normals));
};
exports.Cube = Cube;
//# sourceMappingURL=cube.js.map