import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Usuario } from './usuario.schema';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/jwt-guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('register')
  async create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const usuario = await this.usuarioService.validateUsuario(
      loginDto.email,
      loginDto.password,
    );
    if (!usuario) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    return { access_token: this.usuarioService.generateToken(usuario) };
  }

  @Post('renew')
  async renewToken(@Body() renewDto: { email: string }) {
    // Asumimos que ya has validado al usuario de alguna forma
    const usuario = await this.usuarioService.findOneByEmail(renewDto.email);
    if (!usuario) {
      throw new UnauthorizedException('Usuario not found.');
    }
    return { access_token: this.usuarioService.generateToken(usuario) };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsuarios() {
    console.log('first');
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneById(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() usuario: Usuario) {
    return this.usuarioService.update(id, usuario);
  }

  @Get('user-teams/:id')
  @UseGuards(JwtAuthGuard)
  async findUserAndTeams(@Param('id') id: string) {
    try {
      const userWithTeams = await this.usuarioService.findUserAndTeams(id);
      if (!userWithTeams) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return userWithTeams;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
