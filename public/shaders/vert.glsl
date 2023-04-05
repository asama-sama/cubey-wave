precision mediump float;
uniform mat4 mvpMatrix;
uniform mat4 modelMatrix;
uniform float varySin;
uniform vec3 uLightPos;
uniform vec3 uBoxColor;

attribute vec3 vertex;
attribute vec3 normal;

varying vec3 vNormal;
varying vec3 vVertex;
varying vec3 boxColor;

void main() {
  vVertex = vec3(vertex.x, vertex.y + varySin, vertex.z);
  
  vNormal = vec3(normal.x, normal.y + varySin, normal.z );

  boxColor = uBoxColor;

  gl_Position = mvpMatrix * modelMatrix * vec4(vVertex.x, vVertex.y, vVertex.z, 1);
}