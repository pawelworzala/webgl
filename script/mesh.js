{

    node('createBuffer',function(gl,array,arrayType){

      if(arrayType===undefined){
        arrayType = gl.ARRAY_BUFFER
      }
      const buffer = gl.createBuffer();
      gl.bindBuffer(arrayType, buffer);
      gl.bufferData(arrayType, array, gl.STATIC_DRAW);
      return buffer;

    })
    


    node('setupAttribute',function(gl,shader,buffer,name,size,arrayType){
      
      if(arrayType===undefined){
        arrayType=gl.ARRAY_BUFFER
      }

      gl.bindBuffer(arrayType, buffer);

       const pointer = gl.getAttribLocation(shader.program, name);

       if(pointer>-1){
          gl.vertexAttribPointer(pointer, size, gl.FLOAT, false,0,0) ;
          gl.enableVertexAttribArray(pointer);
       }

    })

    node('createBuffersFromGeometry',function(gl,geometry){

      const F32A=node('F32A')
      const U16A=node('U16A')

      const buffers={}

      for(const key of Object.keys(geometry)){

        if(key==='indices'){

          buffers[key] = node('createBuffer')(gl, U16A(geometry[key]), gl.ELEMENT_ARRAY_BUFFER)

        }else{
          buffers[key] = node('createBuffer')(gl, F32A(geometry[key]))
        }

      }
      
      return buffers

    })


    node('setupAttributesAngGetVAO',function(gl,shader,buffers){

      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      for(const key of Object.keys(buffers)){

        let arraySize= (key==='indices')?1:3
        if(key==='texcoords'){
          arraySize=2
        }
        let arrayType= (key==='indices')? gl.ELEMENT_ARRAY_BUFFER: gl.ARRAY_BUFFER

          node('setupAttribute')(gl,shader, buffers[key], key,arraySize,arrayType)
            
      }

      gl.bindVertexArray(null);

      return vao

    })



    node('createMeshFromGeometry',function(gl,geometry,shader){


      let buffers
      const mesh={
        geometry,
        buffers: buffers=node('createBuffersFromGeometry')(gl, geometry),
        shader,
        vao: node('setupAttributesAngGetVAO')(gl,shader,buffers),
        mode:gl.TRIANGLES,
        uniforms:{},

        render(gl,uniforms){

            gl.useProgram(this.shader.program);


           
            gl.bindVertexArray(this.vao);

            
            const uniformSetter=node('uniformsSetter')(gl,this.shader)

            uniformSetter.set(uniforms)
            uniformSetter.set(this.uniforms??{})
            uniformSetter.set({
              model:this.matrix(),
            })
          
          if(this.geometry.indices){
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

            gl.drawElements(this.mode, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
          }else{
            let count=this.geometry.positions.length/3
            //if(this.mode===gl.POINTS){
            //  count=this.geometry.positions.length/3
            //}
            gl.drawArrays(this.mode, 0, count);
          }
        }
      }

      node('assignSource')(mesh)

      return mesh


    })


}

