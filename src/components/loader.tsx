/** @format */

export default function Loader() {
	return (
		<div className='w-full h-full flex flex-col items-center justify-center'>
			<h2 className='w-full max-w-md text-center font-black text-7xl text-slate-900 uppercase leading-none mb-8'>
				Licorera Salvador
			</h2>
			<p className='text-slate-700 mb-8'>Cargando aplicación</p>
			<div className='w-10 h-10 rounded-full border-8 border-blue-700 border-t-transparent animate-spin' />
		</div>
	);
}
