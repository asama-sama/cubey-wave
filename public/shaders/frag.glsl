precision mediump float;

varying vec3 vVertex;
varying vec3 vNormal;
uniform vec3 uBoxColor;

uniform vec3 uLightPos;

void main() {
  vec3 toLight;
  vec3 color;
  float cosAngle;

  toLight = uLightPos - vVertex; 
  cosAngle = dot(normalize(toLight), normalize(vNormal));
  cosAngle = clamp(cosAngle, 0.0, 1.0);

  color = cosAngle * uBoxColor;

  gl_FragColor = vec4(color,1);
}