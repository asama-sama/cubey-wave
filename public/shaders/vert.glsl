precision mediump float;
uniform mat4 mvpMatrix;
uniform float varySin;
uniform vec3 uLightPos;

attribute vec3 vertex;
attribute vec3 normal;

varying vec3 vNormal;
varying vec3 vVertex;

void main() {
  vVertex = vec3(vertex.x, vertex.y + varySin, vertex.z);
  vNormal = vec3(normal.x, normal.y +  varySin, normal.z );

  gl_Position = mvpMatrix * vec4(vVertex.x, vVertex.y, vVertex.z, 1);
}