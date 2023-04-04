precision mediump float;
varying vec3 vVertex;
varying vec3 vNormal;
uniform float varySin;

uniform vec3 uLightPos;

void main() {
  vec3 toLight;
  vec3 color;
  float cosAngle;
  float normalisedSin;

  toLight = uLightPos - vVertex;
  cosAngle = dot(toLight, normalize(vNormal));
  cosAngle = clamp(cosAngle, 0.0, 1.0);

  normalisedSin = (varySin + 1.0)/2.0;
  color = cosAngle * vec3(1.0 - normalisedSin, normalisedSin, 1.0 - 0.5 * normalisedSin);

  gl_FragColor = vec4(color,1);
}