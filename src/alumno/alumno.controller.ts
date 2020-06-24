import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param , NotFoundException, Query, createParamDecorator} from '@nestjs/common';
global.fetch = require('node-fetch')

@Controller('alumno')
export class AlumnoController {
        
        @Get('/alumno')
        async getAlumno(@Res() res){
            console.log('pasando por controller alumno')
                let respuesta = await fetch('http://34.95.197.202:8080/alumno');
                respuesta = await respuesta.json();
                return res.HttpStatus(HttpStatus.OK).json({respuesta})
            }

    }



