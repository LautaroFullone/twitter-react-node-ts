import { User } from '../models/User'
import Avatar from './Avatar'

const FollowBar = () => {
   const users: User[] = [
      {
         id: '1',
         name: 'Juan Pérez',
         username: 'juanperez',
         bio: 'Desarrollador de software apasionado por la tecnología.',
         email: 'juan.perez@example.com',
         emailVerified: '2024-09-18T10:00:00Z',
         image: 'https://example.com/images/juanperez.jpg',
         coverImage: 'https://example.com/images/juanperez-cover.jpg',
         profileImage: 'https://example.com/images/juanperez-profile.jpg',
         hashedPassword: '$2b$10$abcdefghijklmnopqrstuv',
         createdAt: '2024-01-15T08:30:00Z',
         updatedAt: '2024-09-18T12:00:00Z',
         followingIds: ['2', '3'],
         hasNotification: false,
      },
      {
         id: '2',
         name: 'Maria López',
         username: 'marialopez',
         bio: 'Diseñadora gráfica freelance y amante del arte digital.',
         email: 'maria.lopez@example.com',
         emailVerified: '2024-05-10T14:20:00Z',
         image: 'https://example.com/images/marialopez.jpg',
         coverImage: 'https://example.com/images/marialopez-cover.jpg',
         profileImage: 'https://example.com/images/marialopez-profile.jpg',
         hashedPassword: '$2b$10$mnopqrstuvabcdefghi',
         createdAt: '2023-12-01T09:15:00Z',
         updatedAt: '2024-09-15T16:45:00Z',
         followingIds: ['1', '3', '4'],
         hasNotification: true,
      },
      {
         id: '3',
         name: 'Carlos Rodríguez',
         username: 'carlosrod',
         bio: 'Ingeniero de datos especializado en big data y análisis.',
         email: 'carlos.rod@example.com',
         emailVerified: '2024-07-20T11:00:00Z',
         image: 'https://example.com/images/carlosrod.jpg',
         coverImage: 'https://example.com/images/carlosrod-cover.jpg',
         profileImage: 'https://example.com/images/carlosrod-profile.jpg',
         hashedPassword: '$2b$10$abcdefghi1234567890',
         createdAt: '2024-03-25T11:10:00Z',
         updatedAt: '2024-09-17T13:30:00Z',
         followingIds: ['2', '5'],
         hasNotification: false,
      },
      {
         id: '4',
         name: 'Lucía Gómez',
         username: 'luciagomez',
         bio: 'Especialista en marketing digital y estrategias de contenido.',
         email: 'lucia.gomez@example.com',
         emailVerified: '2024-03-12T09:30:00Z',
         image: 'https://example.com/images/luciagomez.jpg',
         coverImage: 'https://example.com/images/luciagomez-cover.jpg',
         profileImage: 'https://example.com/images/luciagomez-profile.jpg',
         hashedPassword: '$2b$10$klmnopqrstuvwx1234567',
         createdAt: '2024-02-18T10:50:00Z',
         updatedAt: '2024-09-18T08:20:00Z',
         followingIds: ['1', '5'],
         hasNotification: true,
      },
      {
         id: '5',
         name: 'Fernando Díaz',
         username: 'fernandodiaz',
         bio: 'Consultor de negocios y emprendedor en el sector tecnológico.',
         email: 'fernando.diaz@example.com',
         emailVerified: '2024-06-01T15:00:00Z',
         image: 'https://example.com/images/fernandodiaz.jpg',
         coverImage: 'https://example.com/images/fernandodiaz-cover.jpg',
         profileImage: 'https://example.com/images/fernandodiaz-profile.jpg',
         hashedPassword: '$2b$10$opqrstuvwxyzabcdefghi',
         createdAt: '2024-04-10T13:40:00Z',
         updatedAt: '2024-09-16T11:25:00Z',
         followingIds: ['2', '3'],
         hasNotification: false,
      },
   ]

   if (users.length > 0) {
      return (
         <div className="hidden px-6 pt-4 lg:block">
            <div className="bg-neutral-800 rounded-xl p-4">
               <h2 className="text-white text-xl font-semibold">
                  {' '}
                  Who To Follow
               </h2>
               <div className="flex flex-col gap-6 mt-4">
                  {users.map((user) => (
                     <div key={user.id} className="flex flex-row gap-4">
                        <Avatar userId={user.id} />
                        <div className="flex flex-col justify-center">
                           <p
                              className="text-white 
                              font-semibold 
                              text-sm"
                           >
                              {user.name}
                           </p>
                           <p className="text-neutral-400 text-sm">
                              @{user.username}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )
   }
}

export default FollowBar
