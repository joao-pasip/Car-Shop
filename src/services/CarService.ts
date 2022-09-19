import { IService } from '../interfaces/IService';
import { ICar, car } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/error/custom.error';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = car.safeParse(obj);
    if (!parsed.success) {
      throw new CustomError(400, 'error na validação do ZOD');
    }
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(_id: string): Promise<ICar> {
    const carOne = await this._car.readOne(_id);
    if (!carOne) throw new CustomError(404, 'Object not found');
    return carOne;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = car.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._car.update(_id, obj);
  }

  public async delete(_id: string): Promise<ICar | null> {
    await this.readOne(_id);
    return this._car.delete(_id);
  }
}

export default CarService;
