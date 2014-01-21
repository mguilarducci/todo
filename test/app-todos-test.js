var should = chai.should();

describe('Application', function() {
	it('creates a global variable for the namespace', function() {
		should.exist(todoApp);
	});

	it('create a global variable for Models', function() {
		should.exist(todoApp.Models);
	});

	it('create a global variable for Views', function() {
		should.exist(todoApp.Views);
	});

	it('create a global variable for Collections', function() {
		should.exist(todoApp.Collections);
	});
});

describe('Todo Model', function() {
	describe('Initialization', function() {
		beforeEach(function() {
			this.todo = new todoApp.Models.Todo();
		});

		it('default status should be pending', function() {
			this.todo.get('complete').should.be.false;
		});

		it('default title should be empty', function() {
			this.todo.get('title').should.equal('');
		});
	});
});
