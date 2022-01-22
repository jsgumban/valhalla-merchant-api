
exports.up = function(knex) {
	return knex.schema.createTable('merchants', table => {
		table.increments('id').unique().notNullable().primary();
		table.string('name').notNullable();
		table.text('logo', 'longtext').nullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('merchants');
};
