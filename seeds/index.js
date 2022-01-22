exports.seed = function(knex, Promise) {
   return knex('clients').del().then(() => {
      return knex('clients').insert([
         { client_id: 'client_id', client_secret: 'client_secret', name: 'client_name' }
      ]);
   }).then(() => {
      return knex('users').del().then(() => {
         return knex('users').insert([
            {
               'email': 'admin@admin.com',
               'first_name': 'Admin',
               'last_name': 'User',
               'password': '$2b$10$uLycBbdRqlAPnNZG3H9kteXDD1vSG5uEhqgt1Q0qJrxTykP6DY2JW' //password
            }
         ]);
      });
   });
};
