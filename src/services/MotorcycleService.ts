import CustomError from '../helpers/error/custom.error';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycle.safeParse(obj);
    if (!parsed.success) {
      throw new CustomError(400, 'error na validação do ZOD');
    }
    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const motorcycles = await this._motorcycle.read();
    return motorcycles;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycleOne = await this._motorcycle.readOne(_id);
    if (!motorcycleOne) throw new CustomError(404, 'Object not found');
    return motorcycleOne;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const parsed = motorcycle.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._motorcycle.update(_id, obj);
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    await this.readOne(_id);
    return this._motorcycle.delete(_id);
  }
}