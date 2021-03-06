#version 300 es

in vec3 F;
in vec3 G;
in vec2 H;

uniform mat4 I;
uniform mat4 J;
uniform mat4 K;

//uniform vec3 J;

//out float Q;
out vec3 R;
out vec2 S;

void main (void) {
  
  gl_Position = I * J * K * vec4(F, 1.0);

  R = G;

  S=H;

  //Q = abs(length((mat3(K) * F)-J));

  //Q=8.5/Q;
}