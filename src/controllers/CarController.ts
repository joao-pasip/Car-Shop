import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import CustomError from '../helpers/error/custom.error';
import TypeMessageError from '../helpers/error/messages.error';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request & { body: ICar },
    res: Response<ICar>,
  ) {
    const objCar = await this._service.create(req.body);
    return res.status(201).json(objCar);
  }

  public async read(
    _req: Request & { body: ICar },
    res: Response<ICar[]>,
  ) {
    const carAll = await this._service.read();
    return res.status(200).json(carAll);
  }

  public async readOne(
    req: Request & { body: ICar },
    res: Response<ICar | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, TypeMessageError.ID_INVALID);
    const carId = await this._service.readOne(id);
    return res.status(200).json(carId);
  }

  public async update(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, TypeMessageError.ID_INVALID);
    if (!Object.keys(req.body).length) throw new CustomError(400, 'body vazio');
    const result = await this._service.update(id, req.body);
    return res.status(200).json(result);
  }

  public async delete(
    req: Request & { body: ICar },
    res: Response<ICar | null>,
  ) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, TypeMessageError.ID_INVALID);
    const carId = await this._service.delete(id);
    return res.status(204).json(carId);
  }
}