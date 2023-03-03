/** @format */

export const warehouses = [
	{ id: 1, name: 'Licorera' },
	{ id: 2, name: 'Billares' },
];

export const categories = [
	{ id: 1, name: 'Rum' },
	{ id: 2, name: 'Tequila' },
	{ id: 3, name: 'Whisky' },
];

export const products = [
	{
		id: 1,
		name: 'Ron Zacapa Centenario 23',
		stock: 100,
		price: { retail: 45, wholesale: 35 },
		warehouse: 1,
		category: 1,
	},
	{
		id: 2,
		name: 'Don Julio Blanco',
		stock: 75,
		price: { retail: 50, wholesale: 40 },
		warehouse: 2,
		category: 2,
	},
	{
		id: 3,
		name: 'Johnnie Walker Green Label',
		stock: 120,
		price: { retail: 60, wholesale: 50 },
		warehouse: 1,
		category: 3,
	},
	{
		id: 4,
		name: 'Havana Club Añejo 7 años',
		stock: 80,
		price: { retail: 30, wholesale: 25 },
		warehouse: 2,
		category: 1,
	},
	{
		id: 5,
		name: 'Patron Silver',
		stock: 65,
		price: { retail: 55, wholesale: 45 },
		warehouse: 'C',
		category: 2,
	},
	{
		id: 6,
		name: "Jack Daniel's Single Barrel",
		stock: 90,
		price: { retail: 65, wholesale: 55 },
		warehouse: 1,
		category: 3,
	},
	{
		id: 7,
		name: 'Bacardi Superior',
		stock: 150,
		price: { retail: 20, wholesale: 15 },
		warehouse: 2,
		category: 1,
	},
	{
		id: 8,
		name: 'Jose Cuervo Tradicional Reposado',
		stock: 110,
		price: { retail: 35, wholesale: 30 },
		warehouse: 'C',
		category: 2,
	},
	{
		id: 9,
		name: 'Glenfiddich 15 años',
		stock: 70,
		price: { retail: 80, wholesale: 70 },
		warehouse: 1,
		category: 3,
	},
	{
		id: 10,
		name: 'Appleton Estate Reserve Blend',
		stock: 95,
		price: { retail: 25, wholesale: 20 },
		warehouse: 2,
		category: 1,
	},
];

export const clients = [
	{
		id: 1,
		name: 'Public',
		type: 'retail',
	},
	{
		id: 2,
		name: 'Wholesaler',
		type: 'wholesale',
	},
];
