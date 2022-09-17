import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
	model: "Fox Car",
	year: 1999,
	color: "blue",
	buyValue: 2500000,
	doorsQty: 2,
	seatsQty: 2,
}

const carMockWithId: ICar & { _id: string} = {
	_id: "4edd40c86762e0fb12000004",
  model: "Fox Car",
	year: 1999,
	color: "blue",
	buyValue: 2500000,
	doorsQty: 2,
	seatsQty: 2,
}

const carMockForChange: ICar = {
  model: "Polo",
	year: 2012,
	color: "red",
	buyValue: 3500000,
	doorsQty: 4,
	seatsQty: 4,
}

const carMockForChangeWithId: ICar & { _id:string } = {
  _id: "4edd40c86762e0fb12000004",
  model: "Polo",
	year: 2012,
	color: "red",
	buyValue: 3500000,
	doorsQty: 4,
	seatsQty: 4
}

const carMockArrayWithId = [
	{
		model: "Fox Car",
		year: 1999,
		color: "blue",
		buyValue: 2500000,
		doorsQty: 2,
		seatsQty: 2,
		_id: "4edd40c86762e0fb12000004"
	},
	{
		model: "Polo",
		year: 2012,
		color: "red",
		buyValue: 3500000,
		doorsQty: 4,
		seatsQty: 4,
		_id: "4edd40c86762e0fb12000005"
	}
]

export { 
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId,
	carMockArrayWithId
}