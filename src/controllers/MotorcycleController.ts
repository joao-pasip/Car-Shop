import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import CustomError from '../helpers/error/custom.error';
import TypeMessageError from '../helpers/error/messages.error';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ) {
    const objMotorcycle = await this._service.create(req.body);
    return res.status(201).json(objMotorcycle);
  }

  public async read(
    _req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle[]>,
  ) {
    const motorcycles = await this._service.read();
    return res.status(200).json(motorcycles);
  }

  public async readOne(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, TypeMessageError.ID_INVALID);
    const motorcycleId = await this._service.readOne(id);
    return res.status(200).json(motorcycleId);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, TypeMessageError.ID_INVALID);
    if (!Object.keys(req.body).length) throw new CustomError(400, 'body vazio');
    const result = await this._service.update(id, req.body);
    return res.status(200).json(result);
  }

  public async delete(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, TypeMessageError.ID_INVALID);
    const motorcycleId = await this._service.delete(id);
    return res.status(204).json(motorcycleId);
  }
}