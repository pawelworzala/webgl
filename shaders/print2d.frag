#version 300 es

precision mediump float;

uniform sampler2D colorTexture;

//varying vec3 vColor;
//in vec3 vLighting;
in vec2 vTexCoords;

out vec4 outColor;

void main(void) {

    vec4 diffuseColor = texture(colorTexture, vTexCoords);

    //vec3 color=vec3(vTexCoords.x,vTexCoords.y,0.5);

    outColor = vec4(diffuseColor.rgb, 1.0);

}
