import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario, UsuarioDocument } from './usuario.schema';
import { Team, TeamDocument } from 'src/team/teams.schema';
import { Player, PlayerDocument } from 'src/players/players.schema';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>, // Inyecta el modelo de Player

    private jwtService: JwtService,
  ) {}

  async create(usuario: Usuario): Promise<Usuario> {
    // Comprueba si el email ya existe en la base de datos
    const existingUsuario = await this.usuarioModel.findOne({
      email: usuario.email,
    });

    if (existingUsuario) {
      throw new ConflictException('El usuario ya existe'); // Lanza una excepción si el usuario ya existe
    }

    const salt = await bcrypt.genSalt();
    usuario.password = await bcrypt.hash(usuario.password, salt);

    const createdUsuario = new this.usuarioModel(usuario);
    return createdUsuario.save();
  }

  generateToken(usuario: any): string {
    const payload = {
      _id: usuario._id,
      email: usuario.email,
    };
    return this.jwtService.sign(payload);
  }

  async validateUsuario(email: string, password: string): Promise<any> {
    const usuario = await this.usuarioModel.findOne({ email });
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const { password, ...result } = usuario.toObject();
      return result;
    }
    return null;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(id: string): Promise<Usuario | null> {
    return this.usuarioModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }

  async update(id: string, usuario: Usuario): Promise<Usuario | null> {
    return this.usuarioModel
      .findByIdAndUpdate(id, usuario, { new: true })
      .exec();
  }

  async findUserAndTeams(id: string): Promise<any> {
    const usuario = await this.usuarioModel
      .findById(id)
      .select('-password')
      .populate('ownedTeams')
      .exec();

    if (!usuario) {
      return null; // O puedes lanzar una excepción
    }

    // Aquí hacemos una segunda consulta para obtener los jugadores de los equipos propiedad del usuario
    const teamIds = usuario.ownedTeams.map((team) => team._id);
    const players = await this.playerModel
      .find({ team_id: { $in: teamIds } })
      .exec();

    const usuarioObject = usuario.toObject(); // Convertimos el usuario a un objeto JavaScript normal
    usuarioObject.ownedTeams = teamIds; // Sobrescribimos 'ownedTeams' para que solo contenga los IDs

    // Aquí podrías organizar los datos de una manera que te guste más
    return {
      usuario: usuarioObject,
      teams: usuario.ownedTeams,
      players,
    };
  }
}
