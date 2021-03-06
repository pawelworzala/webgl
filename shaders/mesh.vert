#version 300 es

in vec3 positions;
in vec3 normals;
in vec2 texcoords;

uniform mat4 projection;
uniform mat4 camera;
uniform mat4 model;

//uniform vec3 camera;

//out float depth;
out vec3 vNormal;
out vec2 vCoord;

void main (void) {
  
  gl_Position = projection * camera * model * vec4(positions, 1.0);

  vNormal = normals;

  vCoord=texcoords;

  //depth = abs(length((mat3(model) * positions)-camera));

  //depth=8.5/depth;
}