
exports.up = function(knex) {
	return knex.schema.createTable('members', table => {
		table.increments('id').unique().notNullable().primary();
		table.integer('merchant_id').unsigned();
		table.string('email').notNullable().unique();
		table.string('name').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
		
		table.foreign('merchant_id').references('merchants.id');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('members');
};
